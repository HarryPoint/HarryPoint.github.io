## 基础命令（基于 ubuntu）

```bash
fdisk -l # 查看挂载的硬盘
df -h # 查看硬盘使用情况
```

## linux 账户操作

### 1.添加用户名

```bash
adduser {username}
```

### 2.给账户 sudo 权限

```bash
gpasswd -a {username} sudo
```

### 3.权限配置修改

```bash
sudo visudo
```

> 1.在 `# User privilege specification` 下添加一行 `{username} ALL=(ALL:ALL) ALL`<br/> 2.`^+X`退出编辑，`Shift+Y`保存，·`enter`回车 回到命令行<br/> 3.`service ssh restart` 重启服务

## `ssh` 免密登录

### 在本地操作

#### 1.生成密钥

```bash
ssh-keygen -t res -b 4096 -C "xxx@xxx.com"
```

#### 2. 开启`ssh-agent`服务

```bash
eval "$(ssh-agent -s)"
```

#### 3. 添加密钥

```bash
ssh-add ~/.ssh/id_rsa
```

### 服务器端操作

#### 1. 和本地操作一致，生成密钥，开启`ssh-agent`服务

#### 2. 生成`authorized_keys`文件

```bash
vi ~/.ssh/authorized_keys
```

#### 3. 将本地 `id_rsa.pub` 里面的内容 复制到服务端的 `authorized_keys`文件中

#### 4. 改变`authorized_keys`文件权限

```bash
chmod 600 ~/.ssh/authorized_keys
```

#### 5. 重启 ssh 服务

```bash
sudo service ssh restart
```

## 修改 ssh 默认端口

> tips: 修改前 先新开命令行窗口，登录到服务器（防止修改出问题，导致登录不上服务器）<br/>

```bash
sudo vi /etc/ssh/sshd_config
```

1. 修改 `Port` 参数，修改为新的端口

> 注意：`1~1024`端口为系统备用，且需要 root 权限才能启动，所以选择 `1025~65536`之间的端口

2. `UseDNS`确保为`no`，文件最后添加一行`AllowUsers {username}`
3. 保存退出
4. 重启 ssh 服务`sudo service ssh restart`
5. 重新登录服务器`ssh -p {port} {username}@{server ip}`

## 关闭 root 用户 ssh 登录

1. 打开 ssh 配置文件`sudo vi /etc/ssh/sshd_config`
2. 修改`PermitRootLogin`为`no`
3. 退出编辑并保存
4. 重启 ssh 服务`sudo service ssh restart`

## 开启 iptables

1. 清空配置`sudo iptables -F`
2. 编辑配置文件`sudo vi /etc/iptables.up.rules`

```txt
*filter

# 允许连接
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# 允许出口流量
-A OUTPUT -j ACCEPT
# 允许443端口访问（https）
-A INPUT -p tcp --dport 443 -j ACCEPT
# 允许80端口访问（http）
-A INPUT -p tcp --dport 80 -j ACCEPT

# 允许39999 ssh登录
-A INPUT -p tcp -m state --state NEW --dport 39999 -j ACCEPT
# 允许ping服务器
-A INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT
# 允许mongoDB
-A INPUT -s 127.0.0.1 -p tcp --destination-port 27017 -m state --state NEW,ESTABLISHED -j ACCEPT
-A OUTPUT -d 127.0.0.1 -p tcp --source-port 27017 -m state --state ESTABLISHED -j ACCEPT
# 记录被拒绝登录的信息
-A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied:" --log-level 7
# 拦截敏感请求（60秒内发出150个请求）
-A INPUT -p tcp --dport 80 -i eth0 -m state --state NEW -m recent --set
-A INPUT -p tcp --dport 80 -i eth0 -m state --state NEW -m recent --update --seconds 60 --hitcount 150 -j DROP
# 拒绝其他请求
-A INPUT -j REJECT
-A FORWARD -j REJECT

COMMIT
```

3. 启用配置文件`sudo iptables-restore < /etc/iptables.up.rules`
4. 查看防火墙状态`sudo ufw status`,如果显示 `inactive`则为未激活
5. 激活防火墙`sudo ufw enable`
6. 开启重启自动激活功能`sudo vi /etc/network/if-up.d/iptables`, 写入内容

```bash
#!/bin/sh
iptables-restore /etc/iptables.up.rules
```

7. 写入执行权限`sudo chmod +x /etc/network/if-up.d/iptables`

## 生产环境搭建

1.基础包安装

```bash
sudo apt-get install vim openssl build-essential libssl-dev wget curl git
```

2.安装 nvm 3.安装 nodejs

```bash
nvm install v6.9.5
nvm use v6.9.5
nvm alias default v6.9.5 # 设为默认
node -v
```

4.设置系统文件监控数量`echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`

5.配置 nginx

> /etc/nginx/conf.d/xxx.conf

```txt
upstream demo {
    server 127.0.0.1:8081;
}
server {
    listen 80;
    server_name xxx.xxx.xx(ip地址);

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Nginx-Proxy true;

        proxy_pass http://demo;
        proxy_redirect off;
    }

    # 静态文件配置
    location ~* ^.+\.(jpg|jpeg|gif|png|ico|css|js|pdf|txt) {
        root /www/demo/current/public;
    }
}
```

> tips: 隐藏 nginx 版本信息`sudo /etc/nginx/nginx.conf`将 `# server_tokens off;`的注释取消掉

## mongoDB 使用

1. 开启服务 `sudo service mongod start`
2. 查看日志 `cat /var/log/mongodb/mongod.log`
3. 修改 iptables 配置

```txt
# 允许mongoDB
-A INPUT -s 127.0.0.1 -p tcp --destination-port 27017 -m state --state NEW,ESTABLISHED -j ACCEPT
-A OUTPUT -d 127.0.0.1 -p tcp --source-port 27017 -m state --state ESTABLISHED -j ACCEPT
```

4. 启用配置文件`sudo iptables-restore < /etc/iptables.up.rules`
5. 连接 mongoDB 实例`mongo`
6. mongoDB 服务命令：
   (1).开启服务`sudo service mongod start`
   (2).停止服务`sudo service mongod stop`
   (3).重启服务`sudo service mongod restart`
7. 更改 mongoDB 端口`sudo vi /etc/mongod.conf`修改`port`参数，重启服务。修改 iptables 配置，重新载入配置。连接 mongoDB `mongo --port {端口}`
8. 备份本地 mongoDB 数据`mongodump -h 127.0.0.1:27017 -d {数据库名称} -o {文件夹名称}`
9. 压缩备份文件`tar zcvf {filename}.tar.gz {file-roder-name}`
10. scp 上传
11. 服务器端解压缩`tar xvf {filename}.tar.gz`
12. 导入数据`mongorestore --host 127.0.0.1:27017 -d {数据库名} {数据路径}`
13. 本地导出单表数据`mongoexport -d {数据库名} -c {表名称} -o {存放路径： ./xx.json}`
14. 导入单表数据`mongoimport --host 127.0.0.1:27017 -d {数据库名} -c {表名称} {数据路径}`
15. 删除数据库`mongo --host 127.0.0.1:27017 {数据库名} --eval "db.dropDatabase()"`

## mongoDB 权限设置

1. 账户设置

```bash
mongo # 进入mongoDB实例
use admin # 切换到`admin`数据库
db.createUser({user: 'demo', pwd: 'xxx1234', roles: [{role: 'userAdminAnyDatabase', db: 'admin'}]}) # 创建管理员账户
db.auth('demo', 'xxx1234') # 登录授权（返回1 则授权成功）
use {数据库名称} # 切换数据库
db.createUser({user: 'username1', pwd: 'xxx222', roles: [{role: 'readWrite', db: '数据库名称']}) # 创建读写权限账户
db.createUser({user: 'username2', pwd: 'xxx222', roles: [{role: 'read', db: '数据库名称']}) # 创建读权限用户（用于数据备份）
```

2. 开启认证模式

```bash
sudo vi /etc/mongod.conf
```

开启 `security`:

```text
security:
  authorization: 'enabled'
```

重启服务

```bash
sudo service mongod restart
```

进入数据库

```bash
mongo 127.0.0.1:27017/{数据库名称} -u {用户名} -p {密码}
show tables
db.user.find({})
```

## mongoDB 数据备份

1. 新建备份脚本

```sh
#!/bin/sh

backUpFolder = /home/backUp/db
date_now = `date +%Y_%m_%d_%H%M`
backFileName = app_$date_now

cd $backUpFolder
mkdir -p $backFileName

mongodump -h 127.0.0.1:27017 -d {数据库名称} -u {账户名称} -p {密码} -o $backFileName

tar zcvf $backFileName.tar.gz $backFileName

rm -rf $backFileName
```

2.利用`crontab`开启自动备份

```bash
crontab -e
```

编辑内容

```txt
13 00 * * * sh {脚本路径}
```

## ssl 证书

1. 免费证书

   > [又拍云](https://www.upyun.com/products/ssl)<br/>
   > [七牛云](https://www.qiniu.com/)<br/>
   > [腾讯云](https://cloud.tencent.com/)

2. nginx 重定向配置

```txt
server {
    listen 80;
    server_name xxxx.com;
    # rewrite ^(.*) https://$host$1 permanent;
    return 301 https://xxxx.com$request_uri;
}
```

> [安装教程](https://cloud.tencent.com/document/product/400/47360)
