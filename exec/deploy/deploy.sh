echo 'backend build start'

cd ../../back

echo 'backend image build'
docker build -t newstar_back .

cd ../

cd front/newstar

echo 'frontend image build'
docker build -t newstar_front .

cd ../../exec/deploy

EXIST_BLUE=$(docker compose -p deploy-blue -f docker-compose.blue.yaml ps | grep Up)

if [ -z "$EXIST_BLUE" ]; then
    docker compose -p deploy-blue -f docker-compose.blue.yaml up -d
    BEFORE_COLOR="green"
    AFTER_COLOR="blue"
    BEFORE_SPRING_PORT=8081
    BEFORE_REACT_PORT=3001
    AFTER_SPRING_PORT=8080
    AFTER_REACT_PORT=3000
else
    docker compose -p deploy-green -f docker-compose.green.yaml up -d
    BEFORE_COLOR="blue"
    AFTER_COLOR="green"
    BEFORE_SPRING_PORT=8080
    BEFORE_REACT_PORT=3000
    AFTER_SPRING_PORT=8081
    AFTER_REACT_PORT=3001
fi

sleep 10

echo "${AFTER_COLOR} server up(spring_port:${AFTER_SPRING_PORT}, react_port:${AFTER_REACT_PORT})"

EXIST_AFTER=$(docker compose -p deploy-${AFTER_COLOR} -f docker-compose.${AFTER_COLOR}.yaml ps | grep Up)

if [ -n "$EXIST_AFTER" ]; then
    echo "nginx Setting"
    docker exec -i nginx /bin/bash -c "cd /etc/nginx/conf.d && cp service-url.inc service-url_cp.inc && sed -i 's/${BEFORE_SPRING_PORT}/${AFTER_SPRING_PORT}/' service-url_cp.inc && sed -i 's/${BEFORE_REACT_PORT}/${AFTER_REACT_PORT}/' service-url_cp.inc && cat service-url_cp.inc > service-url.inc && rm -rf service-url_cp.inc && nginx -s reload"
    echo "Completed Deploy!"
    echo "$BEFORE_COLOR server down(spring_port:${BEFORE_SPRING_PORT}, react_port:${BEFORE_REACT_PORT})"
    docker compose -p deploy-${BEFORE_COLOR} -f docker-compose.${BEFORE_COLOR}.yaml down
fi

