---
tags: [docker]
---

## Dockerfile

```bash
# 指定node镜像版本
FROM node:8.9-alpine
# 声明作者
MAINTAINER harry
# 移动当前目录下面的文件到镜像内app目录下
ADD . /app/
# 进入到app目录，类似 cd
WORKDIR /app
# 安装依赖
RUN npm install
# 对外暴露端口
EXPOSE 3000
# 程序启动脚本
CMD ["npm", "start"]
```

## 构建镜像

> 注意： 最后的`.`不能省略，含义为 Dockerfile 所在的目录

```bash
docker build -t docker_demo .
```

## 查看镜像

```bash
docker images
```

## 启动镜像

> 多次执行的 run, 参数一样会覆盖，不同会创建多个容器

```bash
# -d 表示后台执行， -p 指定本地的9000端口映射到容器内的3000端口
docker run  -d -p 9000:3000 docker_demo
```

## 查看容器

```bash
docker ps
```
