#include "../../include/minishell.h"
#include <limits.h>
#include <errno.h>
#include <stdint.h>

void	exit_command(t_data *data)
{
	char	**args;
	long long	exit_code;
	char	*str;
	int		is_negative;

	if (!data || !data->args || !*data->args)
	{
		ft_putstr_fd("exit\n", 2);
		exit(g_exit_value);
	}

	args = *data->args;
	ft_putstr_fd("exit\n", 2);
	if (!args[1])
	{
		clear_all(data);
		rl_clear_history();
		exit(g_exit_value);
	}

	str = args[1];
	while (*str == ' ' || *str == '\t')
		str++;
	
	is_negative = 0;
	if (*str == '-')
	{
		is_negative = 1;
		str++;
	}
	else if (*str == '+')
		str++;
	
	if (!*str)
	{
		ft_putstr_fd("minishell: exit: ", 2);
		ft_putstr_fd(args[1], 2);
		ft_putstr_fd(": numeric argument required\n", 2);
		clear_all(data);
		rl_clear_history();
		exit(2);
	}

	char *tmp = str;
	while (*tmp)
	{
		if (!ft_isdigit(*tmp))
		{
			ft_putstr_fd("minishell: exit: ", 2);
			ft_putstr_fd(args[1], 2);
			ft_putstr_fd(": numeric argument required\n", 2);
			clear_all(data);
			rl_clear_history();
			exit(2);
		}
		tmp++;
	}

	if (args[2])
	{
		ft_putstr_fd("minishell: exit: too many arguments\n", 2);
		g_exit_value = 1;
		return;
	}

	errno = 0;
	exit_code = ft_atoll(args[1]);

	if (errno == ERANGE || 
		(ft_strlen(args[1]) > 20) ||
		(exit_code == LLONG_MAX && ft_strcmp(args[1], "9223372036854775807") != 0) ||
		(exit_code == LLONG_MIN && ft_strcmp(args[1], "-9223372036854775808") != 0))
	{
		ft_putstr_fd("minishell: exit: ", 2);
		ft_putstr_fd(args[1], 2);
		ft_putstr_fd(": numeric argument required\n", 2);
		clear_all(data);
		rl_clear_history();
		exit(2);
	}

	if (is_negative && exit_code != LLONG_MIN)
		exit_code = -exit_code;

	unsigned char final_code;
	if (exit_code < 0)
		final_code = (256 - ((-exit_code) % 256)) % 256;
	else
		final_code = exit_code % 256;

	g_exit_value = final_code;
	clear_all(data);
	rl_clear_history();
	exit(final_code);
}
