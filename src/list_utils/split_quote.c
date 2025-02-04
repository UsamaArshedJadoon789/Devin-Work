#include "../../include/minishell.h"


static char *extract_quoted_token(const char *line, size_t *i, char quote_char)
{
    size_t start = *i;
    (*i)++;
    while (line[*i] && line[*i] != quote_char)
        (*i)++;
    if (line[*i])
        (*i)++;
    return ft_strndup(&line[start], *i - start);
}

static char *extract_unquoted_token(const char *line, size_t *i)
{
    size_t start = *i;
    while (line[*i] && line[*i] != ' ' && line[*i] != '\'' && line[*i] != '\"')
        (*i)++;
    return ft_strndup(&line[start], *i - start);
}

char **split_quote(const char *line)
{
    size_t len = strlen(line);
    char **tab = malloc((len + 1) * sizeof(char *));
    size_t i = 0, j = 0;

    while (i < len) {
        while (line[i] == ' ')
            i++;
        if (!line[i])
            break;
            
        if (line[i] == '\'' || line[i] == '\"')
            tab[j++] = extract_quoted_token(line, &i, line[i]);
        else
            tab[j++] = extract_unquoted_token(line, &i);
    }
    tab[j] = NULL;
    return tab;
}
