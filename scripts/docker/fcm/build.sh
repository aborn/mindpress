#!/usr/bin/env bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

# build docker image, FROM openjdk:17-oracle
docker build -t mindpress_fcm:v1 .

# boot up container，jar in folder: $HOME/docker/packages
docker run --name mindpress-fcm -it -v $HOME/docker/mindpress/fcm:/app -v $HOME/docker/mindpress/fcm/content:/app/content -d -p 7010:7010 --net=mindpress_net mindpress_fcm:v1
