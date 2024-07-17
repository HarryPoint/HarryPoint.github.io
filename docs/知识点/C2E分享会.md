
## LEO
### 1. 自我介绍

7年行业经验、在web3实现了小富即安
2018年开始做web3咨询：媒体、项目方、交易所都服务过，熟悉整个行业的发展和迭代。
区块链专栏作者、内容专家。帮助项目完成0——1内容基础搭建，服务项目50+
主张：web3多渠道收入才是web3的魅力，炒币除外

### 2. 当前眼中的web3就业形式

岗位人才比：3：1 （数据来源于dejob.top）
okr 为主，卷任务不卷时间。
工资高于传统行业，但是空间在减少（所以犹豫就会白给）
> 1. 竞争环境，人少 2. 老板（老外），薪资比国内高
学历、院校、大厂经历等基本条件让位于项目经验。


### 3. web3收入结构解析

通常模式：基本工资 + token分红
收入加分项：副业开发+Grant+黑客松

### 4. web3的合规和法律风险

哪些项目方不能去 （不能拉国内人炒币）
> 资本 孵化器 交易所（灰） 媒体 项目方（散户） 
> 交易所（CMC）： 国外用户 没问题
> 项目方：国外用户 没问题
如何结算
> 收：usdc / usdt
> 转：交易所

社保咋办

1. 代缴
2. 灵活就业 办社保

### 5.在这里可以获得什么

行业知识、避坑指南
简历优化和面试内推
黑客松和Grant 资源
多元化的收入结构

## 大正

### 1.不同的链及其应用场景
公有链 (Public Blockchain)
公有链是一种开放式的区块链网络，任何人都可以参与其中，查看链上的所有数据和
交易记录，而且所有的参与者都可以匿名地参与交易和创建区块。公有链的最典型例
子是比特币 (Bitcoin）和以太坊(Ethereum)网络。

特点：
- 开放性：任何人都可以加入网络，无需许可。
- 透明性：所有的数据和交易记录对所有参与者可见。
- 去中心化：没有单一的管理者，决策由网络中的节点共同完成。
- 安全性：由于网络的分散性，公有链通常具有较高的安全性。
  
优势：高度去中心化和安全性，无需信任中介，公正的共识机制。

缺点：低效的处理速度、高昂的能源消耗、隐私性问题。

应用场景
- 加密货币：比特币等数字货币。
- 去中心化应用（DApps)：以太坊上的智能合约和 DApp。

### 私有链 (Private Blockchain)
私有链是一种权限型的区块链网络，只有授权的参与者可以参与和管理网络。参与者
需经过身份验证，并具有特定的权限来访问数据和执行交易。私有链通常由企业或组
织内部使用，用于管理内部业务流程和数据。
一
双击编辑页脚
特点：
权限控制：需要许可和身份验证的参与者。
可扩展性：灵活调整网络性能和隐私级别。
高效性：处理速度通常比公有链快，因为参与者少且可以更集中。
控制性：网络由单一实体控制，可以定制规则和协议。

优势：高效、可控的数据访问权限、更高的隐私保护。
缺点：中心化程度高，可能降低了安全性和去中心化特性。
应用场景
企业内部管理：供应链管理、资产跟踪、内部数据管理。
金融机构：跨境支付、清算和结算

## 岗位和职责

### 前端开发：
职责：负责用户界面和交互设计，与用户直接交互，收集和展示数据。
技术栈：通常使用 HTML、 CSS、 JavaScript 等技术框架如 React.js、 Vuejs 等。

### 后端开发：
职责：处理业务逻辑、与合约交互、处理用户请求和逻辑验证。
技术栈：常见的技术包括 Nodejs、 Golang、 Java 等，用于构建 API服务和逻辑处
理。

### 智能合约开发：
职责：编写和部署智能合约，定义区块链上的业务逻辑。
技术栈：主要使用 Solidity 或其他支持的智能合约语言，如 Vyper，通常部署到以太坊
或其他支持智能合约的区块链平台上。

### 链端（区块链节点）
职责：维护区块链网络，处理交易和区块的验证，执行智能合约。
技术栈：区块链核心节点软件如 Geth（以太坊)、Parity（波卡）等，通常使用 Go、
Rust等编程语言编写。

## 交互方式：
### 前端与后端交互：
前端通过 HTTP 请求向后端发送请求，例如获取用户数据、提交交易请求等。
后端处理这些请求，执行业务逻辑，可能会涉及到调用智能合约或者与链端进行交
互。

### 后端与智能合约交互：
后端可以调用智能合约的方法，例如创建交易、查询状态等，将请求发送到区块链网
络。

### 智能合约与链端交互：
智能合约运行在区块链节点上，当外部请求（如交易）被提交时，合约会在区块链上
执行。合约可以读取和写入区块链上的数据，根据预设的逻辑执行相应的操作。

### 前端与智能合约交互：
当前端需要直接与区块链上的数据和智能合约进行交互时，它会通过区块链的客户端
库（如 web3.js 或 ethers.js)直接连接到区块链节点。
前端可以使用这些库来读取智能合约的状态（如查询账户余额、获取交易记录等）和
执行智能合约的方法（如发送交易、调用函数等）。
这种方式适用于需要在区块链上执行特定操作或查询数据的场景，例如钱包应用、去
中心化交易所等。

### 前端与后端交互，后端与智能合约交互：
在一些场景下，前端不直接与区块链交互，而是通过与后端通信来间接访问区块链上
的数据和执行智能合约操作。
前端向后端发送请求，例如提交交易请求或获取特定数据。
后端接收到请求后，通过区块链的客户端库与区块链节点交互，执行相应的智能合约
方法或查询操作。
后端将结果处理后返回给前端，前端负责展示数据或结果给用户。
### 如何选择：
直接与智能合约交互的情况适用于需要实时访问区块链数据或执行特定区块链操作的
场景，例如钱包应用、投票系统等。

通过后端间接访问区块链的情况适用于需要在后端进行复杂业务逻辑处理或需要额外
安全验证的场景。后端可以在处理请求时对数据进行加工和验证，同时保护智能合约
的安全性和稳定性。

## Jason（18年开始）

## Web3 合约开发入门介绍
### 开场白
自我介绍
Web3简介：Web3是互联网的下一代形式，基于区块链技术，旨在实现去中心化、用户掌控数据、透明和安全。
智能合约简介：智能合约是运行在区块链上的自动化协议，能够执行代码定义的条款，确保交易的可靠和自动化执行。
### Web3和区块链基础
区块链简介：
区块链是分布式账本技术，每个区块包含若干交易数据，这些数据经过验证后不可篡改。
去中心化：没有单一的控制节点，数据分布在多个节点上。
以太坊：
。以太坊是一个开源的区块链平台，支持智能合约和去中心化应用 (DApps)
。以太坊上的每笔交易和智能合约都由以太币 (ETH）支付”燃料费”。
Web3.js:
。 Web3.s是与以太坊区块链进行交互的JavaScript库，用于构建前端应用与区块链的接口。
• 示例代码：

```javascript
const Web3
const Web3 = require("web3")；
const web3 = new Web3("https://mainnet.infura.io/v3/YOUR-PROJECT- ID" )；
web3.eth.getBlockNumber().then(console.log)；
```
### 智能合约基础
- 智能合约定义：智能合约是用编程语言（如Solidity）编写的，部署在区块链上，可以自动执行合约条款。
- Solidity简介：
Solidity是以太坊上最常用的智能合约编程语言，语法类似javaScript。
示例智能合约：
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0；
contract Helloworld {
string public greeting =“Hello， World!"；
function setGreeting(string memory _greeting) public {
greeting = _greeting；
}
}
```

- 部署和执行智能合约：
solidity
。使用开发工具编写、编译智能合约。
部署合约到以太坊网络，获取合约地址。
使用工具或代码与合约交互，调用其方法。
开发工具介绍
Remix IDE:
Remix是一个基于浏览器的Solidity开发环境，适合快速原型设计和测试。
• 功能包括合约编写、编译、部署和调试。
• 使用示例：
1. 打开Remix IDE。
2. 创建新文件，编写Solidity代码。

ReITIx IUC.
Remix是一个基于浏览器的Solidity开发环境，适合快速原型设计和测试。
•
功能包括合约编写、编译、部署和调试。
• 使用示例：
1. 打开Remix IDE。
2. 创建新文件，编写Solidity代码。
3. 编译合约，修正可能的错误。
4. 部署到以太坊测试网络。
Hardhat:
Hardhat是一个以太坊开发环境，支持本地开发、测试和部署。
使用示例：
1. 初始化项目：
mkdir my-hardhat-project
cd my-hardhat-project
npm init -y
npm instal1 --save-dev hardhat
npx hardhat
2. 编写和部署智能合约：
scripts/deploy. js
async function main() {
const [deployer] = await ethers.getSigners()；
console. 1og("Deploying contracts with the account:"， deployer. address)；
const HelloWorld
await ethers.getContractFactory("HelloNorld")；
const helloworld = await Helloworld.deploy()；
console. 1og("Contract deployed to address:"， helloworld.address)；
}
main().catch((error) =>
console.error (error)；
process.exitCode： 1；
}；
3.运行部署脚本：
npx hardhat run scripts/deploy. js
MetaMask:
MetaMask是一个浏览器插件钱包，用于与以太坊DApp交互。
。安装插件后，创建或导入钱包，连接到测试网络进行开发测试。
智能合约开发的基本步骤
1. 编写智能合约：
。使用Solidity编写合约代码。
。编译合约并生成ABI（应用程序二进制接口），
2. 部署合约：
。使用工具（如Remix、Hardhat）将合约部署到以太坊网络（测试网或主网）
。获得合约地址。
3. 与合约交互：
使用Web3.s与合约进行交互，例如调用合约方法、查询状态等。
示例代码：
```javascript
const contractABI =
/* ABI数组*/]；
const contractAddress ='OxYourContractAddress'；
const contract = new web3.eth. Contract(contractABI, contractAddress)；
contract. methods.greeting().cal1(). then(console.1og)；
```
总结
回顾关键点：智能合约的定义、Solidity编程、工具使用和开发步骡。
鼓励实践：鼓励大家动手编写和部署简单的智能合约，增加实践经验。
推荐资源：
，Solidity官方文档：https://docs.soliditylang.org!
。 Web3.js官方文档：https://web3js.readthedocs.iol

## Harry（18年， web3全栈）

## web3技术概况与项目热点

### 前端

1. 钱包
2. web3.js

### 后端

### 区块链（rust、golang-推荐）

### 合约 （rust、 solidity）

## 基础设施

layer1

- bitcoin -> ethereum 等 TPS问题
- 扩容问题：1. 链上扩容 2. 链下扩容
- 架构分层：layer1 , layer2

高性能链
- solana

layer2

rollup技术

- 采用乐观验证
- 采用ZKP零知识证明

## 生态概览

![img](https://cdn.jsdelivr.net/gh/HarryPoint/oss@main/uPic/2024-07-17_21:27:30_Vjykq2.png)

## 钱包

![img](https://cdn.jsdelivr.net/gh/HarryPoint/oss@main/uPic/2024-07-17_21:28:26_tAiDVw.png)

## DeFi

## 聚合器

![img](https://cdn.jsdelivr.net/gh/HarryPoint/oss@main/uPic/2024-07-17_21:30:04_3VW99h.png)

## NFT/dNFT

![img](https://cdn.jsdelivr.net/gh/HarryPoint/oss@main/uPic/2024-07-17_21:31:20_QIKKOo.png)

## GameFi

- Axie nfinity
- Frenpet
- DOGS

## web3 + AI

对比:
- Al中心化vs 区块链去中心化
- 数据共享
- 隐私计算

项目:
- Fetch.ai
- SingularityNET

## Decentralized Physical Infrastructure Networks (DePIN)

## Real World Assets (RWA)

- 真实资产支持，如房地产、股票、债券
- Security Token Offering

## CrosschainBridge

跨链方案
- Hash Time Locked Contract
- Notary Scheme
- Sidechain
- Relayer
  
跨链项目
- Cosmos (IBC)
- Polkadot
- LayerZero

## 其他

- DAO
- DID
- SocialFi
- xFi


## Defi-Web3 （去中心化金融）

赛道

![img](https://cdn.jsdelivr.net/gh/HarryPoint/oss@main/uPic/2024-07-17_21:55:56_6vkmXC.png)



