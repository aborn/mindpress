#!/usr/bin/env bash
########################################
# 后端代码更新后重新运行下该脚本
# /Users/aborn/github/mindpress/mindpress-serv/scripts/docker/serv/rebuild.sh
#########################################

DIR="$( cd "$( dirname "$0" )" && pwd )"

cd $DIR
cd ../../../
#git pull

# 打jar包
mvn clean
mvn package -DskipTests

# 将jar包copy到指定目录
cp ./target/mindpress-serv-0.0.1-SNAPSHOT.jar /Users/aborn/docker/packages

# 重启动容器，让jar包生效
docker restart mindpress-serv
