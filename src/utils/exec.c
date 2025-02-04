#include "../../include/minishell.h"

bool exect_builtin(char **args, t_data *data)
{
	if (ft_strncmp(args[0], "echo", 4) == 0)
		echo_command(args);
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
		exit_command();
	return (FALSE);
}

bool exec_all(char **args, t_data *data)
{
	int code;
	
	code = 0;
	code = execve(data->path[data->nb_path], args, env_to_tab(data->env)); 
	exit(code);
}

bool ifbuiltin(char **args)
{
	if (ft_strncmp(args[0], "echo", 4) == 0)
		return (TRUE);
	else if (ft_strncmp(args[0], "pwd", 3) == 0)
		return (TRUE);
	else if (ft_strncmp(args[0], "cd", 2) == 0)
		return (TRUE);
	else if (ft_strncmp(args[0], "export", 6) == 0)
		return (TRUE);
	else if (ft_strncmp(args[0], "unset", 5) == 0)
		return (TRUE);
	else if (ft_strncmp(args[0], "env", 3) == 0)
		return (TRUE);
	else if (ft_strncmp(args[0], "exit", 4) == 0)
		return (TRUE);
	return (FALSE);
}

static bool setup_redirections(t_command *cmd)
{
    int stdin_backup = -1, stdout_backup = -1;
    
    if (cmd->fd_in != STDIN_FILENO || cmd->fd_out != STDOUT_FILENO)
    {
        stdin_backup = dup(STDIN_FILENO);
        stdout_backup = dup(STDOUT_FILENO);
        if (stdin_backup == -1 || stdout_backup == -1)
            return FALSE;
    }
    
    if (cmd->fd_in != STDIN_FILENO && dup2(cmd->fd_in, STDIN_FILENO) == -1)
    {
        if (stdin_backup != -1)
            close(stdin_backup);
        if (stdout_backup != -1)
            close(stdout_backup);
        return FALSE;
    }
    
    if (cmd->fd_out != STDOUT_FILENO && dup2(cmd->fd_out, STDOUT_FILENO) == -1)
    {
        if (cmd->fd_in != STDIN_FILENO)
            dup2(stdin_backup, STDIN_FILENO);
        if (stdin_backup != -1)
            close(stdin_backup);
        if (stdout_backup != -1)
            close(stdout_backup);
        return FALSE;
    }
    
    return TRUE;
}

static void cleanup_redirections(t_command *cmd)
{
    if (cmd->fd_in != STDIN_FILENO)
        close(cmd->fd_in);
    if (cmd->fd_out != STDOUT_FILENO)
        close(cmd->fd_out);
}

static bool handle_pipe_setup(t_data *data, t_command *cmd)
{
    if (cmd->next && cmd->next->type == PIPE)
    {
        if (pipe(data->pipe) == -1)
            return FALSE;
        cmd->next->next->fd_in = data->pipe[0];
        cmd->fd_out = data->pipe[1];
    }
    return TRUE;
}

bool exec_pipe(t_data *data)
{
    t_command *cmd = data->commands;
    int cmd_count = 0;
    while (cmd && ++cmd_count)
        cmd = cmd->next;
        
    pid_t *pids = malloc(sizeof(pid_t) * cmd_count);
    if (!pids)
        return FALSE;
    
    cmd = data->commands;
    int i = 0;
    while (cmd)
    {
        if (cmd->type != CMD)
        {
            if (handle_operator(cmd, cmd->next) == -1)
            {
                while (--i >= 0)
                {
                    kill(pids[i], SIGTERM);
                    waitpid(pids[i], NULL, 0);
                }
                free(pids);
                return FALSE;
            }
            cmd = cmd->next;
            continue;
        }
        
        if (!handle_pipe_setup(data, cmd))
        {
            while (--i >= 0)
            {
                kill(pids[i], SIGTERM);
                waitpid(pids[i], NULL, 0);
            }
            free(pids);
            return FALSE;
        }
        
        pids[i] = fork();
        if (pids[i] == -1)
        {
            while (--i >= 0)
            {
                kill(pids[i], SIGTERM);
                waitpid(pids[i], NULL, 0);
            }
            free(pids);
            return FALSE;
        }
        
        if (pids[i] == 0)
        {
            free(pids);
            if (!setup_redirections(cmd))
                exit(1);
                
            if (ifbuiltin(cmd->args[0]))
            {
                exect_builtin(cmd->args, data);
                exit(0);
            }
            exec_all(cmd->args, data);
        }
        
        cleanup_redirections(cmd);
        cmd = cmd->next;
        i++;
    }
    
    int status;
    for (i = 0; i < cmd_count; i++)
    {
        waitpid(pids[i], &status, 0);
        if (WIFEXITED(status))
            g_exit_value = WEXITSTATUS(status);
    }
    
    free(pids);
    return TRUE;
}

bool exec_cmd(t_data *data, t_command *cmd)
{
    t_command *current = cmd;
    while (current && current->type != CMD)
    {
        if (handle_operator(current, current->next) == -1)
            return FALSE;
        current = current->next;
    }
    
    if (!current || !current->args || !current->args[0])
        return FALSE;
        
    if (ifbuiltin(current->args[0]))
    {
        if (!setup_redirections(current))
            return FALSE;
            
        exect_builtin(current->args, data);
        cleanup_redirections(current);
        return TRUE;
    }
    
    pid_t pid = fork();
    if (pid == -1)
        return FALSE;
        
    if (pid == 0)
    {
        if (!setup_redirections(current))
            exit(1);
        exec_all(current->args, data);
    }
    
    int status;
    waitpid(pid, &status, 0);
    if (WIFEXITED(status))
        g_exit_value = WEXITSTATUS(status);
        
    cleanup_redirections(current);
    return TRUE;
}
