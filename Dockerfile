FROM nginx:alpine
COPY docker-angular-app /usr/share/nginx/html
EXPOSE 80
