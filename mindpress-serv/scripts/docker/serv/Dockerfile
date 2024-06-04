FROM openjdk:17-jdk-slim
EXPOSE 3012

ENTRYPOINT ["java","-Dspring.datasource.url=jdbc:mysql://mindpress_db:3306/codepulse?useSSL=false&useUnicode=true&characterEncoding=utf-8","-jar","/app/mindpress-serv-0.0.1-SNAPSHOT.jar"]

# install ping command
RUN apt-get update -y && apt-get install -y iputils-ping
CMD bash
