/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   minishell.h                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: grouger <marvin@42.fr>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/10/08 14:35:05 by grouger           #+#    #+#             */
/*   Updated: 2024/10/08 14:46:05 by grouger          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef    MINISHELL_H
# define   MINISHELL_H
#ifndef    BUFFER_SIZE
# define   BUFFER_SIZE 10
# endif

extern int g_exit_value;

# define   bool unsigned int
# define   TRUE 1
# define   FALSE 0


# include <stdio.h>
# include <signal.h>
# include <stdlib.h>
# include <string.h>
# include <stdint.h>
# include <fcntl.h>
# include <readline/readline.h>
# include <readline/history.h>
# include <sys/wait.h>
# include <unistd.h>
# include "../libft/libft.h"
// typedef struct s_token 

typedef struct s_token {
  char *str;
  int type;
  bool dq;
  bool sq;
  char *path;
  char **arg;
  bool  builtins;
  struct s_token *prev;
  struct s_token *next;
  struct s_data *data;
} t_token;

// typedef struct s_data 

typedef struct s_command {
    char **args;
    int type;        // CMD, PIPE, REDIR_IN, REDIR_OUT, etc.
    int fd_in;
    int fd_out;
    struct s_command *next;
} t_command;

typedef struct s_data {
    struct s_env *env;
    int fd_in;
    int fd_out;
    char *user;
    bool *dq;
    bool *sq;
    int p_index;
    char *minishell_path;
    char **path;
    int nb_path;
    char **list_path;
    struct s_list *cmd;
    struct s_token *token;
    t_command *commands;
    int pipe[2];
}      t_data;

//typedef struct s_env

typedef struct s_env {
  char *str;
  int index;
  int first_value;
  struct s_env *prev;
  struct s_env *next;
} t_env;

//fonction
void  starting_message(void);
void  setup(char **env, t_data *data);
bool  parsing(char *line, t_data *data );
void  path_setup(char **env, t_data *data);
void  env_setup(char **env, t_data *data);
bool  spliting_cmd(char *line, t_data *data);
void  list_path_setup(t_data *data);
void  signal_setup(void);
bool  emptyline(char *line);
void  print_prompt(void);
char  *get_prompt(void);

//utils
int     tablen(char **tab);
int     is_dollar(char *str);
int     countarg(t_token *token);
t_env   *get_env_var(char *var, t_data *data);
char    *replace_var(char *str, t_data *data);
char    **env_to_tab(t_env *env);
bool    other_cmd(t_token *token);
t_token  *next_cmd(t_token *token);

//built-in
void	 echo_command(char **args);
void	 cd_command(char **args, t_data *data);
bool   do_var_exist(t_data *data, char *var);
void	 export_command(char **args, t_data *data);
void   unset_command(char **args, t_data *data);
void	 free_env(t_env *env);
void   pwd_command(void);
void	 exit_command(void);
void   env_command(char **args, t_data *data);

//quote
char **quote_fusion(char **tab, t_data *data);
bool quote_check(char *line);

//Token
t_token *token_create(char *str, int token);
t_token *last_token(t_token *lst);
bool    token_setup(t_data *data);
void   setup_arg(t_token *token);
void    token_add_back(t_token **lst, t_token *tok);
void	  token_clear(t_token **lst, void (*del)(void *));

//ft_split
void	*ft_calloc(size_t nm, size_t n);
char	**ft_split(char *str, char *charset);
char **split_quote(const char *line);
char **split_sep(char **input, const char *separators);

//lib
char	*ft_strnstr(const char *str, const char *srch, size_t n);
void	ft_bzero(void *s, size_t n);
char	*ft_itoa(int n);
void	ft_putnbr_fd(int n, int fd);
void	ft_putstr_fd(char *s, int fd);
int	  ft_isalpha(int c);
int	  ft_isascii(int c);
char	*ft_strstr(const char *str, const char *srch);

//
void	env_add_back(t_env **lst, t_env *neew);
t_env *env_create(char *str, int index);
t_env *last_env(t_env *lst);
void	env_clear(t_env **lst, void (*del)(void *));
void change_pipe(t_data *data, int in, int out, int status);
int is_pid(char *str);
char *replace_pid(char *str);
void clear_all(t_data *data);
int	count_replace(char *str);
int next_dollar(char *str);
int is_exitcode(char *str);
char *replace_exitcode(char *str);


//Command management
t_command *create_command(char **args, int type);
void add_command(t_command **head, t_command *new_cmd);
void clear_commands(t_command **head);

//Exec
bool task_cmd(t_data *data);
bool exec_cmd(t_data *data, t_command *cmd);
bool exec_pipe(t_data *data);

//Operator
int handle_operator(t_command *cmd, t_command *next);


# define INPUT 1    //"<"
# define HEREDOC 2 //"<<"
# define TRUNC 3   //">"
# define APPEND 4  //">>"
# define PIPE 5    //"|"
# define CMD 6     //"|"
# define ARG 7     //"|"
# define PARAM 8

# define RESET \033[36m

# define BLACK \033[0;336m
# define RED \033[0;31m
# define GREEN \033[0;32m
# define YELLOW \033[0;93m
# define BLUE \033[0;34m
# define PURPLE \033[0;35m
# define CYAN \033[0;36m
# define White \033[0;37m

#endif
