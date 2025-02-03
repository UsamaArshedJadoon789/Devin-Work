#include "../../include/minishell.h"

void clear_tab(char **tab)
{
    int i;

    if (!tab)
        return;
    i = 0;
    while (tab[i])
    {
        free(tab[i]);
        i++;
    }
    free(tab);
}

void clear_2tab(char ***tab)
{
    int i;

    if (!tab)
        return;
    i = 0;
    while (tab[i])
    {
        clear_tab(tab[i]);
        i++;
    }
}

int ft_strtablen(char ***tab)
{
    int i;

    if (!tab)
        return (0);
    i = 0;
    while (tab[i])
        i++;
    return (i);
}
