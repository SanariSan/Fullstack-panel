FROM nginx:stable
COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/nginx/nginxconfig.io /etc/nginx/nginxconfig.io
COPY ./docker/nginx/sites-available/localhost.conf /etc/nginx/sites-available/localhost.conf
RUN ["mkdir", "/etc/nginx/sites-enabled"]
RUN ["ln", "-s", "/etc/nginx/sites-available/localhost.conf", "/etc/nginx/sites-enabled/localhost.conf"]
