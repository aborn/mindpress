#!/usr/bin/env bash
########################################
# 后端代码更新后重新运行下该脚本
# /Users/aborn/github/CodePulse/codepulse-serv/scripts/rebuild.sh
#########################################

DIR="$( cd "$( dirname "$0" )" && pwd )"

cd $DIR
cd ../../../../codepulse-vue
git pull

# 打jar包，如果出现 /bin/sh: vite: command not found ，则需要重新yarn install下
yarn build

# 将文件copy到指定目录
cp -r dist/ /Users/aborn/docker/h5/codepulse/

# 重启动容器，让jar包生效
docker restart codepulse_h5