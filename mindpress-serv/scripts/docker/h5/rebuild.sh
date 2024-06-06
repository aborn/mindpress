#!/usr/bin/env bash
########################################
# front-end rebuild package and boot it!
# /Users/aborn/github/mindpress/docker/h5/scripts/rebuild.sh
#########################################

DIR="$( cd "$( dirname "$0" )" && pwd )"

cd $DIR
cd ../../../../mindpress-fe
git pull

# building ，如果出现 /bin/sh: vite: command not found ，则需要重新yarn install下
yarn build

# copy dist files.
cp -r dist/ $HOME/docker/h5/mindpress/

# restart container, make change active.
docker restart mindpress_h5