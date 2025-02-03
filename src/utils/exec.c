#include "../../include/minishell.h"
#include <errno.h>
#include <sys/stat.h>
#include <unistd.h>
#include <sys/wait.h>

static void handle_child_signals(void)
{
    signal(SIGINT, SIG_DFL);
    signal(SIGQUIT, SIG_DFL);
    signal(SIGPIPE, SIG_DFL);
}

static void handle_parent_signals(void)
{
    signal(SIGINT, SIG_IGN);
    signal(SIGQUIT, SIG_IGN);
    signal(SIGPIPE, SIG_IGN);
}

void	free_tab(char **tab);

bool	exect_builtin(char **args, t_data *data)
{
	if (ft_strncmp(args[0], "echo", 4) == 0)
		echo_command(args, data);
	else if (ft_strncmp(args[0], "cd", 2) == 0)
		cd_command(args, data);
	else if (ft_strncmp(args[0], "pwd", 3) == 0)
		pwd_command();
	else if (ft_strncmp(args[0], "export", 6) == 0)
		export_command(args, data);
	else if (ft_strncmp(args[0], "unset", 5) == 0)
		unset_command(args, data);
	else if (ft_strncmp(args[0], "env", 3) == 0)
		env_command(args, data);
	else if (ft_strncmp(args[0], "exit", 4) == 0)
		exit_command(data);
	else if (ft_strncmp(args[0], "<<", 2) == 0)
		return (TRUE);
	else if (ft_strncmp(args[0], ">>", 2) == 0)
		return (TRUE);
	else if (ft_strncmp(args[0], "<", 1) == 0)
		return (TRUE);
	else if (ft_strncmp(args[0], ">", 1) == 0)
		return (TRUE);
	return (FALSE);
}

bool	exec_all(char **args, t_data *data)
{
	char	**env = NULL;
	char	*cmd_path = NULL;
	char	*full_path = NULL;
	bool	ret = FALSE;

	if (!args || !args[0] || !data)
		return (FALSE);

	// Block signals during fork operations
	sigset_t block_mask, old_mask;
	sigfillset(&block_mask);
	if (sigprocmask(SIG_BLOCK, &block_mask, &old_mask) == -1)
	{
		perror("minishell: sigprocmask");
		return (FALSE);
	}

	handle_parent_signals();

	env = env_to_tab(data->env);
	if (!env)
	{
		ft_putstr_fd("minishell: memory allocation error\n", 2);
		if (sigprocmask(SIG_SETMASK, &old_mask, NULL) == -1)
			perror("minishell: sigprocmask");
		return (FALSE);
	}

	if (!data->list_path)
	{
		data->list_path = (char **)malloc(sizeof(char *));
		if (!data->list_path)
		{
			free_tab(env);
			if (sigprocmask(SIG_SETMASK, &old_mask, NULL) == -1)
				perror("minishell: sigprocmask");
			return (FALSE);
		}
		data->list_path[0] = NULL;
	}

	// Set up signal handlers for child process
	struct sigaction sa;
	sa.sa_handler = SIG_DFL;
	sa.sa_flags = 0;
	sigemptyset(&sa.sa_mask);
	
	if (sigaction(SIGINT, &sa, NULL) == -1 ||
		sigaction(SIGQUIT, &sa, NULL) == -1)
	{
		perror("minishell: sigaction");
		free_tab(env);
		if (sigprocmask(SIG_SETMASK, &old_mask, NULL) == -1)
			perror("minishell: sigprocmask");
		return (FALSE);
	}

	int i = 0;
	while (args[i])
	{
		char *arg = args[i];
		char *new_arg = malloc(4096);
		if (!new_arg)
		{
			free_tab(env);
			if (sigprocmask(SIG_SETMASK, &old_mask, NULL) == -1)
				perror("minishell: sigprocmask");
			return (FALSE);
		}

		int j = 0;
		int k = 0;
		while (arg[j])
		{
			if (arg[j] == '$' && arg[j + 1])
			{
				j++;
				if (arg[j] == '?')
				{
					char *tmp = ft_itoa(g_exit_value);
					if (!tmp)
					{
						free(new_arg);
						free_tab(env);
						return (FALSE);
					}
					strncpy(new_arg + k, tmp, 4096 - k - 1);
					k += strlen(tmp);
					free(tmp);
					j++;
				}
				else if (ft_isalpha(arg[j]) || arg[j] == '_')
				{
					char var_name[256] = {0};
					int var_len = 0;
					while (arg[j] && (ft_isalnum(arg[j]) || arg[j] == '_') && var_len < 255)
						var_name[var_len++] = arg[j++];
					t_env *env_var = get_env_var(var_name, data);
					if (env_var && ft_strchr(env_var->str, '='))
					{
						char *value = ft_strchr(env_var->str, '=') + 1;
						strncpy(new_arg + k, value, 4096 - k - 1);
						k += strlen(value);
					}
				}
				else
					new_arg[k++] = '$';
			}
			else if (k < 4095)
				new_arg[k++] = arg[j++];
			else
				j++;
		}
		new_arg[k] = '\0';

		char *tmp = ft_strdup(new_arg);
		free(new_arg);
		if (!tmp)
		{
			free_tab(env);
			if (sigprocmask(SIG_SETMASK, &old_mask, NULL) == -1)
				perror("minishell: sigprocmask");
			return (FALSE);
		}
		free(args[i]);
		args[i] = tmp;
		i++;
	}

	if (args[0][0] == '/' || args[0][0] == '.' || args[0][0] == '~')
	{
		if (args[0][0] == '~')
		{
			t_env *home_var = get_env_var("HOME", data);
			char *home = home_var ? ft_strchr(home_var->str, '=') + 1 : NULL;
			if (!home)
			{
				ft_putstr_fd("minishell: ", 2);
				ft_putstr_fd(args[0], 2);
				ft_putstr_fd(": HOME not set\n", 2);
				g_exit_value = 127;
				ret = FALSE;
				goto cleanup;
			}
			cmd_path = ft_strjoin(home, args[0] + 1);
		}
		else
			cmd_path = ft_strdup(args[0]);

		if (!cmd_path)
		{
			g_exit_value = 1;
			ret = FALSE;
			goto cleanup;
		}

		struct stat st;
		if (stat(cmd_path, &st) == -1)
		{
			ft_putstr_fd("minishell: ", 2);
			ft_putstr_fd(args[0], 2);
			if (errno == ENOENT)
			{
				ft_putstr_fd(": No such file or directory\n", 2);
				g_exit_value = 127;
			}
			else
			{
				ft_putstr_fd(": Error accessing file\n", 2);
				g_exit_value = 126;
			}
			ret = FALSE;
			goto cleanup;
		}

		if (S_ISDIR(st.st_mode))
		{
			ft_putstr_fd("minishell: ", 2);
			ft_putstr_fd(args[0], 2);
			ft_putstr_fd(": Is a directory\n", 2);
			g_exit_value = 126;
			ret = FALSE;
			goto cleanup;
		}

		if (access(cmd_path, X_OK) == -1)
		{
			ft_putstr_fd("minishell: ", 2);
			ft_putstr_fd(args[0], 2);
			ft_putstr_fd(": Permission denied\n", 2);
			g_exit_value = 126;
			ret = FALSE;
			goto cleanup;
		}

		execve(cmd_path, args, env);
		ret = FALSE;
		goto cleanup;
	}

	if (args[0][0] == '\0')
	{
		ret = FALSE;
		goto cleanup;
	}

	int path_idx = 0;
	while (data->list_path[path_idx])
	{
		cmd_path = ft_strjoin(data->list_path[path_idx], "/");
		if (!cmd_path)
		{
			ret = FALSE;
			goto cleanup;
		}
		full_path = ft_strjoin(cmd_path, args[0]);
		free(cmd_path);
		cmd_path = NULL;
		
		if (!full_path)
		{
			ret = FALSE;
			goto cleanup;
		}

		if (access(full_path, F_OK | X_OK) == 0)
		{
			execve(full_path, args, env);
			ret = FALSE;
			goto cleanup;
		}
		free(full_path);
		full_path = NULL;
		path_idx++;
	}

	ft_putstr_fd("minishell: ", 2);
	ft_putstr_fd(args[0], 2);
	ft_putstr_fd(": command not found\n", 2);
	ret = FALSE;

cleanup:
	if (cmd_path)
		free(cmd_path);
	if (full_path)
		free(full_path);
	if (env)
		free_tab(env);

	// Restore signal mask before returning
	if (sigprocmask(SIG_SETMASK, &old_mask, NULL) == -1)
		perror("minishell: sigprocmask");

	return ret;
}

static bool handle_multiple_pipes(t_data *data, char ***pipe_cmds, int pipe_count)
{
    int j;
    int prev_pipe[2] = {-1, -1};
    int curr_pipe[2] = {-1, -1};
    pid_t *pids;
    
    // Block signals during fork operations
    sigset_t block_mask, old_mask;
    sigfillset(&block_mask);
    if (sigprocmask(SIG_BLOCK, &block_mask, &old_mask) == -1)
    {
        perror("minishell: sigprocmask");
        g_exit_value = 1;
        return (FALSE);
    }

    handle_parent_signals();

    // Set up signal handlers for parent process
    struct sigaction sa;
    sa.sa_handler = SIG_DFL;
    sa.sa_flags = 0;
    sigemptyset(&sa.sa_mask);
    
    if (sigaction(SIGINT, &sa, NULL) == -1 ||
        sigaction(SIGQUIT, &sa, NULL) == -1)
    {
        perror("minishell: sigaction");
        g_exit_value = 1;
        return (FALSE);
    }
    
    pids = malloc(sizeof(pid_t) * (pipe_count + 1));
    if (!pids)
    {
        perror("minishell: malloc");
        g_exit_value = 1;
        return (FALSE);
    }

    for (j = 0; j <= pipe_count; j++)
    {
        if (j < pipe_count)
        {
            if (pipe(curr_pipe) == -1)
            {
                perror("minishell: pipe");
                for (int k = 0; k < j; k++)
                {
                    kill(pids[k], SIGTERM);
                    waitpid(pids[k], NULL, 0);
                }
                if (prev_pipe[0] != -1) close(prev_pipe[0]);
                if (prev_pipe[1] != -1) close(prev_pipe[1]);
                free(pids);
                if (sigprocmask(SIG_SETMASK, &old_mask, NULL) == -1)
                    perror("minishell: sigprocmask");
                g_exit_value = 1;
                return (FALSE);
            }
        }

        pids[j] = fork();
        if (pids[j] == -1)
        {
            perror("minishell: fork");
            for (int k = 0; k < j; k++)
            {
                kill(pids[k], SIGTERM);
                waitpid(pids[k], NULL, 0);
            }
            if (prev_pipe[0] != -1) close(prev_pipe[0]);
            if (prev_pipe[1] != -1) close(prev_pipe[1]);
            if (curr_pipe[0] != -1) close(curr_pipe[0]);
            if (curr_pipe[1] != -1) close(curr_pipe[1]);
            free(pids);
            if (sigprocmask(SIG_SETMASK, &old_mask, NULL) == -1)
                perror("minishell: sigprocmask");
            g_exit_value = 1;
            return (FALSE);
        }

        if (pids[j] == 0)
        {
            // Restore default signal handlers in child
            struct sigaction sa;
            sa.sa_handler = SIG_DFL;
            sa.sa_flags = 0;
            sigemptyset(&sa.sa_mask);
            
            if (sigaction(SIGINT, &sa, NULL) == -1 ||
                sigaction(SIGQUIT, &sa, NULL) == -1)
            {
                perror("minishell: sigaction");
                _exit(1);
            }
            
            // Restore signal mask in child
            if (sigprocmask(SIG_SETMASK, &old_mask, NULL) == -1)
            {
                perror("minishell: sigprocmask");
                _exit(1);
            }

            handle_child_signals();

            if (j > 0 && dup2(prev_pipe[0], STDIN_FILENO) == -1)
            {
                perror("minishell: dup2");
                _exit(1);
            }
            
            if (j < pipe_count && dup2(curr_pipe[1], STDOUT_FILENO) == -1)
            {
                perror("minishell: dup2");
                _exit(1);
            }

            if (prev_pipe[0] != -1) close(prev_pipe[0]);
            if (prev_pipe[1] != -1) close(prev_pipe[1]);
            if (curr_pipe[0] != -1) close(curr_pipe[0]);
            if (curr_pipe[1] != -1) close(curr_pipe[1]);

            if (ifbuiltin(pipe_cmds[j]))
            {
                exect_builtin(pipe_cmds[j], data);
                _exit(g_exit_value);
            }
            if (!check_allcmd(pipe_cmds[j][0], data))
            {
                ft_putstr_fd("minishell: ", 2);
                ft_putstr_fd(pipe_cmds[j][0], 2);
                ft_putstr_fd(": command not found\n", 2);
                _exit(127);
            }
            int exec_result = exec_all(pipe_cmds[j], data);
            if (exec_result == FALSE)
            {
                if (errno == ENOENT)
                    _exit(127);
                else if (errno == EACCES)
                    _exit(126);
                else if (errno == ENOTDIR)
                    _exit(126);
                else if (errno == EISDIR)
                    _exit(126);
                _exit(1);
            }
            _exit(0);
        }

        if (j > 0)
        {
            close(prev_pipe[0]);
            close(prev_pipe[1]);
            prev_pipe[0] = -1;
            prev_pipe[1] = -1;
        }
        
        if (j < pipe_count)
        {
            prev_pipe[0] = curr_pipe[0];
            prev_pipe[1] = curr_pipe[1];
        }
        else if (curr_pipe[0] != -1)
        {
            close(curr_pipe[0]);
            close(curr_pipe[1]);
        }
    }

    int exit_status = 0;
    pid_t wpid;
    int status;

    // Restore signal mask before waiting
    if (sigprocmask(SIG_SETMASK, &old_mask, NULL) == -1)
    {
        perror("minishell: sigprocmask");
    }

    while ((wpid = waitpid(-1, &status, 0)) > 0)
    {
        if (wpid == pids[pipe_count])
        {
            if (WIFEXITED(status))
                exit_status = WEXITSTATUS(status);
            else if (WIFSIGNALED(status))
            {
                int sig = WTERMSIG(status);
                if (sig == SIGINT)
                {
                    ft_putstr_fd("\n", 2);
                    exit_status = 130;
                }
                else if (sig == SIGQUIT)
                {
                    ft_putstr_fd("Quit (core dumped)\n", 2);
                    exit_status = 131;
                }
                else if (sig == SIGPIPE)
                    exit_status = 0;
                else if (sig == SIGSEGV)
                {
                    ft_putstr_fd("Segmentation fault (core dumped)\n", 2);
                    exit_status = 139;
                }
                else if (sig == SIGBUS)
                {
                    ft_putstr_fd("Bus error (core dumped)\n", 2);
                    exit_status = 138;
                }
                else if (sig == SIGABRT)
                {
                    ft_putstr_fd("Aborted (core dumped)\n", 2);
                    exit_status = 134;
                }
                else
                    exit_status = 128 + sig;
            }
        }
    }

    g_exit_value = exit_status;
    free(pids);
    return (TRUE);
}

bool exec_pipe(t_data *data, char ***tab)
{
	int		pipe_fd[2] = {-1, -1};
	pid_t	pid1;
	pid_t	pid2;
	int		saved_stdin;
	int		saved_stdout;

	if (!tab || !tab[0] || !tab[1] || !tab[0][0] || !tab[1][0])
	{
		ft_putstr_fd("minishell: syntax error near unexpected token `|'\n", 2);
		g_exit_value = 2;
		return (FALSE);
	}

	saved_stdin = dup(STDIN_FILENO);
	saved_stdout = dup(STDOUT_FILENO);
	if (saved_stdin == -1 || saved_stdout == -1)
	{
		perror("minishell: dup");
		if (saved_stdin != -1)
			close(saved_stdin);
		if (saved_stdout != -1)
			close(saved_stdout);
		g_exit_value = 1;
		return (FALSE);
	}

	if (pipe(pipe_fd) == -1)
	{
		perror("minishell: pipe");
		close(saved_stdin);
		close(saved_stdout);
		g_exit_value = 1;
		return (FALSE);
	}

	// Block signals during fork operations
	sigset_t block_mask, old_mask;
	sigfillset(&block_mask);
	if (sigprocmask(SIG_BLOCK, &block_mask, &old_mask) == -1)
	{
		perror("minishell: sigprocmask");
		close(pipe_fd[0]);
		close(pipe_fd[1]);
		close(saved_stdin);
		close(saved_stdout);
		g_exit_value = 1;
		return (FALSE);
	}

	handle_parent_signals();

	// Set both pipe ends to close-on-exec
	if (fcntl(pipe_fd[0], F_SETFD, FD_CLOEXEC) == -1 ||
		fcntl(pipe_fd[1], F_SETFD, FD_CLOEXEC) == -1)
	{
		perror("minishell: fcntl");
		close(pipe_fd[0]);
		close(pipe_fd[1]);
		close(saved_stdin);
		close(saved_stdout);
		g_exit_value = 1;
		return (FALSE);
	}

	pid1 = fork();
	if (pid1 == -1)
	{
		perror("minishell: fork");
		close(pipe_fd[0]);
		close(pipe_fd[1]);
		close(saved_stdin);
		close(saved_stdout);
		g_exit_value = 1;
		return (FALSE);
	}

	if (pid1 == 0)
	{
		// Restore default signal handlers in child
		struct sigaction sa;
		sa.sa_handler = SIG_DFL;
		sa.sa_flags = 0;
		sigemptyset(&sa.sa_mask);
		
		if (sigaction(SIGINT, &sa, NULL) == -1 ||
			sigaction(SIGQUIT, &sa, NULL) == -1)
		{
			perror("minishell: sigaction");
			_exit(1);
		}
		
		// Restore signal mask in child
		if (sigprocmask(SIG_SETMASK, &old_mask, NULL) == -1)
		{
			perror("minishell: sigprocmask");
			_exit(1);
		}

		handle_child_signals();

		close(pipe_fd[0]);
		if (dup2(pipe_fd[1], STDOUT_FILENO) == -1)
		{
			perror("minishell: dup2");
			close(pipe_fd[1]);
			_exit(1);
		}
		close(pipe_fd[1]);

		// Close all file descriptors except stdin/stdout/stderr
		for (int fd = 3; fd < 1024; fd++)
		{
			struct stat statbuf;
			if (fstat(fd, &statbuf) == 0 && 
				fd != STDIN_FILENO && fd != STDOUT_FILENO && fd != STDERR_FILENO)
				close(fd);
		}

		if (!tab[0] || !tab[0][0])
			_exit(0);

		if (ifbuiltin(tab[0]))
		{
			exect_builtin(tab[0], data);
			_exit(g_exit_value);
		}
		if (!check_allcmd(tab[0][0], data))
		{
			ft_putstr_fd("minishell: ", 2);
			ft_putstr_fd(tab[0][0], 2);
			ft_putstr_fd(": command not found\n", 2);
			_exit(127);
		}
		
		int exec_result = exec_all(tab[0], data);
		if (exec_result == FALSE)
		{
			if (errno == ENOENT)
				_exit(127);
			else if (errno == EACCES)
				_exit(126);
			else if (errno == ENOTDIR)
				_exit(126);
			else if (errno == EISDIR)
				_exit(126);
			_exit(1);
		}
		_exit(0);
	}

	pid2 = fork();
	if (pid2 == -1)
	{
		perror("minishell: fork");
		close(pipe_fd[0]);
		close(pipe_fd[1]);
		kill(pid1, SIGTERM);
		waitpid(pid1, NULL, 0);
		close(saved_stdin);
		close(saved_stdout);
		g_exit_value = 1;
		return (FALSE);
	}

	if (pid2 == 0)
	{
		// Restore default signal handlers in child
		struct sigaction sa;
		sa.sa_handler = SIG_DFL;
		sa.sa_flags = 0;
		sigemptyset(&sa.sa_mask);
		
		if (sigaction(SIGINT, &sa, NULL) == -1 ||
			sigaction(SIGQUIT, &sa, NULL) == -1)
		{
			perror("minishell: sigaction");
			_exit(1);
		}
		
		// Restore signal mask in child
		if (sigprocmask(SIG_SETMASK, &old_mask, NULL) == -1)
		{
			perror("minishell: sigprocmask");
			_exit(1);
		}

		handle_child_signals();

		close(pipe_fd[1]);
		if (dup2(pipe_fd[0], STDIN_FILENO) == -1)
		{
			perror("minishell: dup2");
			close(pipe_fd[0]);
			_exit(1);
		}
		close(pipe_fd[0]);

		// Reset standard error to original
		if (dup2(saved_stdout, STDERR_FILENO) == -1)
		{
			perror("minishell: dup2");
			_exit(1);
		}

		if (!tab[1] || !tab[1][0])
			_exit(0);

		if (ifbuiltin(tab[1]))
		{
			exect_builtin(tab[1], data);
			_exit(g_exit_value);
		}
		if (!check_allcmd(tab[1][0], data))
		{
			ft_putstr_fd("minishell: ", 2);
			ft_putstr_fd(tab[1][0], 2);
			ft_putstr_fd(": command not found\n", 2);
			_exit(127);
		}
		
		int exec_result = exec_all(tab[1], data);
		if (exec_result == FALSE)
		{
			if (errno == ENOENT)
				_exit(127);
			else if (errno == EACCES)
				_exit(126);
			else if (errno == ENOTDIR)
				_exit(126);
			else if (errno == EISDIR)
				_exit(126);
			_exit(1);
		}
		_exit(0);
	}

	int status1 = 0;
	int status2 = 0;
	int exit_status = 0;

	// Close pipe file descriptors in parent
	close(pipe_fd[0]);
	close(pipe_fd[1]);

	// Restore signal mask before waiting
	if (sigprocmask(SIG_SETMASK, &old_mask, NULL) == -1)
	{
		perror("minishell: sigprocmask");
	}

	// Wait for both processes
	if (pid1 > 0)
		waitpid(pid1, &status1, 0);
	if (pid2 > 0)
		waitpid(pid2, &status2, 0);

	// Handle exit status from the last command in the pipe
	if (WIFSIGNALED(status2))
	{
		int sig = WTERMSIG(status2);
		if (sig == SIGINT)
		{
			ft_putstr_fd("\n", 2);
			exit_status = 130;
		}
		else if (sig == SIGQUIT)
		{
			ft_putstr_fd("Quit (core dumped)\n", 2);
			exit_status = 131;
		}
		else if (sig == SIGPIPE)
			exit_status = 0;
		else if (sig == SIGSEGV)
			exit_status = 139;
		else if (sig == SIGBUS)
			exit_status = 138;
		else if (sig == SIGABRT)
			exit_status = 134;
		else
			exit_status = 128 + sig;
	}
	else if (WIFEXITED(status2))
		exit_status = WEXITSTATUS(status2);

	// Restore original stdin/stdout
	if (dup2(saved_stdin, STDIN_FILENO) == -1 ||
		dup2(saved_stdout, STDOUT_FILENO) == -1)
	{
		perror("minishell: dup2");
		exit_status = 1;
	}

	close(saved_stdin);
	close(saved_stdout);

	g_exit_value = exit_status;
	return (TRUE);
}



bool	exec_cmd(t_data *data, char ***tab)
{
	pid_t	pid;
	int		fd_in = -1;
	int		fd_out = -1;
	int		saved_stdin;
	int		saved_stdout;
	int		status;

	if (!tab || !tab[0])
	{
		ft_putstr_fd("minishell: syntax error near unexpected token `newline'\n", 2);
		g_exit_value = 2;
		return (FALSE);
	}

	// Block signals during fork operations
	sigset_t block_mask, old_mask;
	sigfillset(&block_mask);
	if (sigprocmask(SIG_BLOCK, &block_mask, &old_mask) == -1)
	{
		perror("minishell: sigprocmask");
		g_exit_value = 1;
		return (FALSE);
	}

	handle_parent_signals();

	if (tab[1] && ft_strchr("|", tab[1][0][0]))
	{
		int i = 0;
		char ***pipe_cmds = tab;
		while (pipe_cmds[i] && pipe_cmds[i + 1] && ft_strchr("|", pipe_cmds[i + 1][0][0]))
			i++;
		
		if (i > 0)  // Multiple pipes
		{
			bool result = handle_multiple_pipes(data, pipe_cmds, i);
			if (sigprocmask(SIG_SETMASK, &old_mask, NULL) == -1)
				perror("minishell: sigprocmask");
			return result;
		}
		bool result = exec_pipe(data, tab);
		if (sigprocmask(SIG_SETMASK, &old_mask, NULL) == -1)
			perror("minishell: sigprocmask");
		return result;
	}

	// Set up signal handlers for parent process
	struct sigaction sa;
	sa.sa_handler = SIG_DFL;
	sa.sa_flags = 0;
	sigemptyset(&sa.sa_mask);
	
	if (sigaction(SIGINT, &sa, NULL) == -1 ||
		sigaction(SIGQUIT, &sa, NULL) == -1)
	{
		perror("minishell: sigaction");
		if (sigprocmask(SIG_SETMASK, &old_mask, NULL) == -1)
			perror("minishell: sigprocmask");
		g_exit_value = 1;
		return (FALSE);
	}

	saved_stdin = dup(STDIN_FILENO);
	saved_stdout = dup(STDOUT_FILENO);
	if (saved_stdin == -1 || saved_stdout == -1)
	{
		perror("minishell: dup");
		if (saved_stdin != -1)
			close(saved_stdin);
		if (saved_stdout != -1)
			close(saved_stdout);
		g_exit_value = 1;
		return (FALSE);
	}

	int i = 1;
	while (tab[i] && ft_strchr("><", tab[i][0][0]))
	{
		int *fd_ptr = (ft_strchr("<", tab[i][0][0])) ? &fd_in : &fd_out;
		int prev_fd = *fd_ptr;
		
	if (operator_choice(tab[i], fd_ptr) == -1)
		{
			if (fd_out != -1)
				close(fd_out);
			if (fd_in != -1)
				close(fd_in);
			if (dup2(saved_stdin, STDIN_FILENO) == -1 ||
				dup2(saved_stdout, STDOUT_FILENO) == -1)
			{
				perror("minishell: dup2");
			}
			close(saved_stdin);
			close(saved_stdout);
			if (sigprocmask(SIG_SETMASK, &old_mask, NULL) == -1)
				perror("minishell: sigprocmask");
			g_exit_value = 2;
			return (FALSE);
		}

		if (prev_fd != -1)
			close(prev_fd);
		i++;
	}

	if (ifbuiltin(tab[0]))
	{
		if (fd_in != -1)
		{
			if (dup2(fd_in, STDIN_FILENO) == -1)
			{
				perror("minishell: dup2");
				close(fd_in);
				if (fd_out != -1)
					close(fd_out);
				if (dup2(saved_stdin, STDIN_FILENO) == -1 ||
					dup2(saved_stdout, STDOUT_FILENO) == -1)
				{
					perror("minishell: dup2");
				}
				close(saved_stdin);
				close(saved_stdout);
				if (sigprocmask(SIG_SETMASK, &old_mask, NULL) == -1)
					perror("minishell: sigprocmask");
				g_exit_value = 1;
				return (FALSE);
			}
			close(fd_in);
		}
		if (fd_out != -1)
		{
			if (dup2(fd_out, STDOUT_FILENO) == -1)
			{
				perror("minishell: dup2");
				close(fd_out);
				if (dup2(saved_stdin, STDIN_FILENO) == -1 ||
					dup2(saved_stdout, STDOUT_FILENO) == -1)
				{
					perror("minishell: dup2");
				}
				close(saved_stdin);
				close(saved_stdout);
				if (sigprocmask(SIG_SETMASK, &old_mask, NULL) == -1)
					perror("minishell: sigprocmask");
				g_exit_value = 1;
				return (FALSE);
			}
			close(fd_out);
		}
		exect_builtin(tab[0], data);
	}
	else
	{
	if (!check_allcmd(tab[0][0], data))
	{
		ft_putstr_fd("minishell: ", 2);
		ft_putstr_fd(tab[0][0], 2);
		ft_putstr_fd(": command not found\n", 2);
		if (fd_out != -1)
			close(fd_out);
		if (fd_in != -1)
			close(fd_in);
		if (dup2(saved_stdin, STDIN_FILENO) == -1 ||
			dup2(saved_stdout, STDOUT_FILENO) == -1)
		{
			perror("minishell: dup2");
		}
		close(saved_stdin);
		close(saved_stdout);
		if (sigprocmask(SIG_SETMASK, &old_mask, NULL) == -1)
			perror("minishell: sigprocmask");
		g_exit_value = 127;
		return (TRUE);
	}

	// Block signals during fork using existing block_mask and old_mask
	sigfillset(&block_mask);
	if (sigprocmask(SIG_BLOCK, &block_mask, &old_mask) == -1)
	{
		perror("minishell: sigprocmask");
		if (fd_out != -1) close(fd_out);
		if (fd_in != -1) close(fd_in);
		if (dup2(saved_stdin, STDIN_FILENO) == -1 ||
			dup2(saved_stdout, STDOUT_FILENO) == -1)
		{
			perror("minishell: dup2");
		}
		close(saved_stdin);
		close(saved_stdout);
		g_exit_value = 1;
		return (FALSE);
	}

	handle_parent_signals();

	pid = fork();
	if (pid == -1)
	{
		perror("minishell: fork");
		if (fd_out != -1) close(fd_out);
		if (fd_in != -1) close(fd_in);
		if (dup2(saved_stdin, STDIN_FILENO) == -1 ||
			dup2(saved_stdout, STDOUT_FILENO) == -1)
		{
			perror("minishell: dup2");
		}
		close(saved_stdin);
		close(saved_stdout);
		g_exit_value = 1;
		return (FALSE);
	}

	if (pid == 0)
	{
		// Restore default signal handlers in child
		struct sigaction sa;
		sa.sa_handler = SIG_DFL;
		sa.sa_flags = 0;
		sigemptyset(&sa.sa_mask);
		
		if (sigaction(SIGINT, &sa, NULL) == -1 ||
			sigaction(SIGQUIT, &sa, NULL) == -1)
		{
			perror("minishell: sigaction");
			_exit(1);
		}
		
		// Restore signal mask in child
		if (sigprocmask(SIG_SETMASK, &old_mask, NULL) == -1)
		{
			perror("minishell: sigprocmask");
			_exit(1);
		}

		handle_child_signals();

		// Close all file descriptors except stdin/stdout/stderr and needed fds
		for (int fd = 3; fd < 1024; fd++)
		{
			if (fd != fd_in && fd != fd_out)
			{
				struct stat statbuf;
				if (fstat(fd, &statbuf) == 0)
					close(fd);
			}
		}

		// Set up file descriptors
		if (fd_in != -1)
		{
			if (dup2(fd_in, STDIN_FILENO) == -1)
			{
				perror("minishell: dup2");
				_exit(1);
			}
			close(fd_in);
		}

		if (fd_out != -1)
		{
			if (dup2(fd_out, STDOUT_FILENO) == -1)
			{
				perror("minishell: dup2");
				_exit(1);
			}
			close(fd_out);
		}

		// Close all file descriptors except stdin/stdout/stderr
		for (int fd = 3; fd < 1024; fd++)
		{
			struct stat statbuf;
			if (fstat(fd, &statbuf) == 0 && 
				fd != STDIN_FILENO && fd != STDOUT_FILENO && fd != STDERR_FILENO)
				close(fd);
		}

		if (ifbuiltin(tab[0]))
		{
			exect_builtin(tab[0], data);
			_exit(g_exit_value);
		}
		
		if (!check_allcmd(tab[0][0], data))
		{
			ft_putstr_fd("minishell: ", 2);
			ft_putstr_fd(tab[0][0], 2);
			ft_putstr_fd(": command not found\n", 2);
			_exit(127);
		}

		int exec_result = exec_all(tab[0], data);
		if (exec_result == FALSE)
		{
			if (errno == ENOENT)
				_exit(127);
			else if (errno == EACCES)
				_exit(126);
			else if (errno == ENOTDIR)
				_exit(126);
			else if (errno == EISDIR)
				_exit(126);
			_exit(1);
		}
		_exit(0);
	}

	if (fd_out != -1)
	{
		close(fd_out);
		fd_out = -1;
	}
	if (fd_in != -1)
	{
		close(fd_in);
		fd_in = -1;
	}

	handle_parent_signals();

	// Restore signal mask before waiting
	if (sigprocmask(SIG_SETMASK, &old_mask, NULL) == -1)
	{
		perror("minishell: sigprocmask");
	}
	
	if (waitpid(pid, &status, 0) == -1)
	{
		perror("minishell: waitpid");
		g_exit_value = 1;
		return FALSE;
	}

	if (WIFSIGNALED(status))
	{
		int sig = WTERMSIG(status);
		if (sig == SIGINT)
		{
			ft_putstr_fd("\n", 2);
			g_exit_value = 130;
		}
		else if (sig == SIGQUIT)
		{
			ft_putstr_fd("Quit (core dumped)\n", 2);
			g_exit_value = 131;
		}
		else if (sig == SIGPIPE)
			g_exit_value = 0;
		else if (sig == SIGSEGV)
		{
			ft_putstr_fd("Segmentation fault (core dumped)\n", 2);
			g_exit_value = 139;
		}
		else if (sig == SIGBUS)
		{
			ft_putstr_fd("Bus error (core dumped)\n", 2);
			g_exit_value = 138;
		}
		else if (sig == SIGABRT)
		{
			ft_putstr_fd("Aborted (core dumped)\n", 2);
			g_exit_value = 134;
		}
		else
			g_exit_value = 128 + sig;
	}
	else if (WIFEXITED(status))
		g_exit_value = WEXITSTATUS(status);
	}

	if (saved_stdin != -1)
	{
		if (dup2(saved_stdin, STDIN_FILENO) == -1)
		{
			perror("minishell: dup2");
			close(saved_stdin);
			saved_stdin = -1;
			if (saved_stdout != -1)
			{
				close(saved_stdout);
				saved_stdout = -1;
			}
			if (sigprocmask(SIG_SETMASK, &old_mask, NULL) == -1)
				perror("minishell: sigprocmask");
			return (FALSE);
		}
		close(saved_stdin);
		saved_stdin = -1;
	}
	if (saved_stdout != -1)
	{
		if (dup2(saved_stdout, STDOUT_FILENO) == -1)
		{
			perror("minishell: dup2");
			close(saved_stdout);
			saved_stdout = -1;
			if (sigprocmask(SIG_SETMASK, &old_mask, NULL) == -1)
				perror("minishell: sigprocmask");
			return (FALSE);
		}
		close(saved_stdout);
		saved_stdout = -1;
	}

	// Reset signal handlers and restore signal mask
	handle_parent_signals();
	if (sigprocmask(SIG_SETMASK, &old_mask, NULL) == -1)
	{
		perror("minishell: sigprocmask");
		return (FALSE);
	}

	return (TRUE);
}
