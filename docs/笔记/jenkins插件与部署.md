## jenkins 插件

1. webhook 插件 Generic Webhook Trigger Plugin
2. 角色权限插件 Role-based Authorization Strategy

## 前端部署相关插件

| 插件名称             | 描述         |
| -------------------- | ------------ |
| `Docker Pipeline`    | docker 相关  |
| `GitHub Integration` | github 相关  |
| `NodeJs`             | nodejs 相关  |
| `Publish Over SSH`   | ssh 远程登录 |

## jenkins 国内镜像源(清华)

> 设置地址 `[hostname]/pluginManager/advanced`
> [https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/current/update-center.json](https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/current/update-center.json)

## Drone 相关（基于 docker 的 ci/cd）

问题

1. 使用 Drone 如何优化 `npm install cache`?
2. 使用 Prometheus 统计 `npm install/build` 耗时。
3. 使用 Grafana 对 Prometheus 的数据进行可视化。
