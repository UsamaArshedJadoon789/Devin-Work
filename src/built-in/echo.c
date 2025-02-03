#include "../../include/minishell.h"

static void	print_arg(char *arg, t_data *data)
{
	int	i;
	int	in_single_quotes;
	int	in_double_quotes;

	i = 0;
	in_single_quotes = 0;
	in_double_quotes = 0;
	while (arg[i])
	{
		if (arg[i] == '\'' && !in_double_quotes)
			in_single_quotes = !in_single_quotes;
		else if (arg[i] == '"' && !in_single_quotes)
			in_double_quotes = !in_double_quotes;
		else if (arg[i] == '$' && !in_single_quotes && arg[i + 1])
		{
			i++;
			if (arg[i] == '?')
			{
				ft_putnbr_fd(g_exit_value, 1);
			}
			else if (ft_isalpha(arg[i]) || arg[i] == '_')
			{
				char var_name[256] = {0};
				int j = 0;
				while (arg[i] && (ft_isalnum(arg[i]) || arg[i] == '_') && j < 255)
					var_name[j++] = arg[i++];
				var_name[j] = '\0';
				t_env *env_var = get_env_var(var_name, data);
				if (env_var && ft_strchr(env_var->str, '='))
					ft_putstr_fd(ft_strchr(env_var->str, '=') + 1, 1);
				i--;
			}
			else
				ft_putchar_fd('$', 1);
		}
		else
			ft_putchar_fd(arg[i], 1);
		i++;
	}
}

void	echo_command(char **args, t_data *data)
{
	int	i;
	int	n_flag;

	if (!args)
	{
		write(1, "\n", 1);
		g_exit_value = 0;
		return;
	}

	i = 1;
	n_flag = 0;

	while (args[i] && args[i][0] == '-')
	{
		int j = 1;
		while (args[i][j] == 'n')
			j++;
		if (args[i][j] != '\0' || j == 1)
			break;
		n_flag = 1;
		i++;
	}

	while (args[i])
	{
		if (args[i][0] == '$')
		{
			char *var = args[i] + 1;
			if (var[0] == '?')
			{
				ft_putnbr_fd(g_exit_value, 1);
			}
			else
			{
				t_env *env_var = get_env_var(var, data);
				if (env_var && ft_strchr(env_var->str, '='))
					ft_putstr_fd(ft_strchr(env_var->str, '=') + 1, 1);
			}
		}
		else
			ft_putstr_fd(args[i], 1);
		
		if (args[i + 1])
			write(1, " ", 1);
		i++;
	}

	if (!n_flag)
		write(1, "\n", 1);
	g_exit_value = 0;
}
