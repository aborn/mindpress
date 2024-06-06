#!/usr/bin/env bash

# build docker image, FROM openjdk:17-oracle
docker build -t mindpress_h5:v1 .

# 启动容器，dist文件包放在宿主机的 $HOME/docker/h5/mindpress 目录下
# cp -r dist/ $HOME/docker/h5/mindpress/
docker run --name mindpress_h5 -it -v $HOME/docker/h5/mindpress:/usr/share/nginx/html -d -p 7001:7001 --net=mindpress_net mindpress_h5:v1
