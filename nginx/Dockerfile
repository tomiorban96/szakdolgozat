FROM nginx:latest
RUN chown nginx:nginx /home
COPY nginx.conf /etc/nginx/conf.d/default.conf
#COPY sslcert/server.crt /etc/nginx/server.crt
#COPY sslcert/server.key /etc/nginx/server.key