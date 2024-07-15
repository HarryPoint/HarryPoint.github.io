## web3 的常见问题: 
1. 什么是web3？web2和web3的区别？
2. PoW（工作量证明）和PoS（ 权益证明）有什么区别？
3. 比特币和以太坊有什么区别？
4. 什么是智能合约？
5. 公钥和私钥？
6. 简要说一下什么是dapp，dao , gamefi, defi?
7. 什么是Gas?
8. 你用一句话讲一下amm机制？
9. 你玩过一些什么应用？
10. opensea和looksrare的区别？

## 元宇宙
![img](https://cdn.jsdelivr.net/gh/HarryPoint/oss@main/uPic/2024-07-12_22:31:48_A07Agb.png)

## NFT

NFT(Non-fungible token), 不可互换的代币。

> FT: 同质化代币，例如 BTC

NFT类型：
- 土地NFT：例如 Decentraland、 Otherside、Sandbox
- 游戏NFT：例如 Player to Earn: Axie infinity
- 数字藏品NFT：例如 `Everydays: The First 5000 Days`, `Murakami.Flowers`
- 数字孪生NFT：例如 数字虚拟人

## web3.0

![img](https://cdn.jsdelivr.net/gh/HarryPoint/oss@main/uPic/2024-07-12_22:53:12_B5Zdcd.png)

## 区块链

- 定义：区块 + 链
- 特征：去中心化、共识机制（PoW和PoS）、不可篡改
- 类型：公链、私链、联盟链、混合链

区块链类型：

|          |  公链  |     私链     |   联盟链   |
| :------: | :----: | :----------: | :--------: |
| 准入限制 |   无   |      有      |     有     |
|  读取者  | 任何人 | 仅限受邀用户 | 相关联用户 |
|  写入者  | 任何人 |  获批参与者  | 获批参与者 |
|  所属者  |   无   |   单一实体   |  多方实体  |
|  匿名性  |   是   |      否      |     否     |
| 交易速度 |   慢   |      快      |     快     |

[blockchain-demo](https://github.com/anders94/blockchain-demo)

### hash算法

特点：
- 从hash值不可以反向推导出原始的数据
- 输入数据的微小变化会得到完全不同的hash值
- 相同的数据会得到相同的值
- 执行效率要高效，长的文本也能快速地计算出哈希值
- hash算法的冲突概率要小

### 区块

> 一般以 `0000`开头

`第n块的Hash值 = Hash(第n-1块的Hash值 + 第n块的账本数据）`

0号区块前指针是以 0 组成的字符串

### P2P网络

链上每一台电脑都是一个节点，都是客户端，也都是服务器，组成P2P网络

### 记账和挖矿

比特币采用POW（工作量证明）来选择使用谁的账本

### 共识机制

广泛应用的共识机制

- POW（工作量证明机制）：比特币
- POS（权益证明机制）：以太坊
- POA（权威证明机制）：结合了pow和pos
- POC（容量证明机制）：Chia
- CPOC(有条件的容量证明机制) ：结合了poc和pos

## 比特币

Cypherpunk(密码朋克) 中本聪

## 以太坊

维塔利克·布特林（Vitalik Buterin）,以太坊发明人。

### 以太币

以太坊区块链上的代币称为以太币（Ether）,代码为 ETH。

作用：

- 质押挖矿
- 发布合约
- 交易
- 投资
  
单位：

|    单位    |  Wei 值  |            Wei            |
| :--------: | :------: | :-----------------------: |
|    wei     |  1 wei   |             1             |
|    Kwei    | 1e3 wei  |           1,000           |
|    Mwei    | 1e6 wei  |         1,000,000         |
|    Gwei    | 1e9 wei  |       1,000,000,000       |
| microEther | 1e12 wei |     1,000,000,000,000     |
| milliEther | 1e15 wei |   1,000,000,000,000,000   |
|   Ether    | 1e18 wei | 1,000,000,000,000,000,000 |

如何获取以太币？
主网：
![img](https://cdn.jsdelivr.net/gh/HarryPoint/oss@main/uPic/2024-07-13_00:29:43_7CCOZp.png)

测试网：

- Goerli 官网：https://goerli.net/
- Sepolia 官网：https://sepolia.dev/

### 以太网

当前应用：

- [谜恋猫](https://www.cryptokitties.co) 虚拟猫咪休闲游戏
- [opensea](https://opensea.io) NFT交易龙头
- [uniswap](https://uniswap.org) 去中心化的DeFi交易所
- [Dao botto](https://botto.com) 去中心化的自治组织

## 以太坊-钱包

> 钱包只存账户信息，资产在链上

区块链钱包分类：热钱包(Hot Wallet)、冷钱包(Cold Wallet)

概念内容：密码、私钥、公钥、keystore、助记词

![img](https://cdn.jsdelivr.net/gh/HarryPoint/oss@main/uPic/2024-07-13_00:50:30_0JbQgC.png)

挖矿地址：

- 以太坊： https://www.tokenpocket.pro/
- 测试网（goerli）： https://goerli-faucet.pk910.de/

## 以太坊-智能合约

### DApp

web3书籍推荐
![img](https://cdn.jsdelivr.net/gh/HarryPoint/oss@main/uPic/2024-07-13_02:09:29_b53ADe.png)

## 代码步骤

```javascript
import { ref } from "vue"
import { generateMnemonic, mnemonicToSeed } from "bip39"
import ethwallet, { hdkey } from "ethereumjs-wallet"

// 创建助记河
// const mnemonic = generateMnemonic();
// console. 1og( mnemonic);
const mnemonic = ref("bus render shove water original exchange face quiz girl choose subway morning")
// 生成秘钥对 keypair
const genMnemonic = async () => {
    const seed = await mnemonicToSeed(mnemonic.value);
    const hdWallet = hdkey.fromMasterSeed(seed);
    const keypair = hdWallet.derivePath("m/44'/60'/0'/0/0");
    //获取私钥
    //1.获取钱包对象
    const wallet = keypair.getwallet();
    // 2.获取钱包地址
    const lowerCaseAddress = wallet.getAddressString();
    //3. 获取钱包校验地址
    const checkAddress = wallet.getChecksumAddressString();
    // 获取私钥
    const priKey = wallet.getPrivatekey().toString("hex");
    console.log(prikey);

    // 导出keystore
    const password = "111111";
    // 1. web3js
    const web3 = new Web3(Web3.givenProvider || "wss://goerli.infura.io/ws/v3/cb7e63cf28244e4499b4b6fb6162e746");
    const keyStore = web3.eth.accounts.encrypt(prikey, password);
    console.log(JSON.stringify(keystore));
    // 2. wallet 对象
    const keyStore2 = await wallet. tov3(password);
    console.log(JSON.stringify(keystore2));

    // 通过keystore 获取私钥
    // 1. web3
    const res = web3.eth.accounts.decrypt(keyStore, password);
    console.log(res.privatekey);
    //2. wallet
    const res2 = await ethwallet.fromV3(keyStore2, password);
    const key = res2.getPrivatekey().toString("hex");
    console.log(key);

    // 通过私锅获取地址
    const priKey2 = Buffer(prikey,"hex");
    const wallet3 = ethwallet.fromPrivateKey(priKey2);
    const lowerCaseAddress2 = wallet3.getAddressString();
    console.log(lowerCaseAddress2);
}
genMnemonic();
```
## 钱包流程图

![img](https://cdn.jsdelivr.net/gh/HarryPoint/oss@main/uPic/2024-07-14_22:24:56_64V70A.png)

### 安装npm包

```bash
npm install web3 bip39 ethereumjs-txa1.3.7 ethereumis-util ethereumjs-wallet
```

## solidity

### 变量类型

- 局部变量（在函数内部声明，不存储到锉上）
- 状态变量（在函数外部声明，状态变量是永久地存储在链上的值）
- 全局变量（内置提供有关区块链的信息比如 block、 msg 等）

全局变量
这些是全局工作区中存在的特殊变量，提供有关区块链和交易属性的信息。

|                     名称                      |                          返回                           |
| :-------------------------------------------: | :-----------------------------------------------------: |
| blockhash(uint blockNumber) returns (bytes32) | 给定区块的哈希值- 只适用于256最近区块，不包含当前区块。 |
|       block.coinbase (address payable)        |                   当前区块矿工的地址                    |
|            block.difficulty (uint)            |                     当前区块的难度                      |
|             block.gaslimit (uint)             |                   当前区块的gaslimit                    |
|              block.number (uint)              |                    当前区块的number                     |
|            block.timestamp (uint)             |          当前区块的时间戳，为unix纪元以来的秒           |
|          gasleft() returns (uint256)          |                        剩余 gas                         |
|           msg.data (bytes calldata)           |                      完成 calldata                      |
|         msg.sender (address payable)          |                消息发送者（当前 caller）                |
|               msg.sig (bytes4)                |        calldata的前四个字节(function identiffer)        |
|               msg.value (uint)                |                     当前消息的wei值                     |
|                  now (uint)                   |                     当前块的时间戳                      |
|              tx.gasprice (uint)               |                      交易的gas价格                      |
|          tx.origin (address payable)          |                      交易的发送方                       |

### 可见性修饰符

1. public - 所有合约与账号都可以调用
2. private - 只有在定义该函数的合约可以调用
3. internal - 当前合约或者继承该合约的，类似java 里面的protected关键字
4. external - 只有其他合约或者账号可以调用,定义该函数的合约不能调用除非使用this关键字