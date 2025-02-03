#include "../../include/minishell.h"

void	env_command(char **args, t_data *data)
{
	t_env	*tmp_env;
	char	*equals_pos;

	if (!data || !data->env)
	{
		ft_putstr_fd("env: cannot run command\n", 2);
		g_exit_value = 127;
		return;
	}

	if (args[1])
	{
		ft_putstr_fd("env: '", 2);
		ft_putstr_fd(args[1], 2);
		ft_putstr_fd("': No such file or directory\n", 2);
		g_exit_value = 127;
		return;
	}

	tmp_env = data->env;
	while (tmp_env && tmp_env->str)
	{
		equals_pos = ft_strchr(tmp_env->str, '=');
		if (equals_pos)
		{
			ft_putstr_fd(tmp_env->str, 1);
			ft_putstr_fd("\n", 1);
		}
		tmp_env = tmp_env->next;
	}
	g_exit_value = 0;
}
