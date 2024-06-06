#!/usr/bin/env bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

# 构建数据库的docker镜像 （含有初始化数据）
docker build -t mindpress_db:v1 .

# 创建一个网络
docker network create mindpress_net

# 创建数据库容器
docker run -itd --name mindpress_db -p 3308:3306  --net=mindpress_net mindpress_db:v1
