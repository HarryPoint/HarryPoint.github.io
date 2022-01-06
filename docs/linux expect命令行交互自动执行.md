### expect 写法 demo

功能描述：运行命令`demo`将自动监听当前项目文件夹下的文件并上传服务器

项目文件目录

```bash
/Users/harry/work/self/expect-demo
├── cli
|  ├── expect.exp
|  └── index.js
├── demo
|  └── test.html
├── package-lock.json
└── package.json

```

> 文件`package.json`

```json
{
  "name": "expect-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "bin": {
    "demo": "./cli/index.js"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "chokidar": "^3.5.2",
    "shelljs": "^0.8.4"
  }
}
```

> 文件 `cli/index.js`

```js
#!/usr/bin/env node

const shell = require("shelljs");
const path = require("path");
const chokidar = require("chokidar");

const to = "root@101.201.38.243:/root/express/public";
const password = "Irayforever123";
const expectPath = path.join(__dirname, "./expect.exp");

const watcher = chokidar.watch(process.cwd());
watcher.on("change", function (filePath) {
  shell.exec(`expect ${expectPath} ${filePath} ${to} ${password}`);
});
```

> 文件`cli/expect.exp`

```bash
#!/usr/bin/expect

set from [lindex $argv 0]
set to [lindex $argv 1]
set password [lindex $argv 2]
set timeout 30 # 必须延时
spawn bash -c "scp $from $to"
expect {
    "*password:" { send "$password\r" }
}
interact
```

运行方式

```bash
demo
```

然后改动文件，文件将自动上传到服务器
