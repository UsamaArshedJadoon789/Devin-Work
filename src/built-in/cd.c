#include "../../include/minishell.h"
#include <errno.h>

void	cd_command(char **args, t_data *data)
{
	char	*oldpwd;
	char	*newpwd;
	char	*path;
	char	*tmp;
	char	*home;

	if (!data || !args)
	{
		g_exit_value = 1;
		return;
	}

	oldpwd = getcwd(NULL, 0);
	if (!oldpwd)
	{
		oldpwd = ft_strdup("");
		if (!oldpwd)
		{
			g_exit_value = 1;
			return;
		}
	}

	if (!args[1] || ft_strncmp(args[1], "~", 1) == 0)
	{
		home = get_env_var("HOME", data) ? get_env_var("HOME", data)->str : NULL;
		if (!home)
		{
			ft_putstr_fd("minishell: cd: HOME not set\n", 2);
			free(oldpwd);
			g_exit_value = 1;
			return;
		}
		tmp = ft_strchr(home, '=');
		tmp = tmp ? tmp + 1 : home;
		if (args[1] && args[1][1])
			path = ft_strjoin(tmp, args[1] + 1);
		else
			path = ft_strdup(tmp);
	}
	else if (ft_strncmp(args[1], "-", 2) == 0)
	{
		tmp = get_env_var("OLDPWD", data) ? get_env_var("OLDPWD", data)->str : NULL;
		if (!tmp)
		{
			ft_putstr_fd("minishell: cd: OLDPWD not set\n", 2);
			free(oldpwd);
			g_exit_value = 1;
			return;
		}
		path = ft_strchr(tmp, '=');
		path = path ? ft_strdup(path + 1) : ft_strdup(tmp);
		if (path)
			ft_putendl_fd(path, 1);
	}
	else
		path = ft_strdup(args[1]);

	if (!path)
	{
		free(oldpwd);
		g_exit_value = 1;
		return;
	}

	if (chdir(path) == -1)
	{
		ft_putstr_fd("minishell: cd: ", 2);
		ft_putstr_fd(args[1], 2);
		ft_putstr_fd(": ", 2);
		ft_putstr_fd(strerror(errno), 2);
		ft_putstr_fd("\n", 2);
		free(oldpwd);
		free(path);
		g_exit_value = 1;
		return;
	}

	newpwd = getcwd(NULL, 0);
	if (!newpwd)
	{
		newpwd = ft_strdup(path);
		if (!newpwd)
		{
			free(oldpwd);
			free(path);
			g_exit_value = 1;
			return;
		}
	}

	if (oldpwd && oldpwd[0])
		edit_var("OLDPWD", oldpwd, data);
	edit_var("PWD", newpwd, data);
	free(oldpwd);
	free(newpwd);
	free(path);
	g_exit_value = 0;
}
