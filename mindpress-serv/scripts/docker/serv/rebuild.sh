#!/usr/bin/env bash
########################################
# 后端代码更新后重新运行下该脚本
# /Users/aborn/github/mindpress/mindpress-serv/scripts/docker/serv/rebuild.sh
#########################################

DIR="$( cd "$( dirname "$0" )" && pwd )"
echo "running path=${DIR}"
cd $DIR
$DIR/package.sh

# reboot container，make change jar active
CONTAINER="mindpress-serv"

if [ "$(docker ps -a | grep -c $CONTAINER)" -gt 0 ]; then
  echo "[---- Container with name: $CONTAINER  exist, now restart it! ]"
  docker restart $CONTAINER
else
  echo "[---- Container with name: $CONTAINER  doesn't exist. ]"
fi
