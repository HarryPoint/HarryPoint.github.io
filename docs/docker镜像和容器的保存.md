---
tags: [docker]
---

- 镜像的保存

```bash
docker save b91d9ad83efa > xxx.tar
```

- 镜像的导入

```bash
docker load < xxx.tar
```

- 容器的导出

```bash
docker export b91d9ad83efa > xxx.tar
```

- 容器的导入

```bash
docker import xxx.tar
```

# 总结一下

1. docker save 保存的是镜像（image），docker export 保存的是容器（container）；
2. docker load 用来载入镜像包,必须是一个分层文件系统，必须是是 save 的包；docker import 用来载入容器包，但两者都会恢复为镜像；
3. docker load 不能对载入的镜像重命名，而 docker import 可以为镜像指定新名称。
4. docker export 的包会比 save 的包要小，原因是 save 的是一个分层的文件系统，export 导出的只是一个 linux 系统的文件目录
