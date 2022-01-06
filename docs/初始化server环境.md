# node

```bash
yum install  https://rpm.nodesource.com/pub_14.x/el/7/x86_64/nodejs-14.4.0-1nodesource.x86_64.rpm  https://rpm.nodesource.com/pub_14.x/el/7/x86_64/nodejs-devel-14.4.0-1nodesource.x86_64.rpm
```

> 其他源： https://devops.snqu.com/tools/nodejs-14.4.0-1nodesource.x86_64.rpm

# git

```bash
yum  install  http://devops.snqu.com/tools/git-2.8.4/git-2.8.4-1.ep7.x86_64.rpm  http://devops.snqu.com/tools/git-2.8.4/git-core-2.8.4-1.ep7.x86_64.rpm http://devops.snqu.com/tools/git-2.8.4/git-core-doc-2.8.4-1.ep7.x86_64.rpm http://devops.snqu.com/tools/git-2.8.4/perl-Git-2.8.4-1.ep7.noarch.rpm
```

# pm2

```bash
npm install pm2 -g
```

# yarn

```bash
npm install yarn -g
```

# 生成 deploy key

```bash
ssh-keygen -o -t rsa -b 4096 -C "lianghg@snqu.com"
```

# 获取 deploy key

```bash
cat ~/.ssh/id_rsa.pub | clipcopy
```
