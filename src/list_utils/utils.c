#include "../../include/minishell.h"

int	ft_isalphalen(char *str)
{
	int	i;

	i = 0;
	while (str[i])
	{
		if (ft_isalpha(str[i]) != 0 || str[i] == '_')
			i++;
		else
			break ;
	}
	return (i);
}

char	*replace_var(char *str)
{
	char	*tmp;
	char	*var;
	char	*result;
	char	*before;
	int		i;
	int		len;

	i = is_dollar(str);
	if (i == -1)
		return (str);

	if (str[i] == '?' && (str[i + 1] == '\0' || str[i + 1] == ' ' || str[i + 1] == '$' || str[i + 1] == '"' || str[i + 1] == '\''))
	{
		before = ft_substr(str, 0, i - 1);
		if (!before)
			before = ft_strdup("");
		tmp = ft_itoa(g_exit_value);
		if (!tmp)
		{
			free(before);
			return (str);
		}
		result = ft_strjoin(before, tmp);
		free(before);
		free(tmp);
		if (!result)
			return (str);
		if (str[i + 1])
		{
			tmp = result;
			result = ft_strjoin(tmp, &str[i + 1]);
			free(tmp);
			if (!result)
				return (str);
		}
		free(str);
		return (result);
	}

	len = ft_isalphalen(&str[i]);
	if (len == 0)
	{
		if (str[i + 1] == '\0' || str[i + 1] == ' ' || str[i + 1] == '$' || str[i + 1] == '"' || str[i + 1] == '\'')
		{
			tmp = ft_substr(str, 0, i - 1);
			if (!tmp)
				tmp = ft_strdup("");
			result = ft_strjoin(tmp, &str[i + 1]);
			free(tmp);
			free(str);
			return (result ? result : str);
		}
		return (str);
	}

	tmp = ft_substr(str, i, len);
	if (!tmp)
		return (str);

	var = getenv(tmp);
	free(tmp);

	before = ft_substr(str, 0, i - 1);
	if (!before)
		before = ft_strdup("");
	if (!before)
	{
		free(str);
		return (NULL);
	}

	if (var)
	{
		result = ft_strjoin(before, var);
		free(before);
		if (!result)
		{
			free(str);
			return (NULL);
		}
	}
	else
	{
		free(before);
		result = ft_strdup("");
		if (!result)
		{
			free(str);
			return (NULL);
		}
	}

	if (str[i + len])
	{
		tmp = result;
		result = ft_strjoin(tmp, &str[i + len]);
		free(tmp);
		if (!result)
		{
			free(str);
			return (NULL);
		}
	}

	free(str);
	return (result);
}

int	tablen(char **tab)
{
	int	i;

	i = 0;
	while (tab[i])
		i++;
	return (i);
}

int	is_dollar(char *str)
{
	int	i;

	i = 0;
	while (str[i])
	{
		if (str[i] == '$' && str[i + 1])
		{
			if (str[i + 1] == '?' || ft_isalpha(str[i + 1]) || str[i + 1] == '_')
				return (i + 1);
			if (str[i + 1] == '$')
				i++;
		}
		i++;
	}
	return (-1);
}

void	setup_arg(t_token *token)
{
	char				**arg;
	t_token				*it;
	int					i;
	int					len;

	if (last_token(token) != token)
		it = token->next;
	else
		it = NULL;
	len = countarg(it) + 1;
	arg = ft_calloc(sizeof(char *), len + 1);
	i = 1;
	if (token->builtins == FALSE)
		arg[0] = ft_strdup(token->path);
	else
		arg[0] = ft_strdup(token->str);
	while (len > i && (it->type == ARG || it->type == PARAM))
	{
		arg[i] = ft_strdup(it->str);
		i++;
		it = it->next;
	}
	token->arg = arg;
	return ;
}
