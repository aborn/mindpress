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
yarn docker:build:scm

# copy nuxt build files;
ROOT_PATH=`$HOME/docker/mindpress/scm`
if [ ! -d "$ROOT_PATH" ];then
    mkdir -p $ROOT_PATH
else
    echo "$ROOT_PATH, no need to create it!"
fi

# delete origin file
if [ ! -d $ROOT_PATH/.output ];then
    echo "dir not exists!"
else
    rm -rf $ROOT_PATH/.output
fi

# copy files
cp -r .output $ROOT_PATH
cp *.json $ROOT_PATH

# restart container, make change active.
CONTAINER="mindpress-scm"

if [ "$(docker ps -a | grep -c $CONTAINER)" -gt 0 ]; then
  echo "[---- Container with name: $CONTAINER  exist, now restart it! ]"
  docker restart $CONTAINER
else
  echo "[---- Container with name: $CONTAINER  doesn't exist. ]"
fi