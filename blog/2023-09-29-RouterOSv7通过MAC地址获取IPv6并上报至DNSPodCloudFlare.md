---
authors: Harry
tags: [daily]
---
在我将家里的主路由改为RouterOS后，始终找不到一个能完美更新内网设备IPv6的脚本，要么是通过EUI64转换的，要么就是端口转发，还有引入第三个设备，用别的语言去做DDNS的更新，这些方案虽然都能实现最终的效果，但无疑是增加了别的成本，而且不够优雅。RouterOS本身就支持的东西，为什么要舍近求远并？这并不是我的风格。

在网络上搜索了一周后，还真发现了有一个相关的脚本，但是整体看着较乱，作者也是在RouterOS v6上写的，所以也不敢运行。最终各种查阅无果后，只有自己动手写这个脚本了。

<!-- truncate -->

那先说这个脚本的需求：\
运行在RouterOS上，自动获取指定内网设备的IPv6地址，具有自动更新、定时检查等功能；

## 1. 开始之前

在开始写之前，我们要知道 RouterOS 脚本使用的是 MikroTik RouterOS 特定的脚本语言，它是一种专为 MikroTik 路由器设备设计的脚本语言。这个脚本语言被用于配置和自动化 MikroTik 路由器上的各种任务和功能。这种脚本语言与一般的编程语言略有不同，具体的语法和功能集是为了满足 MikroTik RouterOS 的特定需求而设计的。所以，在开始之前我们需要了解基本的语法：[Scripting - RouterOS](https://help.mikrotik.com/docs/display/ROS/Scripting?ref=zhelin.me) ，不过幸运的是，这个语法并不难。

## 2. 脚本编写

通过上面的需求，我们首先要获取到内网设备的IPv6地址，才有后续的更新操作

### 2.1 获取Neighbor id

通过查找文档找到了获取所有内网设备的IPv6地址的位置是：IPv6 -> Neighbors目录，那么映射在命令上就是：

```
:local ipAddressList [/ipv6 neighbor find]
```

但这段命令获取的是所有设备的IPv6地址，很明显不符合我们的要求，因为我们是指定内网设备，那指定这个内网设备用什么指定？有网络别名、IPv4地址，但以上两个有可能冲突，也有可能变化，唯一不变的就是MAC地址了，那我们指定MAC地址：

```
# 指定MAC地址
:local targetMac "12:34:56:69:B1:C3"

# 通过MAC地址筛选内网IPv6地址
:local ipAddressList [/ipv6 neighbor find mac-address=$targetMac]
```

以上，我们就可以获取到指定设备的Neighbor Id了，这是个数组，为什么是一个数组？因为设备的IPv6可能是多个。

### 2.2 获取设备IPv6地址

我们已经知道获取Neighbor Id，返回给我们的是一个数组，那么我们具体该上报哪一个IPv6地址，就有些说法了，因为IPv6地址的下发，是根据运营商提供的IPv6前缀，有的时候我们重启路由器，通过老前缀下发的IPv6地址是不会立马消失不见的，这个地址还会存活一段时间，但我们肯定不是上报已经不用的IPv6地址，而是新前缀下发的地址。

同时，路由器一般还会下发一个`fe80`的内网地址（也可能是别的开头），那这就需要我们甄别哪一个地址才是我们需要上报的DNS的。

```
# 获取下发的IPv6地址前缀
:local ipv6Prefix [/ipv6 dhcp-client get [find interface=$wanInterface status=bound] prefix]

# 获取IPv6 并截取前缀
:local cidrNetwork [:pick $ipv6Prefix 0 ([:find $ipv6Prefix "::" -1] + 1)]

# 循环遍历查找对应的ipv6地址
:foreach neighborId in=$ipAddressList do={
    # 获取邻居的IPv6地址和MAC地址
    :local ipv6Address [/ipv6 neighbor get $neighborId address]
    :local ipv6Status [/ipv6 neighbor get $neighborId status]
    

    :local foundPosition [:find $ipv6Address $cidrNetwork]

    :if ($foundPosition >= 0 && $ipv6Status = "reachable") do={
        :set ipv6Report $ipv6Address;
        :log info ("use: " . $ipv6Address)
    } else={
        :log info ("discard: " . $ipv6Address)
    }
}
```

在上面代码中就是解决这个问题，首先去拿拨号接口的地址前缀，在循环设备IPv6地址时进行对比，只有对比成功的地址才会被暂存起来，用于后面的上报。

那么到这里，我们就拿到了后续要上报的设备IPv6地址`$ipv6Address`；

### 2.3 将IPv6上报到DNS服务商

以下是完整脚本代码，这里我用的DNS服务商是DNSPOD，阿里云的可能需要使用者自己去改，至于如何配置脚本及定时任务，网上教程很多，在这里我就不展开细讲了。

```
# 在这里替换成你需要的内网设备的MAC地址
:local targetMac "12:34:56:69:B1:C3"

# 定义自己的需更新的拨号接口
:local wanInterface "pppoe-out1"

# DNSPOD token
:local token "id,token"

# 域名
:local domain "domian.com"

# 二级域名
:local subdomain "sub"


###### 分隔符，以下不需要做任何操作 ######

# 获取下发的IPv6地址前缀
:local ipv6Prefix [/ipv6 dhcp-client get [find interface=$wanInterface status=bound] prefix]

# 获取IPv6 并截取前缀
:local cidrNetwork [:pick $ipv6Prefix 0 ([:find $ipv6Prefix "::" -1] + 1)]

# 存储最终上报的IPv6地址
:local ipv6Report ""

# 查找指定MAC地址的设备
:local ipAddressList [/ipv6 neighbor find mac-address=$targetMac]

# 循环遍历查找对应的ipv6地址
:foreach neighborId in=$ipAddressList do={
    # 获取邻居的IPv6地址和MAC地址
    :local ipv6Address [/ipv6 neighbor get $neighborId address]
    :local ipv6Status [/ipv6 neighbor get $neighborId status]
    

    :local foundPosition [:find $ipv6Address $cidrNetwork]

    :if ($foundPosition >= 0 && $ipv6Status = "reachable") do={
        :set ipv6Report $ipv6Address;
        :log info ("use: " . $ipv6Address)
    } else={
        :log info ("discard: " . $ipv6Address)
    }
}

# 域名拼接
:local dname ($subdomain.".".$domain)

# 获取域名列表
:local record [/tool fetch url="https://dnsapi.cn/Record.List" http-data="login_token=$token&format=json&domain=$domain&sub_domain=$subdomain&record_type=AAAA" as-value output=user]

# 获取域名 id 和 ip
:set record ($record->"data")
:set record [:pick $record [:find $record "\"records\":"] [:len $record]]
:local recordid [:pick $record ([:find $record "\"id\":\""]+6) [:find $record "\",\"ttl"]]
:local recordip [:pick $record ([:find $record "\"value\":\""]+9) [:find $record "\",\"en"]]

# 更新 ip 地址
:if ($recordip!=$ipv6Report && [:len $ipv6Report] > 0) do={
    /tool fetch url="https://dnsapi.cn/Record.Ddns" http-data="login_token=$token&format=json&domain=$domain&sub_domain=$subdomain&record_id=$recordid&record_line_id=0&value=$ipv6Report"
    :log info ("[".$dname. " -> " . $ipv6Report ."] 已更新")
} else={
    :log info ("[".$dname."] 无需更新")
}
```

## 3. 防火墙设置（补充）

在我使用一段时间 RouterOS 后才知道，部分固件是没有防火墙缺省值的，虽然省了事但不够安全，几乎是“皇帝的新装”。在我们完整配置好防火墙后，会发现使用 IPv6 地址在外网无法访问内网的设备，此时我们就要更改防火墙配置，但是这个口子不能够开太大，比如只把家中的 NAS IPv6 暴露出去。

此时我们配置 IPv6 的 Firewall 中的 Address Lists，并添加一个条目：\
![屏幕截图 2023-10-14 135029.png](https://static.zhelin.me/ghost/content/images/2023/10/9b6b8812199532c3.png)

其中 Name 可以自定义，我这里写的是 allow\_ipv6，言简意赅，Address 配置我们分配给我们 NAS 的 IPv6 地址。并修改 Comment 输入一个注释（这个注释后续很重要），而我配置的就是“NAS”。

昨晚这些，我们配置一个 IPv6 Firewall 规则：\
![屏幕截图 2023-10-14 134959.png](https://static.zhelin.me/ghost/content/images/2023/10/320e99a4a3135281.png)

在这里，我们设置了一个 forward 规则，并允许目标地址为 allow\_ipv6 的列表，action 为 accept 即为允许。

此时，已经可以通过外网访问我们的 NAS 了，但是 IPv6 地址是动态的，这个时候就需要动态的去修改我们的 Address Lists ：

```
# 自定义设备的注释
:local commentName "NAS"

# 获取防火墙IPv6地址
:local firewallAddressList [/ipv6 firewall address-list find]


# 需要替换的防火墙列表序号
:local firewallAddressIdx ""

# 循环查找到需要替换的序号
:foreach idxId in=$firewallAddressList do={
    # 获取邻居的IPv6地址和MAC地址
    # :local ipv6Address [/ipv6 firewall address-list get $idxId address]
    :local comment [/ipv6 firewall address-list get $idxId comment]

    :if ($comment = $commentName && [:len $commentName] > 0 && [:len $comment] > 0) do={
        #:set firewallAddressIdx $idxId;
    }
}
```

通过以上步骤就能拿到我们刚刚配置的 allow\_ipv6 中注释为 NAS 的条目序号了，此时我们只需要在更新DDNS时同时更新防火墙地址列表就行。

```
:if ([:len $firewallAddressIdx] > 0) do={
    # 更新防火墙列表
    /ipv6 firewall address-list set numbers=$firewallAddressIdx address=$ipv6Report
    :log info ("Firewall list has been updated: " . $commentName)
}
```

## 4. 新增 CloudFlare 脚本

后面因为想做IPv4的访问，就套了一层 CloudFlare 代理：

```
# 在这里替换成你需要的内网设备的MAC地址
:local targetMac "12:34:56:69:B1:C3"

# 定义自己的需更新的拨号接口
:local wanInterface "pppoe-out1"

# cloudflare token
:local authToken ""
:local zoneId ""

# 域名
:local domain "ex.com"

# 二级域名
:local subdomain "@"

# 自定义设备的注释
:local commentName "NAS"

###### 分隔符，以下不需要做任何操作 ######

# 获取防火墙IPv6地址
:local firewallAddressList [/ipv6 firewall address-list find]

# 获取下发的IPv6地址前缀
:local ipv6Prefix [/ipv6 dhcp-client get [find interface=$wanInterface status=bound] prefix]

# 获取IPv6 并截取前缀
:local cidrNetwork [:pick $ipv6Prefix 0 ([:find $ipv6Prefix "::" -1] + 1)]

# 存储最终上报的IPv6地址
:local ipv6Report ""

# 查找指定MAC地址的设备
:local ipAddressList [/ipv6 neighbor find mac-address=$targetMac]

# 循环遍历查找对应的ipv6地址
:foreach neighborId in=$ipAddressList do={
    # 获取邻居的IPv6地址和MAC地址
    :local ipv6Address [/ipv6 neighbor get $neighborId address]
    :local ipv6Status [/ipv6 neighbor get $neighborId status]
    

    :local foundPosition [:find $ipv6Address $cidrNetwork]

    :if ($foundPosition >= 0 && $ipv6Status = "reachable") do={
        :set ipv6Report $ipv6Address;
        :log info ("use: " . $ipv6Address)
    } else={
        :log info ("discard: " . $ipv6Address)
    }
}


# 需要替换的防火墙列表序号
:local firewallAddressIdx ""

# 循环查找到需要替换的序号
:foreach idxId in=$firewallAddressList do={
    # 获取邻居的IPv6地址和MAC地址
    # :local ipv6Address [/ipv6 firewall address-list get $idxId address]
    :local comment [/ipv6 firewall address-list get $idxId comment]

    :if ($comment = $commentName && [:len $commentName] > 0 && [:len $comment] > 0) do={
        # 获取到序号
        :set firewallAddressIdx $idxId;
    }
}



###### 分隔符，域名上报 ######

# 域名拼接
:local dname $domain
:if ($subdomain != "@") do={
    # 设置域名
    :set dname ($subdomain.".".$domain);
}


#获取域名列表
:local url "https://api.cloudflare.com/client/v4/zones/$zoneId/dns_records?type=AAAA&name=$dname"
:local header "Authorization: Bearer $authToken, content-type: application/json"

:local record [/tool fetch http-header-field=$header url=$url as-value output=user]
:set record ($record->"data")
:set record [:pick $record [:find $record "\"result\":"] [:len $record]]
:local recordid [:pick $record ([:find $record "\"id\":\""]+6) [:find $record "\",\"zone_id"]]
:local recordip [:pick $record ([:find $record "\"content\":\""]+11) [:find $record "\",\"proxiable"]]

:local updateUrl "https://api.cloudflare.com/client/v4/zones/$zoneId/dns_records/$recordid"

#更新ip地址
:if ($recordip!=$ipv6Report && [:len $ipv6Report] > 0) do={
    :local data "{\"type\":\"AAAA\",\"name\":\"$dname\",\"content\":\"$ipv6Report\"}"
  
    /tool fetch mode=https http-method=put http-header-field=$header url=$updateUrl http-data=$data
 
    :log info ("[".$dname. " -> " . $ipv6Report ."] updated")

    :if ([:len $firewallAddressIdx] > 0) do={
        # 更新防火墙列表
        /ipv6 firewall address-list set numbers=$firewallAddressIdx address=$ipv6Report
        :log info ("Firewall list has been updated: " . $commentName)
    }

} else={
    :log info ("[".$dname."] do not update")
}
```

## 5. 参考资料
