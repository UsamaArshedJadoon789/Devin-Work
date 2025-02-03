#include "../../include/minishell.h"

// Function moved to check_allcmd.c

bool check_builtin(char *cmd, t_token *it, t_data *data)
{
	if (ft_strncmp(cmd, "echo", 4) == 0 || ft_strncmp(cmd, "pwd", 3) == 0 || \
		ft_strncmp(cmd, "cd", 2) == 0 || ft_strncmp(cmd, "export", 6) == 0 || \
		ft_strncmp(cmd, "unset", 5) == 0 || ft_strncmp(cmd, "env", 3) == 0 || \
		ft_strncmp(cmd, "exit", 4) == 0 || it->type == 3 || it->type == 4 || \
		it->type == 1 || it->type == 2)
	{
		it->builtins = 1;
		return (TRUE);
	}
	else if (check_allcmd(cmd, data) == TRUE)
	{
		char *temp = ft_strdup(cmd);
		if (temp)
			it->path = temp;
		else
			return (FALSE);
		return (TRUE);
	}
	else
	{
		printf("\033[0;36mminicoque \033[0;0m: \033[0;31mcommand not \
			found \033[0;0m : %s \n", cmd);
		return (FALSE);
	}
}

bool check_cmd(t_data *data)
{
  t_token *it;
  bool bol;
  int  i;

  i = 0;
  bol = 0;
  it = data->token;
  while (it)
  {
    if ((it->type == CMD || it->type == TRUNC || it->type == APPEND) && !check_builtin(it->str, it, data))
   {
      bol = 1;
   }
    if (it->type == CMD)
      data->path[i++] = it->path;
    it = it->next;
  }
  data->path[i] = NULL;
  if (bol == 1)
    return (FALSE);
  return (TRUE);
}

bool  setup_tabarg(t_data *data)
{
  t_token *it;
  char ***args;
  int i;

  data->nb_path = 0;
  it = data->token;
  args = ft_calloc(sizeof(char **), data->pipe_nbr + 2);
  if (!args)
    return (FALSE);
  i = 0;
  while (it)
  {
    while (it && it->type != 6 && it->type != 3 && it->type != 4)
      it = it->next;
    if (!it)
      break ;
    setup_arg(it);
    args[i] = it->arg;
    it = it->next;
    i++;
  }
  data->args = args;
  return (TRUE);
}

bool task_cmd(t_data *data)
{
  if (!check_cmd(data))
    return (FALSE);
  if (!setup_tabarg(data))
    return (FALSE);
  if (data->pipe_nbr == 0 && !exec_cmd(data, data->args))
    return (FALSE);
  if (data->pipe_nbr != 0 && !exec_pipe(data, data->args))
    return (FALSE);
  return (TRUE);
}
