### 安装必要的系统工具

```bash
yun install -y yum-utils device-mapper-persistent-data lvm2
```

### 添加软件资源

```bash
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-re.repo
```

### 更新`yum`缓存

```bash
yum makecache fast
```

### 安装`docker`

```bash
yum -y install docker-ce
```

### 配置国内镜像源

```bash
curl -sSL http://oyhlcogl9.bkt.clouddn.com/setmirror.sh | sh -s <镜像加速地址>
# 例如：
curl -sSL http://oyhlcogl9.bkt.clouddn.com/setmirror.sh | sh-s http://dockerhub.azk8s.cn
# Azure
# https://github.com/Azure/container-service-for-azure-china/blob/master/aks/README. md#22-container-registry-proxy
```

### 启动`docker`

```bash
systemctl start docker
```

### 运行`docker`命令

```bash
docker ps
docker version
```

### 安装`docker compose`

```bash
curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname-s)-s(uname -m)" -o /usr/local/bin/docker-compose
```

### 给`docker compose`可执行权限

```bash
chmod -x /usr/local/bin/docker-compose
```
