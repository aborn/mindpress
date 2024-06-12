#!/usr/bin/env bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

# build docker image, FROM openjdk:17-oracle
docker build -t mindpress_scm:v1 .

# boot up container，jar in folder: $HOME/docker/packages
docker run --name mindpress-scm -it -v $HOME/docker/nuxt/mindpress:/app -d -p 3010:3010 --net=mindpress_net mindpress_scm:v1
