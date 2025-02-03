#include "../../include/minishell.h"

void clear_tab(char **tab)
{
    if (!tab)
        return;
    for (int i = 0; tab[i]; i++)
        free(tab[i]);
    free(tab);
}

void clear_2tab(char ***tab)
{
    if (!tab)
        return;
    for (int i = 0; tab[i]; i++)
        clear_tab(tab[i]);
    free(tab);
}

int ft_strtablen(char ***tab)
{
    if (!tab)
        return 0;
    int i = 0;
    while (tab[i])
        i++;
    return i;
}
