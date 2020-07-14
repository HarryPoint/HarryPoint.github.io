---
title: js正则表达式
date: 2017-09-11 14:39:47
tags: 
    - js
    - 正则表达式
    - regexp
---
[原文链接](https://juejin.im/post/59b5e50f51882519777c4815)

<!-- more --> 

# 语法

**基本元字符**

表达式 | 含义
-|-
`.` | 匹配除了换行符之外的任何单个字符
`\` | 在非特殊字符之前的反斜杠表示下一个字符是特殊的，不能从字面上解释。例如，没有前\的'b'通常匹配小写'b'，无论它们出现在哪里。如果加了'\',这个字符变成了一个特殊意义的字符，反斜杠也可以将其后的特殊字符，转义为字面量。例如，模式 `/a*/ `代表会匹配 0 个或者多个 a。相反，模式 `/a\*/` 将 \* 的特殊性移除，从而可以匹配像 'a*' 这样的字符串。
<code>&#124;</code> | 逻辑或操作符
`[]` | 定义一个字符集合，匹配字符集合中的一个字符，在字符集合里面像 `.` `,` `\`这些字符都表示其本身
`[^]` | 对上面一个集合取非
`-` | 定义一个区间，例如`[A-Z]`，其首尾字符在 ASCII 字符集里面

**数量元字符**

表达式 | 含义
-|-
`{m,n}`| 匹配前面一个字符至少 m 次至多 n 次重复，还有`{m}`表示匹配 m 次，`{m,}`表示至少 m 次
`+`| 匹配前面一个表达式一次或者多次，相当于 `{1,}`，记忆方式追加(+)，起码得有一次
`*`| 匹配前面一个表达式零次或者多次，相当于 `{0,}`，记忆方式乘法(*)，可以一次都没有
`?`| 单独使用匹配前面一个表达式零次或者一次，相当于 `{0,1}`，记忆方式，有吗？，有(1)或者没有(0)，如果跟在任何量词`*`, `+`, `?`, `{}`后面的时候将会使量词变为非贪婪模式（尽量匹配少的字符），默认是使用贪婪模式。比如对 "123abc" 应用 `/\d+/` 将会返回 "123"，如果使用 `/\d+?/`,那么就只会匹配到 "1"。

**位置元字符**

表达式 | 含义
-|-
`^`| 单独使用匹配表达式的开始
`$`| 匹配表达式的结束
`\b`| 匹配单词边界
`\B`| 匹配非单词边界
`(?=p)` | 匹配 p 前面的位置
`(?!p)` | 匹配不是 p 前面的位置

**特殊元字符**

表达式 | 含义
-|-
`\d`| 表示一位数字，记忆方式 digit
`\D`| 表示一位非数字
`\s`| `[\t\v\n\r\f]`，表示空白符，包括空格，水平制表符（\t），垂直制表符（\v），换行符（\n），回车符（\r），换页符（\f），记忆方式 space character
`\S`| `[^\t\v\n\r\f]`，表示非空白符
`\w`| `[0-9a-zA-Z_]`，表示数字大小写字母和下划线，记忆方式 word
`\W`| `[^0-9a-zA-Z_]`，表示非单词字符

**标志字符**

表达式 | 含义
-|-
`g` | 全局搜索 记忆方式global
`i` | 不区分大小写 记忆方式 ignore
`m` | 多行搜索

# 正则优先级

1. 转义符 \
1. 括号和方括号 (...)、(?:...)、(?=...)、(?!...)、[...]
1. 量词限定符 {m}、{m,n}、{m,}、?、*、+
1. 位置和序列 ^ 、$、 \元字符、 一般字符
1. 管道符（竖杠） |

# 支持正则的 String 方法

方法 | 描述
-|-
`search` | search 接受一个正则作为参数，如果参入的参数不是正则会隐式的使用 new RegExp(obj)将其转换成一个正则，返回匹配到子串的起始位置，匹配不到返回-1
`match` | 接受参数和上面的方法一致。返回值是依赖传入的正则是否包含 g ，如果没有 g 标识，那么 match 方法对 string 做一次匹配，如果没有找到任何匹配的文本时，match 会返回 null ，否则，会返回一个数组，数组第 0 个元素包含匹配到的文本，其余元素放的是正则捕获的文本，数组还包含两个对象，index 表示匹配文本在字符串中的位置，input 表示被解析的原始字符串。如果有 g 标识，则返回一个数组，包含每一次的匹配结果
`replace` | 接受两个参数，第一个是要被替换的文本，可以是正则也可以是字符串，如果是字符串的时候不会被转换成正则，而是作为检索的直接量文本。第二个是替换成的文本，可以是字符串或者函数，字符串可以使用一些特殊的变量来替代前面捕获到的子串($$:插入一个 "$"; $&:插入匹配的子串; $`:插入当前匹配的子串左边的内容; $': 插入当前匹配的子串右边的内容; $n: 假如第一个参数是 RegExp对象，并且 n 是个小于100的非负整数，那么插入第 n 个括号匹配的字符串)
`split` | 接受两个参数，返回一个数组。第一个是用来分割字符串的字符或者正则，如果是空字符串则会将元字符串中的每个字符以数组形式返回，第二个参数可选作为限制分割多少个字符，也是返回的数组的长度限制。有一个地方需要注意，用捕获括号的时候会将匹配结果也包含在返回的数组中


> 示例

** match **
```js
var str = 'For more information, see Chapter 3.4.5.1';
var re = /see (chapter \d+(\.\d)*)/i;
var found = str.match(re);
console.log(found);
// (3) ["see Chapter 3.4.5.1", "Chapter 3.4.5.1", ".1", index: 22, input: "For more information, see Chapter 3.4.5.1"]
// 0:"see Chapter 3.4.5.1"
// 1:"Chapter 3.4.5.1"
// 2:".1"
// index:22
// input:"For more information, see Chapter 3.4.5.1"
// length:3
// __proto__:Array(0)

// 'see Chapter 3.4.5.1' 是整个匹配。
// 'Chapter 3.4.5.1' 被'(chapter \d+(\.\d)*)'捕获。
// '.1' 是被'(\.\d)'捕获的最后一个值。
// 'index' 属性(22) 是整个匹配从零开始的索引。
// 'input' 属性是被解析的原始字符串。
```
```js
var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
 var regexp = /[A-E]/gi;
 var matches_array = str.match(regexp);

 console.log(matches_array);
 // ['A', 'B', 'C', 'D', 'E', 'a', 'b', 'c', 'd', 'e']
```
** repalce **

变量名 | 代表的值
-|-
$$ | 插入一个 "$"。
$& | 插入匹配的子串。
$` | 插入当前匹配的子串左边的内容。
$' | 插入当前匹配的子串右边的内容。
$n | 假如第一个参数是 RegExp对象，并且 n 是个小于100的非负整数，那么插入第 n 个括号匹配的字符串。

```js
var re = /(\w+)\s(\w+)/;
var str = "John Smith";
var newstr = str.replace(re, "$2, $1");
// Smith, John
console.log(newstr);
```
如果是函数的话，函数入参如下，返回替换成的文本

变量名 | 代表的值
-|-
match | 匹配的子串。（对应于上述的$&。）
p1,p2,... | 假如replace()方法的第一个参数是一个RegExp 对象，则代表第n个括号匹配的字符串。（对应于上述的$1，$2等。）
offset | 匹配到的子字符串在原字符串中的偏移量。（比如，如果原字符串是“abcd”，匹配到的子字符串是“bc”，那么这个参数将是1）
string | 被匹配的原字符串。

```js
function replacer(match, p1, p2, p3, offset, string) {
  // p1 is nondigits, p2 digits, and p3 non-alphanumerics
  return [p1, p2, p3].join(' - ');
}
var newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
// newString   abc - 12345 - #$*%
```
** split **
```js
var myString = "Hello 1 word. Sentence number 2.";
 var splits = myString.split(/\d/);

 console.log(splits);
 // [ "Hello ", " word. Sentence number ", "." ]

 splits = myString.split(/(\d)/);
 console.log(splits);
 // [ "Hello ", "1", " word. Sentence number ", "2", "." ]
```

# 正则对象方法

方法 | 描述
-|-
`test` | 接受一个字符串参数，如果正则表达式与指定的字符串匹配返回 true 否则返回 false
`exec` | 同样接受一个字符串为参数，返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null。匹配时，返回值跟 match 方法没有 g 标识时是一样的。数组第 0 个表示与正则相匹配的文本，后面 n 个是对应的 n 个捕获的文本，最后两个是对象 index 和 input同时它会在正则实例的 lastIndex 属性指定的字符处开始检索字符串 string。当 exec() 找到了与表达式相匹配的文本时，在匹配后，它将把正则实例的 lastIndex 属性设置为匹配文本的最后一个字符的下一个位置。有没有 g 标识对单词执行 exec 方法是没有影响的，只是有 g 标识的时候可以反复调用 exec() 方法来遍历字符串中的所有匹配文本。当 exec() 再也找不到匹配的文本时，它将返回 null，并把 lastIndex 属性重置为 0。

> 示例

** exec **
```js
var string = "2017.06.27";
var regex2 = /\b(\d+)\b/g;
console.log( regex2.exec(string) );
console.log( regex2.lastIndex);
console.log( regex2.exec(string) );
console.log( regex2.lastIndex);
console.log( regex2.exec(string) );
console.log( regex2.lastIndex);
console.log( regex2.exec(string) );
console.log( regex2.lastIndex);
// => ["2017", "2017", index: 0, input: "2017.06.27"]
// => 4
// => ["06", "06", index: 5, input: "2017.06.27"]
// => 7
// => ["27", "27", index: 8, input: "2017.06.27"]
// => 10
// => null
// => 0
```

```js
var string = "2017.06.27";
var regex2 = /\b(\d+)\b/g;
var result;
while ( result = regex2.exec(string) ) {
    console.log( result, regex2.lastIndex );
}
// => ["2017", "2017", index: 0, input: "2017.06.27"] 4
// => ["06", "06", index: 5, input: "2017.06.27"] 7
// => ["27", "27", index: 8, input: "2017.06.27"] 10
```
