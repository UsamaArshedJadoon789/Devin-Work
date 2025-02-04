#include "../../include/minishell.h"

t_command *create_command(char **args, int type)
{
    t_command *cmd;
    int i;

    cmd = malloc(sizeof(t_command));
    if (!cmd)
        return (NULL);
    
    i = 0;
    while (args && args[i])
        i++;
        
    cmd->args = malloc(sizeof(char *) * (i + 1));
    if (!cmd->args)
    {
        free(cmd);
        return (NULL);
    }
    
    i = 0;
    while (args && args[i])
    {
        cmd->args[i] = ft_strdup(args[i]);
        if (!cmd->args[i])
        {
            while (--i >= 0)
                free(cmd->args[i]);
            free(cmd->args);
            free(cmd);
            return (NULL);
        }
        i++;
    }
    cmd->args[i] = NULL;
    cmd->type = type;
    cmd->fd_in = STDIN_FILENO;
    cmd->fd_out = STDOUT_FILENO;
    cmd->next = NULL;
    return (cmd);
}

void add_command(t_command **head, t_command *new_cmd)
{
    t_command *current;

    if (!*head)
    {
        *head = new_cmd;
        return;
    }
    current = *head;
    while (current->next)
        current = current->next;
    current->next = new_cmd;
}

void clear_commands(t_command **head)
{
    t_command *current;
    t_command *next;
    int i;

    if (!head || !*head)
        return;
    current = *head;
    while (current)
    {
        next = current->next;
        if (current->args)
        {
            i = 0;
            while (current->args[i])
            {
                free(current->args[i]);
                i++;
            }
            free(current->args);
        }
        if (current->fd_in != STDIN_FILENO)
            close(current->fd_in);
        if (current->fd_out != STDOUT_FILENO)
            close(current->fd_out);
        free(current);
        current = next;
    }
    *head = NULL;
}
