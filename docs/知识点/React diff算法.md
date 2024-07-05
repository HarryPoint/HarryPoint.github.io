# React diff 算法

reconcile流程的本质，是对比current fiberNode与 JSX 对象，生成 wip fiberNode, 这一流程的核心算法被称为diff算法。

由于Diff操作本身也会带来性能损耗，React文档中提到，即使在最前沿的算法中，将前后两棵树完全比对的算法的复杂程度为 O(n3 )，其中n是树中元素的数量。
为了降低算法复杂度，React的diff会预设三个限制：
- 只对同级元素进行Diff。如果一个DOM节点在前后两次更新中跨越了层级，那么React不会尝试复用他。
- 两个不同类型的元素会产生出不同的树。如果元素由div变为p，React会销毁div及其子孙节点，并新建p及其子孙节点。
- 开发者可以通过 key prop来暗示哪些子元素在不同的渲染下能保持稳定。

## 单节点diff
判断方式：
- 判断key是否相同
- 如果key相同，再判断type是否相同
如果以上条件均满足，则current fiberNode可以复用。

这里有个细节需要注意：
- 当“child !== null 且 key相同 且 type不同时“，执行 deleteRemainingChildren将 child及其兄弟fiberNode均标记删除。
- 当”child !== null 且 key不同时“，仅将child标记删除。

## 多节点diff
在日常开发中，”节点移动“较少发生，所以diff算法会优先判断其他情况，基于这个理念，diff算法的整体逻辑会经历两轮遍历：
- 第一轮遍历尝试逐个复用节点
- 第二轮编辑处理剩下的节点
对于最常见的情况（即”节点位置没有变化”），此时仅需经历第一轮遍历，相较于其他情况省略了第二轮遍历。

### 第一轮遍历
1. 遍历newChildren，将newChildren[i]与oldFiber比较，判断DOM节点是否可复用。
2. 如果可复用，i++，继续比较newChildren[i]与oldFiber.sibling（继续步骤1），如果不可复用，分两种情况：
   - key不同导致不可复用，立即跳出整个遍历，第一轮遍历结束。
   - key相同type不同导致不可复用，会将oldFiber标记为DELETION，并继续遍历（步骤1）
3. 如果newChildren遍历完（即i === newChildren.length - 1）或者oldFiber遍历完（即oldFiber.sibling === null），跳出遍历，第一轮遍历结束。

第一轮遍历后情况和处理方式：
1. newChildren与oldFiber同时遍历完（最理想情况），只需在第一轮遍历进行组件更新，此时Diff结束。
2. newChildren遍历完，oldFiber没遍历完，意味着本次更新比之前的节点数量少，有节点被删除了。所以需要遍历剩下的oldFiber，依次标记Deletion。
3. newChildren没遍历完，oldFiber遍历完，已有的DOM节点都复用了，这时还有新加入的节点，意味着本次更新有新节点插入，我们只需要遍历剩下的newChildren依次生成fiberNode。
4. newChildren与oldFiber都没遍历完，进入第二轮遍历：

### 第二轮遍历
> 前提：newChildren与oldFiber都没遍历完
准备工作： 将所有“还未处理的oldFiber”存入一个“以key（如果key不存在，使用index作为key）为key，oldFiber为value的Map中”, 这一过程在 mapRemainingChildren方法中（目的是可以以O(1)的复杂度获取相同key的oldFiber）；
判断原理：
    判断的参照物是lastPlacedIndex变量（最后一个可复用的oldFiber的位置索引）。由于newChildren中的JSX对象的顺序代表“本次更新后对应fiberNode的顺序”，因此在遍历newChildren生成wip fiberNode的过程中，每个新生成的wip fiberNode 一定是在“当前所有同级wip fiberNode中最靠右的一个”
第二轮遍历:
遍历剩余的newChildren,  如果在 map(mapRemainingChildren生成的map)中没有找到直接标记为新节点，，如果找到了，表明可以复用。
情况判断：
1. olderFiber.index >= lastPlacedIndex, 则位置不变；
2. olderFiber.index < lastPlacedIndex, 则位置移动，标记 Placement；
收尾工作：
如果map中还剩下node，则标记 Deletion;

### 遍历后收尾工作
如果map zhon

### 性能优化要点
尽量避免将节点从后面移动到前面
