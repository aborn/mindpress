#!/usr/bin/env bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

# build docker image, FROM node:18.14.2
docker build -t mindpress_fcm:v1 .

# boot up container，jar in folder: $HOME/docker/packages
docker run --name mindpress-fcm -it -d \
       -v $HOME/docker/mindpress/fcm:/app \
       -v $HOME/docker/mindpress/fcm/content:/app/content \
       -v $HOME/docker/mindpress/fcm/public:/app/public \
       -p 7010:7010 \
       --net=mindpress_net mindpress_fcm:v1
