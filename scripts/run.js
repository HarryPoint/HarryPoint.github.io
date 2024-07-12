const fs = require("fs").promises;
const path = require("path");
const { exec } = require("child_process");

const targets = [
  "https://zhelin.me/post/55a64d40ffbb030d/",
  "https://zhelin.me/post/e4aba903f3826e7b/",
  "https://zhelin.me/post/7f5bdbb2857e15aa/",
  "https://zhelin.me/post/229fbf9ebf2b57f6/",
  "https://zhelin.me/post/04f593718090cbc8/",
  "https://zhelin.me/post/83154e427cdb8791/",
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
