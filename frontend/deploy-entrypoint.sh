cp ./prod.env ./.env
docker container rm -f $(docker ps -a -q --no-trunc --filter name=^/fullstack-panel-front-build-container$) > /dev/null 2>&1
docker run --rm -v "fullstack-panel-front-build-staging-volume:/data" busybox sh -c "rm -rf /data/*"
docker build --build-arg "REACT_APP_API_URL=${CORS_URL}" --build-arg "REACT_APP_API_VERSION=${API_VERSION}" -t "fullstack-panel-front-build-img" -f ./docker/build.Dockerfile .
docker run --detach --rm --name "fullstack-panel-front-build-container" -v "fullstack-panel-front-build-staging-volume:/home/node/proj/build" fullstack-panel-front-build-img
sleep 1

if [ "$(docker ps -aqf "name=fullstack-panel-front-build-container")" ]; then 
    while docker inspect fullstack-panel-front-build-container >/dev/null 2>&1; do 
        echo "Waiting for build to finish...";
        sleep 5; 
    done;
    echo "Build completed";
    docker run --detach --rm -v "fullstack-panel-front-build-staging-volume:/staging" -v "fullstack-panel-front-build-volume:/prod" busybox sh -c "cp -rf /staging/* /prod";
    echo "Applied staging build to production volume";
fi
