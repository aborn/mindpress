#!/usr/bin/env bash

# 构建后端服务的docker镜像, FROM openjdk:17-oracle
docker build -t mindpress_h5:v1 .

# 启动容器，dist文件包放在宿主机的 /Users/aborn/docker/h5/mindpress 目录下
# cp -r dist/ ~/docker/h5/mindpress/
docker run --name mindpress_h5 -it -v /Users/aborn/docker/h5/mindpress:/usr/share/nginx/html -d -p 7001:7001 --net=mindpress_net mindpress_h5:v1
