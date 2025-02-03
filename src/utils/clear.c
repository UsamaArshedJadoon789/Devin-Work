#include "../../include/minishell.h"

void clear_all(t_data *data)
{
    if (!data)
        return;
    if (data->path)
        clear_tab(data->path);
    if (data->env)
        env_clear(&data->env, free);
    if (data->args) {
        clear_2tab(data->args);
        free(data->args);
    }
    if (data->cmd)
        ft_lstclear(&(data->cmd), free);
    if (data->token)
        token_clear(&(data->token), free);
    if (data->user)
        free(data->user);
}
