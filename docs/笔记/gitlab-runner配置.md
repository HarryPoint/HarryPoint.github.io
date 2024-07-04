---
tags: [git, 部署]
---

### 安装, 参见文档[https://docs.gitlab.com/runner/install/](https://docs.gitlab.com/runner/install/)

### 删除没有使用的`runner`, 自动更新`config.toml`文件

```bash
gitlab-runner verify --delete
```
