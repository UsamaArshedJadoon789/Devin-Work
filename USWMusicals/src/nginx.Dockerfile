FROM nginx:1.22.1

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy frontend files
COPY USWMusicals.WebClient/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
