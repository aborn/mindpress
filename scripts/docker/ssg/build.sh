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

# building
yarn install
yarn generate

# copy dist files.
ROOT_PATH=`$HOME/docker/mindpress/ssg`
if [ ! -d "$ROOT_PATH" ];then
    mkdir -p $ROOT_PATH
else
    echo "$ROOT_PATH, no need to create it!"
fi

cp -r dist/ $ROOT_PATH

# restart container, make change active.
CONTAINER="mindpress-ssg"

if [ "$(docker ps -a | grep -c $CONTAINER)" -gt 0 ]; then
  echo "[---- Container with name: $CONTAINER  exist, now restart it! ]"
  docker restart $CONTAINER
else
  echo "[---- Container with name: $CONTAINER  doesn't exist. ]"
fi