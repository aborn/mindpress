#!/usr/bin/env bash
########################################
# 后端代码更新后重新运行下该脚本
# /Users/aborn/github/mindpress/mindpress-serv/scripts/docker/serv/rebuild.sh
#########################################

DIR="$( cd "$( dirname "$0" )" && pwd )"

cd $DIR
cd ../../../

# update to latest code version.
git pull

# use maven to build jar.
mvn clean
mvn package -DskipTests

# copy jar to packages folder.
if [ ! -d "$HOME/docker/packages" ];then
    mkdir $HOME/docker/packages
else
    echo "$HOME/docker/packages exists, no need to create it!"
fi

cp ./target/mindpress-serv-0.0.1-SNAPSHOT.jar $HOME/docker/packages