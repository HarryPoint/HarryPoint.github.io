---
tags: [Centos, Centos7, Linux]
---

### 建议安装包

```bash
yum install [package name]
```

| 包名              | 说明     |
| ----------------- | -------- |
| `bash-completion` | 命令补全 |
|                   |          |
|                   |          |

### 常用命令

| 命令                                                         | 含义                                |
| ------------------------------------------------------------ | ----------------------------------- |
| `ss -ltpn`                                                   | 查看当前提供服务的端口              |
| `df -h`                                                      | 查看当前系统磁盘情况                |
| `fdisk /dev/vdb`                                             | 对磁盘进行分区                      |
| `mkfs.xfs /dev/vdb1`                                         | 对分区进行格式化（为 xfs 文件系统） |
| `mount /dev/vdb1 /logs`                                      | 将logs目录挂载到 分区上             |
| `ip r` / `ip route`                                          | 查看路由表                          |
| `ip route add 192.168.1.0/24 via 192.168.1.253 dev eth0`     | 添加路由                            |
| `ip route del 192.168.1.0/24 dev eth0`                       | 删除路由                            |
| `ip tunnel add tun1 mode gre remote 106.14.169.52 local 172.31.0.187` | 新建`gre`隧道                       |

