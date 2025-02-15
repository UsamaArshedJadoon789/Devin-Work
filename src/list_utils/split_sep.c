#include "../../include/minishell.h"


int is_separator(char c, const char *separators) {
    while (*separators) {
        if (c == *separators) {
            return 1;
        }
        separators++;
    }
    return 0;
}

char *create_token(const char *start, const char *end) {
    int len;
    char *token;

    len = end - start + 1;
    token = malloc(len + 1);
    if (token) {
        ft_strlcpy(token, start, len+1);
        token[len] = '\0';
    }
    return token;
}

void split_single(char *str, char **result, const char *separators, int *j) 
{
    char *start = str;
    int in_quotes = 0;
    char *token_start;
    char quote_char = '\0';

    while (*start) 
    {
        if (*start == '"' || *start == '\'') {
            if (!in_quotes) 
            {
                in_quotes = 1;
                quote_char = *start;
                start++;
                continue;
            } 
            else if (*start == quote_char) 
            {
                in_quotes = 0;
                char *token = create_token(start - 1, start);
                result[(*j)++] = token;
                start++;
                continue;
            }
        }

        if (!in_quotes && is_separator(*start, separators)) 
        {
            char *sep_token = create_token(start, start);
            result[(*j)++] = sep_token;
            start++;
            continue;
        }
        if (in_quotes)
            token_start = start - 1;
        else
            token_start = start;
        while (*start && (in_quotes || !is_separator(*start, separators))) 
        {
            start++;
        }

        if (token_start < start)
        {
            char *token = create_token(token_start, start - 1);
            result[(*j)++] = token;
        }
    }
}

static bool is_separator(char c, const char *separators)
{
    while (*separators)
        if (c == *separators++)
            return true;
    return false;
}

static char *create_token(const char *start, size_t len)
{
    char *token = malloc(len + 1);
    if (token) {
        ft_strlcpy(token, start, len + 1);
        token[len] = '\0';
    }
    return token;
}

char **split_sep(char **inputs, const char *separators)
{
    char **result = malloc(1024 * sizeof(char *));
    if (!result || !inputs || !separators)
        return NULL;
        
    int j = 0;
    for (int i = 0; inputs[i]; i++) {
        char *str = inputs[i];
        char *start = str;
        
        while (*str) {
            if (is_separator(*str, separators)) {
                if (str > start)
                    result[j++] = create_token(start, str - start);
                result[j++] = create_token(str, 1);
                start = str + 1;
            }
            str++;
        }
        if (str > start)
            result[j++] = create_token(start, str - start);
    }
    result[j] = NULL;
    return result;
}
