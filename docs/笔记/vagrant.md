### vagrant + virtualBox

1. 初始化 centos7 虚拟机

```bash
# 初始化 Vagrantfile
vagrant init centos/7
# 创建并启动 虚拟机
vagrant up
# 进入虚拟机
vagrant ssh
# 退出虚拟机
exit
```

vagrant 命令

```bash
# 查看当前虚拟机状态
vagrant status
# 停止当前虚拟机
vagrant halt
# 删除当前虚拟机
vagrant destroy
```
