#!/usr/bin/env bash

# 构建后端服务的docker镜像, FROM openjdk:17-oracle
docker build -t mindpress_serv:v1 .

# 启动容器，jar包放在宿主机的 /Users/aborn/docker/packages 目录下
docker run --name mindpress-serv -it -v /Users/aborn/docker/packages:/packages -d -p 3012:3012 --net=mindpress_net mindpress_serv:v1

