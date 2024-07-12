## Docker管理工具Portainer重置密码


<!--kg-card-begin: markdown-->

使用Portainer忘记密码快速解决方案：

1、进入服务器后台

2、下载镜像：`portainer/helper-reset-password`

```shell
sudo docker pull portainer/helper-reset-password
```

3、停止portainer

```shell
sudo docker stop portainer
```

4、重置密码\
portainer\_data 是你创建的Portainer卷

```shell
sudo docker run --rm -v portainer_data:/data portainer/helper-reset-password
```

执行后输出：

```shell
{"level":"info","filename":"portainer.db","time":"2023-09-12T16:09:58Z","message":"loading PortainerDB"}
2023/09/12 16:09:58 Password successfully updated for user: 账号名
2023/09/12 16:09:58 Use the following password to login: 密码
zhelin@VM-16-15-ubuntu:~$ sudo docker start portainer
```

5、重启服务

```shell
sudo docker start portainer
```

至此重置密码完成
