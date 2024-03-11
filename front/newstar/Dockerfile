FROM node:alpine AS builder

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

RUN rm -rf /etc/nginx/conf.d/*

COPY ./default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;"]

