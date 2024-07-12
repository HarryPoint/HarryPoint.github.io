const fs = require("fs").promises;
const path = require("path");
const { exec } = require("child_process");

const targets = [
  "https://zhelin.me/post/95a5cf572e791ece69251f3ca5d2e476/",
  "https://zhelin.me/post/ead7d9b97b09e2961e9a97419bfc3a05/",
  "https://zhelin.me/post/514d343a2be74cd510d0545c213c3c4f/",
  "https://zhelin.me/post/0a0ff2a45356825055f9b3a188cf0793/",
  "https://zhelin.me/post/25cc9399f88407315b29181fb35fe599/",
  "https://zhelin.me/post/454192a316a0ba1f57202a18ae9f37f6/",
  "https://zhelin.me/post/5d2a4c9c662e5e82dc12cefc745549d2/",
];

targets.forEach((target) => {
  exec(`html-to-markdown ${target}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行的错误: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
});

function removeFirstNLines(str, n, reverse = false) {
  // 按换行符分割字符串为数组
  const lines = str.split("\n");
  // 跳过前n行并重新组合剩余部分
  return reverse
    ? lines.slice(0, lines.length - n).join("\n")
    : lines.slice(n).join("\n");
}

async function readFilesFromDirectory(directoryPath) {
  try {
    // 读取目录中的所有文件名
    const filesOrg = await fs.readdir(directoryPath);
    const files = filesOrg.filter((file) => !file.includes("new"));

    for (const file of files) {
      // 构建完整的文件路径
      const filePath = path.join(directoryPath, file);
      // 读取文件内容
      const content = await fs.readFile(filePath, "utf8");
      const { dir, name, base } = path.parse(filePath);
      const newPath = path.join(
        dir,
        base.replace(new RegExp(`(${name})`), "$1-new")
      );

      await fs.writeFile(
        newPath,
        removeFirstNLines(removeFirstNLines(content, 11), 14, true)
      );
      console.log(removeFirstNLines(content, 3));
    }
  } catch (error) {
    console.error(`读取文件时发生错误: ${error}`);
  }
}

// 调用函数，替换'./your-directory'为你的目录路径
setTimeout(() => {
  readFilesFromDirectory(path.join(__dirname, "../dist"));
}, 1000);
