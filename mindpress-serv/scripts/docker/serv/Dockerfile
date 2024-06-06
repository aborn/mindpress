FROM openjdk:17-jdk-slim

ENTRYPOINT ["java","-Dspring.datasource.druid.url=jdbc:mysql://mindpress_db:3306/mindpress?useSSL=false&useUnicode=true&characterEncoding=utf-8","-jar","/app/mindpress-serv-0.0.1-SNAPSHOT.jar"]

# install ping command
RUN apt-get update -y && apt-get install -y iputils-ping && apt-get -y install curl
CMD bash
