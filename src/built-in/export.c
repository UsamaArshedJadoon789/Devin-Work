#include "../../include/minishell.h"

void	show_env_sorted(t_env *env)
{
	t_env	*current;
	t_env	*min;
	t_env	*temp;
	char	*min_str;

	if (!env)
		return;

	temp = env;
	while (temp)
	{
		current = temp;
		min = current;
		while (current)
		{
			if (ft_strcmp(current->str, min->str) < 0)
				min = current;
			current = current->next;
		}
		if (min != temp)
		{
			min_str = min->str;
			min->str = temp->str;
			temp->str = min_str;
		}
		ft_putstr_fd("declare -x ", 1);
		char *equals = ft_strchr(temp->str, '=');
		if (equals)
		{
			write(1, temp->str, equals - temp->str + 1);
			ft_putchar_fd('"', 1);
			ft_putstr_fd(equals + 1, 1);
			ft_putchar_fd('"', 1);
		}
		else
			ft_putstr_fd(temp->str, 1);
		ft_putchar_fd('\n', 1);
		temp = temp->next;
	}
}

void	edit_var(char *var, char *value, t_data *data)
{
	t_env	*tmp_env;
	char	*tmp;
	char	*tmp2;

	if (!var || !data || !data->env)
		return;

	tmp_env = data->env;
	while (tmp_env)
	{
		if (ft_strstr(tmp_env->str, var))
		{
			free(tmp_env->str);
			tmp = ft_strdup(var);
			if (!tmp)
				return;
			tmp2 = ft_strjoin(tmp, "=");
			free(tmp);
			if (!tmp2)
				return;
			tmp_env->str = ft_strjoin(tmp2, value ? value : "");
			free(tmp2);
			return;
		}
		tmp_env = tmp_env->next;
	}
}

void	add_var(char *var, char *value, t_data *data)
{
	char	*tmp;
	char	*tmp2;

	if (!var)
		return;

	tmp = ft_strdup(var);
	if (!tmp)
		return;

	tmp2 = ft_strjoin(tmp, "=");
	free(tmp);
	if (!tmp2)
		return;

	tmp = ft_strjoin(tmp2, value ? value : "");
	free(tmp2);
	if (!tmp)
		return;

	env_add_back(&data->env, env_create(tmp, last_env(data->env)->index + 1));
	free(tmp);
}

void	export_command(char **args, t_data *data)
{
	char	*equals_pos;
	char	*plus_pos;
	int		i;
	t_env	*existing;

	if (!args[1])
	{
		show_env_sorted(data->env);
		g_exit_value = 0;
		return;
	}

	i = 1;
	while (args[i])
	{
		if (args[i][0] == '\0' || args[i][0] == '=' || (!ft_isalpha(args[i][0]) && args[i][0] != '_'))
		{
			ft_putstr_fd("minishell: export: `", 2);
			ft_putstr_fd(args[i], 2);
			ft_putstr_fd("': not a valid identifier\n", 2);
			g_exit_value = 1;
			i++;
			continue;
		}

		equals_pos = ft_strchr(args[i], '=');
		plus_pos = ft_strchr(args[i], '+');
		
		if (plus_pos && plus_pos[1] == '=' && plus_pos > args[i])
		{
			*plus_pos = '\0';
			if (!ft_isalpha(args[i][0]) && args[i][0] != '_')
			{
				ft_putstr_fd("minishell: export: `", 2);
				ft_putstr_fd(args[i], 2);
				ft_putstr_fd("': not a valid identifier\n", 2);
				g_exit_value = 1;
				i++;
				continue;
			}

			existing = get_env_var(args[i], data);
			if (existing && ft_strchr(existing->str, '='))
			{
				char *old_value = ft_strchr(existing->str, '=') + 1;
				char *new_value = ft_strjoin(old_value, plus_pos + 2);
				if (new_value)
				{
					edit_var(args[i], new_value, data);
					free(new_value);
				}
			}
			else
				add_var(args[i], plus_pos + 2, data);
			*plus_pos = '+';
		}
		else if (!equals_pos)
		{
			if (do_var_exist(data, args[i]) == FALSE)
				add_var(args[i], NULL, data);
		}
		else
		{
			*equals_pos = '\0';
			char *tmp = args[i];
			while (*tmp)
			{
				if (!ft_isalnum(*tmp) && *tmp != '_')
				{
					ft_putstr_fd("minishell: export: `", 2);
					ft_putstr_fd(args[i], 2);
					ft_putstr_fd("': not a valid identifier\n", 2);
					*equals_pos = '=';
					g_exit_value = 1;
					break;
				}
				tmp++;
			}
			if (*tmp == '\0')
			{
				if (do_var_exist(data, args[i]) == TRUE)
					edit_var(args[i], equals_pos + 1, data);
				else
					add_var(args[i], equals_pos + 1, data);
			}
			*equals_pos = '=';
		}
		i++;
	}
	g_exit_value = 0;
}
