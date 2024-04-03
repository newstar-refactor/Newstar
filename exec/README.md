# 포팅 메뉴얼

# 1.  개발환경

## 1.1. Frontend

- Node JS 20.12.0 (LTS)
- React 18.2.0
    - Recoil 0.7.7
    - Axios 1.6.7
    - Styled-components 6.1.8
    - React-router-dom 6.22.3

## 1.2. Backend

- Java
    - Openjdk 17.0.10
    - Gradle 8.5
    - Spring Boot 3.2.3
        - Spring Data JPA 3.2.3
        - Spring Boot Validation 3.2.3
        - Query DSL 5.0.0
        - JUnit 5.10.2
        - Lombok 1.18.30
        - Swagger 2.1.0
- Python
    - Python 3.9.4
    - FastAPI 0.110.0
    - Elastic Search 7.10.0
    - Kibana 7.10.1
    - Gensim 4.3.2
    - Beautifulsoup 4.12.3
    - Kobart

## 1.3. Server

- Ubuntu 20.04.6 LTS
- Nginx 1.25.4
- Docker 25.0.4
- Docker Compose (plugin) 2.24.1
- Jenkins 2.448

## 1.4. Database

- Redis 3.2.3
- MySQL 8.0
- Kafka
    - Kafka (wurstmeister) 2.8.1
    - Zookeeper (wurstmeister) 3.4.13
    - Kafka-ui 0.7.1

## 1.5. UI/UX

- Figma

## 1.6. IDE

- Visual Studio Code 1.86.2
- IntelliJ IDEA 2023.2

## 1.7. 형상 / 이슈관리

- Git
- Jira

## 1.8. 기타 Tool

- Postman 10.24.11

# 2. 환경 변수

## 2.1. Backend

- MYSQL_ROOT_PASSWORD
- MYSQL_USER_PROD_ID
- MYSQL_USER_PROD_PASSWORD
- MYSQL_USER_DEV_ID
- MYSQL_USER_DEV_PASSWORD

# 3. EC2 세팅

## 3.1 Port

| 내용 | External Port  | Internal Port |
| --- | --- | --- |
| SSH | 22 | - |
| HTTP ( HTTPS로 redirect) | 80 | - |
| HTTPS | 443 | - |
| Frontend (Nginx + React) | 3000, 3001 | 3000 |
| MySQL | - | 3306 |
| Backend (Spring Boot) | 8080, 8081 | 8080 |
| Backend (FastAPI) | 8000, 8001 | 8000 |
| Jenkins | 9999 | 8080 |
| Elastic Search | 9200 | 9200 |
| Kibana | 5601 | 5601 |

## 3.2. 방화벽(UFW) 설정

```java
# 1. 해당 포트 개방
# 22 TCP
# 80 TCP
# 443 TCP
# 3000, 3001 TCP
# 8080, 8081 TCP
# 8000, 8001 TCP
# 9999 TCP
# 9200 TCP
# 5601 TCP
# 예시
sudo ufw allow 22/TCP

# 2. UFW 활성화 및 상태 확인
sudo ufw enable
sudo ufw status verbose
```

## 3.3. 업데이트 서버 변경

```bash
vi /etc/apt/sources.list

:%s/ap-northeast-2.ec2.archive.ubuntu.com/mirror.kakao.com
:%s/security.ubuntu.com/mirror.kakao.com

sudo apt-get update
sudo apt-get upgrade
```

## 3.4. Docker 및 Docker compose 설치

```bash
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install docker-ce

sudo systemctl start docker
docker --version

sudo systemctl enable docker

sudo usermod -aG docker $USER
```

## 3.5. SSL 발급

```bash
vi init-letsencrpyt.sh

#!/bin/bash
domains="[도메인]" 
rsa_key_size=4096
data_path="[설정 파일 보관 경로]"
email="[발급자 이메일]" # Adding a valid address is strongly recommended

chmod +x init-letsencrpyt.sh
./init-letsencrpyt.sh

vi init-letsencrpyt.sh
:%s/docker-compose/docker compose

./init-letsencrpyt.sh
```

## 3.6. Jenkins(DoD) Image 빌드

```bash
vi Dockerfile

FROM jenkins/jenkins:lastest
USER root

RUN apt-get update && \
    apt-get -y install apt-transport-https \
      ca-certificates \
      curl \
      gnupg2 \
      software-properties-common && \
    curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg > /tmp/dkey; apt-key add /tmp/dkey && \
    add-apt-repository \
      "deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") \
      $(lsb_release -cs) \
      stable" && \
   apt-get update && \
   apt-get -y install docker-ce

RUN groupadd -f docker
RUN usermod -aG docker jenkins

docker build -t jenkins/custom .
```

## 3.7. Frontend Dockerfile

```bash
vi Dockerfile

FROM node:alpine AS builder

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

RUN rm -rf /etc/nginx/conf.d/*

COPY ./default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder usr/src/app/dist /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;"]

vi default.conf

server {
    listen 3000;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
}
```

## 3.8. Backend Dockerfile

```bash
vi Dockerfile

FROM openjdk:17-alpine AS builder

WORKDIR /usr/src/app

COPY build.gradle gradlew settings.gradle .

COPY gradle gradle

COPY src src

RUN chmod +x gradlew

RUN ./gradlew clean bootJar

FROM openjdk:17-alpine

WORKDIR /usr/src/app

ARG JAR_FILE=build/libs/*.jar

COPY --from=builder /usr/src/app/${JAR_FILE} app.jar

RUN apk add tzdata && ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
RUN echo Asia/Seoul > /etc/timezone

ENTRYPOINT ["java","-jar", "-Dspring.profiles.active=prod", "app.jar"]
```

## 3.9. Docker Custom Network 생성

```bash
docker network create app-net
```

## 3.10. Docker compose 작성

```bash
vi docker-compose.yaml

version: '3'

services:
    nginx:
        container_name: nginx
        image: nginx:latest
        restart: always
        volumes:
          - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
          - ./nginx/service-url.inc:/etc/nginx/conf.d/service-url.inc
          - ./data/certbot/conf:/etc/letsencrypt
          - ./data/certbot/www:/var/www/certbot
        ports:
          - 80:80
          - 443:443
        command: '/bin/sh -c ''while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g "daemon off;"'''

    mysql:
        container_name: mysql
        image: mysql:8.0
        restart: always
        expose:
          - 3306
        environment:
          MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
          TZ: Asia/Seoul
          LC_ALL: C.UTF-8
        command:
          - --character-set-server=utf8mb4
          - --collation-server=utf8mb4_unicode_ci
        volumes:
          - /mysql/:/var/lib/mysql
          - ./config/my.cnf:/etc/mysql/conf.d/my.cnf

    redis:
        container_name: redis
        image: redis:latest
        restart: always
        expose:
          - 6397
        environment:
          TZ: Asia/Seoul
        labels:
          - "name=redis"
          - "mode=standalone"
          
    jenkins:
        container_name: jenkins
        image: jenkins/custom
        volumes:
          - /var/run/docker.sock:/var/run/docker.sock
          - /jenkins:/var/jenkins_home
          - /env/.env:/env/.env
        ports:
          - 9999:8080
            #expose:
            #- 9999
            #environment:
            #JENKINS_OPTS: --httpPort=9999 --prefix=/jenkins
    elastic:
        container_name: elastic
        image: docker.elastic.co/elasticsearch/elasticsearch:7.10.0
        restart: always
        ports:
          - 9200:9200
        environment:
          - discovery.type=single-node
    kibana:
        container_name: kibana
        image: docker.elastic.co/kibana/kibana:7.10.1
        restart: always
        ports:
          - 5601:5601
        environment:
          ELASTICSEARCH_URL: http://elastic:9200
          ELASTICSEARCH_HOSTS: http://elastic:9200
          privileged: true

    certbot:
        container_name: certbot
        image: certbot/certbot
        restart: unless-stopped
        volumes:
          - ./data/certbot/conf:/etc/letsencrypt
          - ./data/certbot/www:/var/www/certbot
        entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"
networks:
  default:
    name: app-net
    external: true

```

## 3.10. Nginx 설정

```bash
vi default.conf

server {
    listen 80;
    listen [::]:80;
    server_name newstar.world;
    access_log off;

    location /.well-known/acme-challenge/ {
        allow all;
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

map $http_upgrade $connection_upgrade {
  default upgrade;
  '' close;
}

server {
    listen 443 ssl;
    server_name newstar.world;

    include /etc/nginx/conf.d/service-url.inc;

    ssl_certificate /etc/letsencrypt/live/newstar.world/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/newstar.world/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    ignore_invalid_headers off;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    location /api {
        proxy_pass $spring_url;
        proxy_set_header X-Forwarded-Host $server_name;
    }

    location /api/data/ {
        proxy_pass $fastapi_url;
        proxy_set_header X-Forwarded-Host $server_name;
    }

    location / {
        proxy_pass $react_url;
    }
}
```

```bash
set $spring_url http://172.17.0.1:8080;
set $react_url http://172.17.0.1:3000;
set $fastapi_url http://172.17.0.1:8000;
```

## 3.11. Docker compose UP

```bash
docker compose -f docker-compose.yaml up -d
```

# 4. Blue & Green CI/CD 구축

## 4.1. Jenkins 설정

### 4.1.1. Pipeline Script 작성

```java
pipeline {
    agent any
    
    stages {
        stage('clone'){
            steps{
                git credentialsId: '[비밀키]', url: 'https://lab.ssafy.com/s10-bigdata-recom-sub2/S10P22B302.git'
            }
        }
        stage('Build & Deploy'){
            steps{
                dir('exec/deploy'){
                    sh 'chmod +x deploy.sh'
                    sh './deploy.sh'
                    
                }
            }
        }
    }
}

```

### 4.1.2. Plugin 설치 목록

```bash
Post build task
Bitbucket Pipeline for Blue Ocean
Dashboard for Blue Ocean
Personalization for Blue Ocean
Display URL for Blue Ocean
Server Sent Events (SSE) Gateway
Events API for Blue Ocean
Blue Ocean Pipeline Editor
i18n for Blue Ocean
Autofavorite for Blue Ocean
GitHub Pipeline for Blue Ocean
Git Pipeline for Blue Ocean
Config API for Blue Ocean
Blue Ocean
Jersey 2 API
GitLab
Generic Webhook Trigger
GitLab Authentication
Gitlab API
GitLab Branch Source
Gitlab Merge Request Builder
Config File Provider
NodeJS
```

## 4.2 빌드 및 배포 Script

```bash
vi deploy.sh

#!/bin/bash

echo 'CI/CD Deploy Start'

cd ../../back
# spring Image build
echo 'backend image build'
docker build -t newstar_back .

cd ../front/newstar
# front Image build
echo 'frontend image build'
docker build -t newstar_front .

cd ../../pydata
# fastapi Image build
echo 'fastapi image build'
docker build -t fastapi_back .

cd ../exec/deploy
# Working container check
EXIST_BLUE=$(docker compose -p deploy-blue -f docker-compose.blue.yaml ps | grep Up)

if [ -z "$EXIST_BLUE" ]; then
    # blue
    docker compose -p deploy-blue -f docker-compose.blue.yaml up -d
    BEFORE_COLOR="green"
    AFTER_COLOR="blue"
    BEFORE_SPRING_PORT=8081
    BEFORE_REACT_PORT=3001
    BEFORE_FASTAPI_PORT=8001
    AFTER_SPRING_PORT=8080
    AFTER_REACT_PORT=3000
    AFTER_FASTAPI_PORT=8000
else
    # green
    docker compose -p deploy-green -f docker-compose.green.yaml up -d
    BEFORE_COLOR="blue"
    AFTER_COLOR="green"
    BEFORE_SPRING_PORT=8080
    BEFORE_REACT_PORT=3000
    BEFORE_FASTAPI_PORT=8000
    AFTER_SPRING_PORT=8081
    AFTER_REACT_PORT=3001
    AFTER_FASTAPI_PORT=8001
fi

# Spring Server health checking
for retry_count in {1..60}
do
    response=$(curl -s http://172.17.0.1:${AFTER_SPRING_PORT}/api/actuator/health)
    up_count=$(echo $response | grep 'UP' | wc -l)

    if [ $up_count -ge 1 ]
    then
        echo "=========================="
        echo "> Spring Server is working"
        echo "=========================="
        break
    else
        echo "> Spring Health is not working: ${response}"
    fi
    # about 10 minuetes
    if [ $retry_count -eq 60 ]
    then
        echo "> Spring Server working failed"
        docker compose -p deploy-${AFTER_COLOR} -f docker-compose.${AFTER_COLOR}.yaml down
        exit 1;
    fi
    # wating 10 seconds
    sleep 10
done

# Fastapi Server health checking
for retry_count in {1..60}
do
    response=$(curl -s http://172.17.0.1:${AFTER_FASTAPI_PORT}/api/data/health)
    up_count=$(echo $response | grep 'UP' | wc -l)

    if [ $up_count -ge 1 ]
    then
        echo "=========================="
        echo "> Fastapi Server is working"
        echo "=========================="
        break
    else
        echo "> Fastapi Health is not working: ${response}"
    fi
    # about 10 minuetes
    if [ $retry_count -eq 60 ]
    then
        echo "> Fastapi Server working failed"
        docker compose -p deploy-${AFTER_COLOR} -f docker-compose.${AFTER_COLOR}.yaml down
        exit 1;
    fi
    # wating 10 seconds
    sleep 20
done

echo "${AFTER_COLOR} server up(spring_port:${AFTER_SPRING_PORT}, react_port:${AFTER_REACT_PORT}, fastapi_port:${AFTER_FASTAPI_PORT})"

EXIST_AFTER=$(docker compose -p deploy-${AFTER_COLOR} -f docker-compose.${AFTER_COLOR}.yaml ps | grep Up)

if [ -n "$EXIST_AFTER" ]; then
    echo "nginx Setting"
    docker exec -i nginx /bin/bash -c "echo -e 'set \$spring_url http://172.17.0.1:${AFTER_SPRING_PORT};\nset \$react_url http://172.17.0.1:${AFTER_REACT_PORT};\nset \$fastapi_url http://172.17.0.1:${AFTER_FASTAPI_PORT};' | tee /etc/nginx/conf.d/service-url.inc && nginx -s reload"

    echo "Completed Deploy!"
    echo "$BEFORE_COLOR server down(spring_port:${BEFORE_SPRING_PORT}, react_port:${BEFORE_REACT_PORT}, fastapi_port:${BEFORE_FASTAPI_PORT})"
    docker compose -p deploy-${BEFORE_COLOR} -f docker-compose.${BEFORE_COLOR}.yaml down
fi

EXIST_NONE_IMAGES=$(docker images -f "dangling=true" -q)

if [ -n ${EXIST_NONE_IMAGE} ]; then
    docker rmi ${EXIST_NONE_IMAGES}
fi

```

```bash
vi docker-compose.blue.yaml

version: '3'

services:
    spring:
        container_name: spring-blue
        image: newstar_back
        ports:
          - 8080:8080
        restart: always
        env_file:
          - /env/.env
        environment:
          TZ: Asia/Seoul
    react:
        container_name: react-blue
        image: newstar_front
        ports:
          - 3000:3000
    fastapi:
        container_name: fastapi-blue
        image: fastapi_back
        ports:
          - 8000:8000
        restart: always
        environment:
          TZ: Asia/Seoul
networks:
  default:
    name: app-net
    external: true
```

```bash
vi docker-compose.green.yaml

version: '3'

services:
    spring:
        container_name: spring-green
        image: newstar_back
        ports:
          - 8081:8080
        restart: always
        env_file:
          - /env/.env
        environment:
          TZ: Asia/Seoul

    react:
        container_name: react-green
        image: newstar_front
        ports:
          - 3001:3000
    fastapi:
        container_name: fastapi-green
        image: fastapi_back
        ports:
          - 8001:8000
        restart: always
        environment:
          TZ: Asia/Seoul
networks:
  default:
    name: app-net
    external: true
```
