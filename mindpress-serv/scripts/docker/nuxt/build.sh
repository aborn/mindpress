#!/usr/bin/env bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

# build docker image, FROM openjdk:17-oracle
docker build -t mindpress_nuxt:v1 .

# boot up container，jar in folder: $HOME/docker/packages
docker run --name mindpress_nuxt -it -v $HOME/docker/nuxt/mindpress:/app -d -p 3010:3010 --net=mindpress_net mindpress_nuxt:v1
