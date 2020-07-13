安装包地址：https://git-for-windows.github.io
国内镜像：https://pan.baidu.com/s/1kU5OCOB#list/path=%2Fpub%2Fgit

# 1.配置：

```bash
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```

<!-- more -->

# 2.cmd 命令：

- 创建文件夹

```bash
mkdir learngit
```

- 进入文件夹

```bash
cd learngit
```

- 显示文件夹目录

```bash
dir
```

- 删除指定的空文件夹

```bash
rd
```

- 删除指定文件

```bash
del
```

- 删除文件夹下的所有文件夹

```bash
rd /s
```

# 3.git 命令

- 创建版本库

```bash
git init
```

- 添加到暂存区

```bash
git add readme.txt
```

- 提交到仓库

```bash
git commit -m "wrote a readme file"
```

- 查看状态

```bash
git status
```

- 查看本地文件和版本库中文件的差异

```bash
git diff readme.txt
```

- 查看版本日志

```bash
git log
```

- 查看命令历史

```bash
git reflog
```

- 回退到上一个版本（windows 中^为特殊字符所以要加上“^”,例如 git reset --hard HEAD"^"）git reset --hard HEAD^^^^

```bash
git reset --hard HEAD^
```

- 回退到前 100 个版本

```bash
git reset --hard HEAD~100
```

- 回退到指定版本号

```bash
git reset --hard 3628164
```

- 查看工作区和版本库里面最新版本的区别

```bash
git diff HEAD -- readme.txt
```

- 文件回到最近一次 git commit 或 git add 时的状态

```bash
git checkout -- readme.txt
```

- 把暂存区的修改撤销掉，重新放回工作区

```bash
git reset HEAD readme.txt
```

- 删除版本库中的文件

```bash
git rm readme.txt
```

- 关联一个远程库

```bash
git remote add origin git@server-name:path/repo-name.git
```

- 第一次推送 master 分支的所有内容

```bash
git push -u origin master
```

- 推送最新修改

```bash
git push origin master
```

- 克隆远程仓库

```bash
git clone git@github.com:michaelliao/gitskills.git
```

> Git 支持多种协议，包括 https，但通过 ssh 支持的原生 git 协议速度最快
