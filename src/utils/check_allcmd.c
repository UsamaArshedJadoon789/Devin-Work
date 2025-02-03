#include "../../include/minishell.h"

bool check_allcmd(char *cmd, t_data *data)
{
	char	*path;
	int		i;

	if (!cmd || !data || !data->list_path)
		return (FALSE);

	i = 0;
	while (data->list_path[i])
	{
		path = ft_strjoin(data->list_path[i], "/");
		if (!path)
			return (FALSE);
		char *tmp = ft_strjoin(path, cmd);
		free(path);
		if (!tmp)
			return (FALSE);
		if (access(tmp, F_OK | X_OK) == 0)
		{
			free(tmp);
			return (TRUE);
		}
		free(tmp);
		i++;
	}

	if (access(cmd, F_OK | X_OK) == 0)
		return (TRUE);

	return (FALSE);
}
