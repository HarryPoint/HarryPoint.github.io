- 安装 weinre

```shell
npm install -g weinre
```

<!-- more -->

- 启动服务

```shell
weinre --httpPort 8080 --boundHost -all-
```

> 指定端口号，当服务启动成功之后，根据提示，在浏览器中打开相应地址：

- 浏览器查看
  浏览器输入电脑的 ip 地址和端口
  **这里有三个链接需要注意的地方**
  1. 第一个链接将启动 weinre 客户端页面，也就是调试器本身。点击此链接将带您进入远程控制面板。
  2. 第二个链接就是文档的连接。
  3. 第三个链接，是一个 js 脚本，是你要在需要调试的页面引入的一段 js 脚本
