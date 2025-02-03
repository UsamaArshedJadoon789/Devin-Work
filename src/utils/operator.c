#include "../../include/minishell.h"
#include <sys/stat.h>
#include <errno.h>

int	ft_append(char **args, int *fd)
{
	int	new_fd;

	new_fd = open(args[1], O_WRONLY | O_APPEND | O_CREAT, 0644);
	if (new_fd == -1)
	{
		ft_putstr_fd("minishell: ", 2);
		ft_putstr_fd(args[1], 2);
		if (errno == EACCES)
			ft_putstr_fd(": Permission denied\n", 2);
		else if (errno == EISDIR)
			ft_putstr_fd(": Is a directory\n", 2);
		else
			ft_putstr_fd(": No such file or directory\n", 2);
		g_exit_value = 1;
		return (-1);
	}

	*fd = new_fd;
	return (0);
}

int	ft_trunc(char **args, int *fd)
{
	int	new_fd;

	new_fd = open(args[1], O_WRONLY | O_TRUNC | O_CREAT, 0644);
	if (new_fd == -1)
	{
		ft_putstr_fd("minishell: ", 2);
		ft_putstr_fd(args[1], 2);
		if (errno == EACCES)
			ft_putstr_fd(": Permission denied\n", 2);
		else if (errno == EISDIR)
			ft_putstr_fd(": Is a directory\n", 2);
		else
			ft_putstr_fd(": No such file or directory\n", 2);
		g_exit_value = 1;
		return (-1);
	}

	*fd = new_fd;
	return (0);
}

static void	handle_heredoc_signal(int sig)
{
	(void)sig;
	write(STDOUT_FILENO, "\n", 1);
	exit(130);
}

int	ft_heredoc(const char *delimiter, int *saved_fd)
{
	char	*line;
	char	*tmp_file;
	int		fd;
	pid_t	pid;
	int		status;

	if (!delimiter || !saved_fd)
	{
		ft_putstr_fd("minishell: syntax error near unexpected token `newline'\n", 2);
		g_exit_value = 2;
		return (-1);
	}

	tmp_file = "/tmp/.minishell_heredoc";
	unlink(tmp_file);  // Remove any existing heredoc file
	pid = fork();
	if (pid == -1)
	{
		perror("minishell: fork");
		g_exit_value = 1;
		return (-1);
	}

	if (pid == 0)
	{
		signal(SIGINT, handle_heredoc_signal);
		fd = open(tmp_file, O_WRONLY | O_CREAT | O_TRUNC, 0644);
		if (fd == -1)
			exit(1);

		while (1)
		{
			write(STDOUT_FILENO, "> ", 2);
			line = get_next_line(STDIN_FILENO);
			if (!line)
			{
				close(fd);
				exit(1);
			}
			
			if (ft_strncmp(line, delimiter, ft_strlen(delimiter)) == 0 &&
				line[ft_strlen(delimiter)] == '\n')
			{
				free(line);
				close(fd);
				exit(0);
			}
			write(fd, line, ft_strlen(line));
			free(line);
		}
	}

	waitpid(pid, &status, 0);
	if (WIFEXITED(status) && WEXITSTATUS(status) == 130)
	{
		unlink(tmp_file);
		g_exit_value = 130;
		return (-1);
	}

	if (WIFEXITED(status) && WEXITSTATUS(status) != 0)
	{
		unlink(tmp_file);
		return (-1);
	}

	fd = open(tmp_file, O_RDONLY);
	if (fd == -1)
	{
		unlink(tmp_file);
		return (-1);
	}

	*saved_fd = fd;
	unlink(tmp_file);
	return (0);
}

int	ft_input(char **args, int *fd)
{
	int	new_fd;

	new_fd = open(args[1], O_RDONLY);
	if (new_fd == -1)
	{
		ft_putstr_fd("minishell: ", 2);
		ft_putstr_fd(args[1], 2);
		if (errno == EACCES)
			ft_putstr_fd(": Permission denied\n", 2);
		else if (errno == EISDIR)
			ft_putstr_fd(": Is a directory\n", 2);
		else
			ft_putstr_fd(": No such file or directory\n", 2);
		g_exit_value = 1;
		return (-1);
	}

	*fd = new_fd;
	return (0);
}

int	operator_choice(char **tab, int *fd)
{
	if (!tab || !tab[0] || !fd)
	{
		ft_putstr_fd("minishell: syntax error near unexpected token `newline'\n", 2);
		g_exit_value = 2;
		return (-1);
	}

	if (!tab[1])
	{
		ft_putstr_fd("minishell: syntax error near unexpected token `newline'\n", 2);
		g_exit_value = 2;
		return (-1);
	}

	int ret = -1;
	if (ft_strncmp(tab[0], ">>", 2) == 0 && ft_strlen(tab[0]) == 2)
	{
		ret = ft_append(tab, fd);
		if (ret == 0 && dup2(*fd, STDOUT_FILENO) == -1)
		{
			perror("minishell: dup2");
			close(*fd);
			*fd = -1;
			ret = -1;
		}
	}
	else if (ft_strncmp(tab[0], ">", 1) == 0 && ft_strlen(tab[0]) == 1)
	{
		ret = ft_trunc(tab, fd);
		if (ret == 0 && dup2(*fd, STDOUT_FILENO) == -1)
		{
			perror("minishell: dup2");
			close(*fd);
			*fd = -1;
			ret = -1;
		}
	}
	else if (ft_strncmp(tab[0], "<<", 2) == 0 && ft_strlen(tab[0]) == 2)
	{
		ret = ft_heredoc(tab[1], fd);
		if (ret == 0 && dup2(*fd, STDIN_FILENO) == -1)
		{
			perror("minishell: dup2");
			close(*fd);
			*fd = -1;
			ret = -1;
		}
	}
	else if (ft_strncmp(tab[0], "<", 1) == 0 && ft_strlen(tab[0]) == 1)
	{
		ret = ft_input(tab, fd);
		if (ret == 0 && dup2(*fd, STDIN_FILENO) == -1)
		{
			perror("minishell: dup2");
			close(*fd);
			*fd = -1;
			ret = -1;
		}
	}
	else
	{
		ft_putstr_fd("minishell: syntax error near unexpected token `", 2);
		ft_putstr_fd(tab[0], 2);
		ft_putstr_fd("'\n", 2);
		g_exit_value = 2;
		ret = -1;
	}

	if (*fd != -1)
	{
		close(*fd);
		*fd = -1;
	}

	return ret;
}
