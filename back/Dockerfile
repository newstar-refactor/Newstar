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

