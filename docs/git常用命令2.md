<!--[toc]-->

## 推送本地分支到远端

```bash
git push --set-upstream origin feature-harry
```

## 初始化 git

```bash
git init
```

## 将文件从工作区添加到暂存区

```bash
git add <filename>
```

## 将文件从暂存区提交到本地库

```bash
git commit -m "<commit message>" <filename>
```

## 查看当前 git 状态

```bash
git status
```

## 查看 git 提交记录

```bash
git log
```

> 退出`q`
> 如果出现多页记录：下一页 `space` 、 上一页`b`。

```bash
git log --pretty=oneline
```

> 每一个提交记录展示一行

```bash
git log --oneline
```

> 提交记录精简展示

```bash
git reflog
```

> 增加信息：`HEAD@{数字}`，数字的含义为：指针回到对应版本需要的步数

## 回退/前进当前版本

```bash
git reset --hard <hash>
```

> `--hard`: 本地库重置的同时，重置暂存区，重置工作区

```bash
git reset --mixed <hash>
```

> `--mixed`: 本地库重置的同时，重置暂存区，但不重置工作区

```bash
git reset --soft <hash>
```

> `--soft`: 本地库重置，但不重置暂存区，也不重置工作区

```bash
git reset --hard HEAD
```

> 重置当前 工作区、暂存区、本地库到当前 （HEAD）版本处

## 查看文件变更

```bash
git diff <filename>
```

> 比对文件工作区的版本与暂存区版本的差异
> 如不加 filename 参数，则比对所有文件

```bash
git diff <hash> <filename>
```

> 比对本地库对应版本 与 工作区版本的差异（hash 特殊值 HEAD）

## 分支操作

### 查看分支

```bash
git branch -v
```

> 查看所有分支

### 创建分支

```bash
git branch <branch_name>
```

### 切换分支

```bash
git checkout <branch_name>
```

### 合并分支

1. 切换到需要合并到的基础分支
2. 将目标分支的代码合并到基础分支上

```bash
git checkout <base_branch_name>
git merge <target_branch_name>
```

> 如果出现冲突，则修改后通过 `git add <conflict_filename>`, `git commit -m "<fix_message>"`(注意，不要指定文件名), 解决冲突

## 显示所有远程仓库

```bash
git remote -v
```

## 添加远程仓库

```bash
git remote add <alias> <remote_url>
```

## 推送代码到远程库

```bash
git push <alias> <branch_name(本地库对应的分支)>
```

## 拉取远程库代码

```bash
git pull <alias> <branch_name(远程库对应的分支)>
```

> `git pull` 相当于 `git fetch` + `git merge`
> 将远程库对应分支的代码 合并到 当前分支

## fetch

```bash
git fetch <alias> <branch_name(远程库对应的分支)>
```

> 操作后 本地的 `<alias>/<branch_name>` 分支将为最新代码

## merge

```bash
git merge <target_branch_name>
```

> 将目标分支的代码 合并到 当前分支

## 免密设置

1.密钥生成

```bash
ssh-keygen -t rsa -C <mail>
```

## 标签管理

| 命令                                       | 描述                               |
| ------------------------------------------ | ---------------------------------- |
| `git tag <tag_name>`                       | 新建标签                           |
| `git tag -a <tag_name> -m '<tag_message>'` | 添加标签并指定标签信息             |
| `git tag`                                  | 查看所有标签                       |
| `git tag -d <tag_name>`                    | 删除本地标签                       |
| `git push <alias> <tag_name>`              | 推送本地指定标签到指定源           |
| `git push <alias> --tags`                  | 推送所有本地未推送过的标签到指定源 |
| `git push <alias> :refs/tags/<tag_name>`   | 删除指定源的指定标签               |

## rebase

```bash
git rebase -i <commit_hash>
```

| 命令                          | 描述                           |
| ----------------------------- | ------------------------------ |
| `git rebase -i <commit_hash>` | 基于某个 commmit 进行变基 操作 |
| `git rebash <branch_name>`    | 基于某个分支进行变基           |
