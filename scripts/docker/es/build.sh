#!/usr/bin/env bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

# copy nuxt build files;
if [ ! -d "$HOME/docker/es" ];then
    mkdir -p $HOME/docker/es/config
    mkdir -p $HOME/docker/es/data
    mkdir -p $HOME/docker/es/logs
    mkdir -p $HOME/docker/es/plugins
else
    echo "$HOME/docker/es exists, no need to create it!"
fi

cp ./elasticsearch.yml $HOME/docker/es/config/
cp -r ./ik $HOME/docker/es/plugins

docker run -d \
  --name mindpress-es \
  -p 9200:9200 -p 9300:9300 \
  -e "discovery.type=single-node" \
  -e ES_JAVA_OPTS="-Xms512m -Xmx512m" \
  -v $HOME/docker/es/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml \
  -v $HOME/docker/es/data:/usr/share/elasticsearch/data \
  -v $HOME/docker/es/logs:/usr/share/elasticsearch/logs \
  -v $HOME/docker/es/plugins:/usr/share/elasticsearch/plugins \
  --net mindpress_net \
  elasticsearch:7.17.21
