cp ./prod.env ./.env
docker-compose down > /dev/null 2>&1
docker run --rm -v vhost:/vhost_og busybox sh -c "{ echo 'client_max_body_size 10m;'; } > /vhost_og/${VIRTUAL_HOST}" &&
docker-compose build
docker-compose up --detach --always-recreate-deps --force-recreate