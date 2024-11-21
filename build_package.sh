#!/bin/bash

# 设置压缩包名称，可以根据需要修改
PACKAGE_NAME="project_build_$(date +%Y%m%d%H%M%S).tar.gz"

# 设置要打包的文件和文件夹
FILES_TO_PACKAGE="build package.json package-lock.json server.js .npmrc"

# 检查是否有要打包的文件夹或文件
if [ ! -d "build" ] && [ ! -f "package.json" ] && [ ! -f "package-lock.json" ] && [ ! -f "server.js"] && [! -f ".npmrc"]; then
  echo "没有找到要打包的文件或文件夹！"
  exit 1
fi

# 打包文件和文件夹为 tar.gz 格式
echo "正在打包文件到 $PACKAGE_NAME ..."
tar -czvf $PACKAGE_NAME $FILES_TO_PACKAGE

# 检查打包是否成功
if [ $? -eq 0 ]; then
  echo "打包成功：$PACKAGE_NAME"
else
  echo "打包失败！"
  exit 1
fi
