## React Fiber理念

### 1. 为什么ES语法中有Generator可以实现异步、中断、恢复的功能，React团队还要重新设计呢？

> [Fiber Principles: Contributing To Fiber #7942](https://github.com/facebook/react/issues/7942?ref=zhelin.me#issuecomment-254987818)

* 类似async，Generator也是传染性的，使用了Generator则上下文的其他函数也需要作出改变。这样心智负担比较重;
* Generator执行的中间状态是上下文关联的;

同时，Generator虽然可以实现异步、中断、恢复，但无法调度更新的优先级。

### 2. Fiber架构的实现原理？

> [React Fiber Architecture](https://github.com/acdlite/react-fiber-architecture?ref=zhelin.me)

#### 2.1 Fiber含义

**2.1.1 架构**\
react15（Stack Reconciler）：Reconciler采用递归的方式执行，数据保存在递归的调用栈中。\
react16（Fiber Reconciler）：基于Fiber节点实现的。

**2.1.2 作为静态数据结构（虚拟DOM）**\
每个Fiber节点对应一个React element，保存了该组件的类型（函数组件/类组件/原生组件...）、对应的DOM节点等信息。

在第一次调用`ReactDOM.render`时，会创建整个应用的根节点FiberRootNode（全局只有一个），多次调用`ReactDOM.render`将不同应用挂载在不同的DOM节点时，会多次创建RootNode。\
![fc22e80ac29b51e9](https://static.zhelin.me/ghost/content/images/2022/08/fc22e80ac29b51e9.png)

*为什么父级指针叫做return而不是parent或者father呢？*\
作为一个工作单元，return指节点执行完completeWork后会返回的下一个节点。子Fiber节点及其兄弟节点完成工作后会返回其父级节点，所以用return指代父级节点。

> 在React15中，Stack Reconculer使用递归的形式工作根=>子，再从子=>根，函数处理完子节点工作返回父节点。在Fiber Reconculer中，使用遍历的形式实现可中断的递归，也复用了这种思想。

如果仅仅作为静态数据结构，Fiber就与JSX没有任何区别了

**2.1.3 作为动态的工作单元**\
每个Fiber节点保存了本次更新中该组件改变的状态、要执行的工作（需要被删除/被插入页面中/被更新...）

#### 2.2 Fiber架构使用了一种双缓存的工作机制，那么什么是双缓存？(工作原理)

在内存中构建，直接替换的技术叫双缓存

**Fiber树的构建：深度优先，模拟递归的形式创建**

* A代表页面内容的Fiber：current Fiber树
* B触发更新，内存构建的Fiber：wirkinProgress Fiber树

当B完成渲染，FiberRootNode current指针就指向了B树，每次更新都会触发创建一棵wirkinProgress Fiber树;\
![666b6610f8a73291](https://static.zhelin.me/ghost/content/images/2022/08/666b6610f8a73291.png)

再次更新时，A树根节点的alternate属性已经指向了一个RootFiber，新的wirkinProgress Fiber树会基于该RootFiber创建。在本次更新中，组件的每个节点都有对应的current Fiber存在。这种将current Fiber与本次更新返回的JSX结构做对比，生成wirkinProgress Fiber的过程就是Diff算法。

**2.2.1首屏渲染与更新最大的区别是什么？**\
在创建Fiber树的过程中，是否有Diff算法。

