#!/usr/bin/env bash
########################################
# front-end rebuild package and boot it!
# /Users/aborn/github/mindpress/docker/h5/scripts/rebuild.sh
#########################################

DIR="$( cd "$( dirname "$0" )" && pwd )"
echo "running path=${DIR}"
cd $DIR
cd ../../..
SRC_DIR="`pwd`"

cd $SRC_DIR/mindpress-fe
# git pull

# building ，如果出现 /bin/sh: vite: command not found ，则需要重新yarn install下
yarn docker:build:fcm

# copy nuxt build files;
if [ ! -d "$HOME/docker/mindpress/fcm" ];then
    mkdir -p $HOME/docker/mindpress/fcm
else
    echo "$HOME/docker/mindpress/fcm exists, no need to create it!"
fi

# delete origin file
if [ ! -d $HOME/docker/mindpress/fcm/.output ];then
    echo "dir not exists!"
else
    rm -rf $HOME/docker/mindpress/fcm/.output
fi

# copy files
cp -r .output $HOME/docker/mindpress/fcm
cp *.json $HOME/docker/mindpress/fcm

# restart container, make change active.
CONTAINER="mindpress-fcm"

if [ "$(docker ps -a | grep -c $CONTAINER)" -gt 0 ]; then
  echo "[---- Container with name: $CONTAINER  exist, now restart it! ]"
  docker restart $CONTAINER
else
  echo "[---- Container with name: $CONTAINER  doesn't exist. ]"
fi