#include "../../include/minishell.h"

static int handle_input_redirect(t_command *cmd, char *filename)
{
    int fd;

    if (cmd->fd_in != STDIN_FILENO)
        close(cmd->fd_in);
    
    fd = open(filename, O_RDONLY);
    if (fd == -1)
        return (-1);
        
    cmd->fd_in = fd;
    return (fd);
}

static int handle_output_redirect(t_command *cmd, char *filename, int flags)
{
    int fd;

    if (cmd->fd_out != STDOUT_FILENO)
        close(cmd->fd_out);
    
    fd = open(filename, flags, 0644);
    if (fd == -1)
        return (-1);
        
    cmd->fd_out = fd;
    return (fd);
}

int handle_operator(t_command *cmd, t_command *next)
{
    if (!next || !next->args || !next->args[0])
        return (-1);
        
    switch (cmd->type) {
        case TRUNC:
            return handle_output_redirect(cmd, next->args[0], 
                                       O_WRONLY | O_CREAT | O_TRUNC);
        case APPEND:
            return handle_output_redirect(cmd, next->args[0], 
                                       O_WRONLY | O_CREAT | O_APPEND);
        case INPUT:
            return handle_input_redirect(cmd, next->args[0]);
        case HEREDOC: {
            int pipe_fd[2];
            if (pipe(pipe_fd) == -1)
                return (-1);
                
            if (cmd->fd_in != STDIN_FILENO)
                close(cmd->fd_in);
                
            write(pipe_fd[1], next->args[0], ft_strlen(next->args[0]));
            close(pipe_fd[1]);
            
            cmd->fd_in = pipe_fd[0];
            return (pipe_fd[0]);
        }
        default:
            return (-1);
    }
}
