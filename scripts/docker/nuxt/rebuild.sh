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
yarn dockerbuild

# copy nuxt build files;
if [ ! -d "$HOME/docker/nuxt/mindpress" ];then
    mkdir -p $HOME/docker/nuxt/mindpress
else
    echo "$HOME/docker/nuxt/mindpress exists, no need to create it!"
fi

# delete origin file
if [ ! -d $HOME/docker/nuxt/mindpress/.output ];then
    echo "dir not exists!"
else
    rm -rf $HOME/docker/nuxt/mindpress/.output
fi

# copy files
cp -r .output $HOME/docker/nuxt/mindpress/
cp *.json $HOME/docker/nuxt/mindpress/

# restart container, make change active.
CONTAINER="mindpress-nuxt"

if [ "$(docker ps -a | grep -c $CONTAINER)" -gt 0 ]; then
  echo "[---- Container with name: $CONTAINER  exist, now restart it! ]"
  docker restart $CONTAINER
else
  echo "[---- Container with name: $CONTAINER  doesn't exist. ]"
fi