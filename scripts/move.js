const fs = require("fs").promises;
const path = require("path");

async function readFilesFromDirectory(directoryPath) {
  try {
    // 读取目录中的所有文件名
    const filesOrg = await fs.readdir(directoryPath);
    const files = filesOrg.filter((file) => file.includes("new"));

    for (const file of files) {
      // 构建完整的文件路径
      const filePath = path.join(directoryPath, file);
      // 读取文件内容
      const content = await fs.readFile(filePath, "utf8");
      // 按换行符分割字符串为数组
      const lines = content.split("\n");
      const title = lines[0].substring(3).replaceAll(/(\s)|\//g, "");
      const time = lines[2].replaceAll("/", "-");
      console.log("title: ", title);
      console.log("time: ", time);
      const { dir, name, base } = path.parse(filePath);
      const newPath = path.join(
        dir.replace("/dist", "/blog"),
        base.replace(new RegExp(`(${name})`), `${time}-${title}`)
      );

      //  删除时间
      lines.splice(2, 3);

      await fs.writeFile(newPath, lines.join("\n"));
      //   console.log(removeFirstNLines(content, 3));
    }
  } catch (error) {
    console.error(`读取文件时发生错误: ${error}`);
  }
}

readFilesFromDirectory(path.join(__dirname, "../dist"));
