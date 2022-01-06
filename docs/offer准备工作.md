# 准备工作

- leetcode top 100 + 剑指 offer
- 微前端概念

## 1. 说一下工作中解决过的比较困难的问题，说一下自己项目中比较有亮点的地方。

> 面试官要看一下你解决问题的能力 （平时记好笔记，面试前可筛选）

## 2. 你了解浏览器的事件循环吗？

2.1 为什么 js 在浏览器中有事件循环的机制？

> js 是单线程的，防止冲突

> event loop

2.2 两种任务？

宏任务：整体代码；setTimeout; setInterval, I/O 操作
微任务：new Promise().then; MutationObserver (前端的回溯)

2.3 `for in`（会找原型链） `for of`（不能在对象上用，但是可以自己实现迭代接口） `for each` 的区别

2.4 计算机在职研究生（不要 MBA, 不要花钱买）

2.5 css 阻塞 js 执行 js 执行阻塞 dom 解析 ， 所以 css 在有 js 的情况下也会阻塞 dom 解析
