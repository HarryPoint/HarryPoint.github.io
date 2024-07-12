## Rust学习笔记


<!--kg-card-begin: markdown-->

## 关键点

1. Rust没有null，但null的概念还是有用的，因某种原因而变为无效或缺失的值 `Option<T>`

## 5. Struct结构体

### 定义

### 方法

1. 方法和函数类似：fn关键字、名称、参数、返回值
2. 使用`impl`定义
3. self**可以获得所有权**，**可以借用**也**可以可变借用**
4. 每个struct允许拥有多个impl快

```rust
struct Rectangle {
    width: u32,
}

impl Rectangle {
    // self 可以获得所有权，也可以使用可变的借用&mut self
    fn test(&self) -> {
        self.width
    }
}
```

* 方法实在struct（或enum、trait对象）的上下文中定义
* 第一个参数是self，表示方法被调用的struct实例

### 关联函数

1. 可以在impl块里定义不把self作为第一个参数的函数，他们叫关联函数
   * 例如：String::from()

2. 关联函数通常用于构造器

3. `::`符号

   * 关联函数
   * 模块创建的命名空间

```rust
struct Rectangle {
    width: u32,
}

impl Rectangle {
    // ...其他代码
    fn test2(size: u32) -> Rectangle {
        Rectangle {
            width: size
        }
    }
}

fn main() {
    let s = Rectangle::test2(10)
}
```

## 6. 枚举与模式匹配

### 定义枚举

```rust
enum IpAddrKind {
    V4,
    V6,
}

fn main() {
    let four = IpAddrKind::V4;
}
```

### 将数据附加到枚举的变体中

```rust
enum IpAddrKind {
    V4(u8, u8, u8, u8),
    V6(String),
}

fn main() {
    let four = IpAddrKind::V4(127,0,0,1);
    let six = IpAddrKind::V6(String:from("::1"));
}
```

优点：

1. 不需要额外使用struct
2. 每个变体可以拥有不同类型以及关联数据的量
3. 可以在变体中嵌入任何类型

### 为枚举定义方法

1. 可以使用impl关键字为枚举定义方法，与struct一致

### Option枚举

1. 定义于标准库中
2. 在Prelude（预导入模块）中
3. 描述了：某个值可能存在（某种类型）或不存在的情况
4. `Option<T>`中有`Some<T>`和None
5. `Option<T>`与T是不同的类型，若想使用`Option<T>`中的T，必须将他转换为T

### match - 控制流运算符

1. 匹配的分支可以绑定到被匹配对象的部分值
   * 因此，可以从enum变体中提取值
2. **match匹配必须穷举所有可能**，可以使用`_`通配符，替代其余没有列出的值

![match](https://static.zhelin.me/ghost/content/images/2022/05/2c5ad7acfd73445b.png)

### if let

简单的控制流，只关心一种匹配，忽略其他匹配。可以把if let 看作是match的语法糖，可以搭配else

```rust
fn main() {
    let v = Some(0u8);
    
    if let Some(3) = v {
        // 其他代码
    }
}
```

## 7. Package/Creat/Module

* Package(包)：Cargo的特性，让你构建、测试、共享crate
* Crate(单元包)：个模块树，它可产生一个lilbrary或可执行文件
* Module (模块) ：use:让你控制代码的组织、作用域、私有路径
* Path（路径）：未struct、function或module等项命名的方式\
  自上而下的包含关系

### Crate

* Crate的类型

  * binary二进制，
  * library库文件

* Crate Root

  * 是源代码文件，例：二src/main.rs、库src/lib.rs）
  * Rust编译器从这里开始，入口文件，组成你的crate的根module

* 一个package

  * 包含1个Cargo.toml，它描述了如何构建这些Crates
  * 只能包含0-1个library crate
  * 可以包含任意数量的binary crate
  * 但必须至少包含一个crate (library或binary)

### Module

* Module:

  * 在一个crate内，将代码进行分组
  * 增加可读性，易于复用
  * 控制项目(item)的私有性。public、private

* 建立module:

  * mod关键字
  * 可嵌套
  * 可包含其它项(struct、enum、常量、trait、函数等)的定义

### 私有边界

1. Rust中所有的条目默认就是私有的
2. 模块不仅可以组织代码，还可以定义私有边界。
3. 如果想把函数或struct等设为私有，可以将它放到某个模块中。
4. 父级模块无法访问子模块中的私有条目
5. 子模块里可以使用所有祖先模块中的条目

### use关键字

也需要遵守私有性规则
