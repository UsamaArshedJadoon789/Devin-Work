FROM mcr.microsoft.com/dotnet/aspnet:8.0
RUN apt-get update && apt-get install -y nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY USWMusicals.WebClient/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
