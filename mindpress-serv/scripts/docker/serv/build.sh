#!/usr/bin/env bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

# build docker image, FROM openjdk:17-oracle
docker build -t mindpress_serv:v1 .

# boot up container，jar in folder: $HOME/docker/packages
docker run --name mindpress-serv -it -v $HOME/docker/packages:/app -d -p 3014:3012 --net=mindpress_net mindpress_serv:v1
