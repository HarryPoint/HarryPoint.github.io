---
authors: Harry
tags: [daily]
---

通过充分利用RouterOS的强大功能，我们可以探索自定义路由的各种协议，如BGP和OSPF，但这些方法可能在上手时有一些难度。在家庭网络中，使用这些协议会增加维护成本。很长一段时间以来，我一直依赖旁路网关和DHCP模式来满足上网需求。然而，我常常在思考是否有更简单且影响范围更小的上网方式。

最近，我放弃了在旁路网关上使用OpenWrt，而改为使用Ubuntu。相较于OpenWrt这种路由系统，我认为在Linux系统上设置旁路网关具有更高的自主性（尽管OpenWrt也是基于Linux）。因此，我开始考虑**更为简单的上网方式**，这个想法在我的心中涌现，也就有了下面这篇文章。

<!-- truncate -->

该篇文章需要使用Fake IP模式，如果不知道这个是什么，那就可以关闭了；

## 1. RouterOS 配置

1. 新增table，该配置在 Routing -> Tables 下：

   ![](https://static.zhelin.me/ghost/content/images/2023/10/a2ad25a7ca77c35a.png)

2. 新增 Fake IP 列表，在 IP -> Firewall 下：

   ![](https://static.zhelin.me/ghost/content/images/2023/10/fec54b63ee03ec3b.png)

3. 给命中 ake IP 流量打标记：

   ![](https://static.zhelin.me/ghost/content/images/2023/10/9b63ede9b35d8a80.png)

   ![](https://static.zhelin.me/ghost/content/images/2023/10/e83aca33917be920.png)

4. 新增路由

   ![](https://static.zhelin.me/ghost/content/images/2023/10/b29f492c85adea56.png)

5. 修改 ROS 默认防火墙\
   打开 IP > Firewall > Filter Rules\
   找到 `action=drop chain=forward comment=“drop invalid” connection-state=invalid` 这一条，将 General 下的 `In. Interface List` 改为 `!LAN` 防止防火墙将加密过后的流量标记为 invalid 而造成 TCP 流量握手缓慢

6. 修改 Fasttrack 相关\
   打开IP > Firewall > Filter Rules\
   打开 `fasttrack connection` , 将 General 下的 `In. Interface List` 改为 PPPoE 端口名称防止 Fasttrack 与 Mangle 冲突

## 2. Ubuntu 开启IP伪装

在设置之前，我们需要知道为什么要开启 IP 伪装？因为不开启 IP 伪装，客户端发送出的数据包从RouterOS 转发到 OpenWrt 之后，将具有和客户端相同的源地址和目的地址，这样的数据包将不会被转发到网络的其他网段，而进入了 RouterOS OpenWrt 的循环（从 tracert 跟踪来看）。

如何开启？Ubuntu 系统中要开启 IP 伪装（IP Masquerade）其他 Linux 系统都大同小异：

1. 确保 `iptables` 已安装：`iptables` 是Linux中用于配置防火墙规则和NAT规则的工具，通常已经预安装在大多数Linux系统中。如果你的系统上没有安装，可以使用以下命令安装它：

   ```shell
   sudo apt update
   sudo apt install iptables
   ```

2. 开启IP伪装：使用以下命令来开启IP伪装，将内部网络的数据包伪装成公共IP地址的数据包：

   ```shell
   sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
   ```

   请注意，上述命令中的eth0应该替换为你的外部网络接口的名称。你可以使用以下命令查看系统中的网络接口名称：`ifconfig` 找到外部网络接口的名称，通常为 `eth0` 、 `eth1` 或 `ensX` 等。

3. 启用IPv4转发：确保IPv4转发已启用，以允许数据包在内部网络和外部网络之间流动。编辑/etc/sysctl.conf文件，查找以下行并确保它的值为1。**大部分情况下，科学上网工具已经帮你处理了这一步**：

   ```shell
   net.ipv4.ip_forward=1
   ```

4. 持久性设置：为了使上述设置在系统重新启动后仍然生效，你可以将iptables规则和IPv4转发设置添加到启动脚本中。具体的操作可以根据你的 Ubuntu 版本和使用的启动管理工具而异。如果你使用 systemd，可以创建一个 `iptables.service` 文件，然后启用它。

   创建 `iptables.service` 文件：

   ```shell
   sudo vi /etc/systemd/system/iptables.service
   ```

   在文件中添加以下内容：

   ```shell
   [Unit]
   Description=Enable IP masquerade

   [Service]
   Type=oneshot
   ExecStart=/sbin/iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE

   [Install]
   WantedBy=multi-user.target
   ```

   保存文件并退出编辑器。然后启用服务：

   ```shell
   sudo systemctl enable iptables && sudo systemctl start iptables
   ```

## 3. 参考资料

1. [MikroTik RouterOS 分流策略 - 根据IP地址段进行不同的路由](https://www.simaek.com/archives/299/?ref=zhelin.me)