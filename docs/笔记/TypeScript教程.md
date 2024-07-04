[TOC]

# 关键字

`+` `-`这两个关键字用于映射类型中给属性添加修饰符, 比如`-?`就代表将可选属性变为必选, `-readonly`代表将只读属性变为非只读
,比如 TS 就内置了一个类型工具 `Required<T>`,它的作用是将传入的属性变为必选项:

```typescript
type Required<T> = { [P in keyof T]-?: T[P] };
```

# 工具类型

## Record

> 以 typeof 格式快速创建一个类型，此类型包含一组指定的属性且都是必填

```javascript
type Coord = Record<"x" | "y", number>;

// 等同于
type Coord = {
  x: number,
  y: number,
};
```

## Required

## Partial

> 将类型定义的所有属性都修改为可选

```javascript
type Coord = Partial<Record<"x" | "y", number>>;

// 等同于
type Coord = {
  x?: number,
  y?: number,
};
```

## Readonly

> 将所有属性定义为只读

```javascript
type Coord = Readonly<Record<'x' | 'y', number>>;

// 等同于
type Coord = {
    readonly x: number;
    readonly x: number;
}

// 如果进行了修改，则会报错：
const c: Coord = { x: 1, y: 1 };
c.x = 2; // Error: Cannot assign to 'x' because it is a read-only property.
```

## Pick

> 从类型定义的属性中，选取指定一组属性，返回一个新的类型定义

```javascript
type Coord = Record<"x" | "y", number>;
type CoordX = Pick<Coord, "x">;

// 等用于
type CoordX = {
  x: number,
};
```

## ReturnType

## ConstructorParameters

## Omit

## Merge

## Intersection

## Overwrite

## Mutable

# type 和 interface 区别

> interface 只能用于定义对象类型,而 type 的声明方式除了对象之外还可以定义交又、联合、原始类型 等,类型声明的方式适用范围显然更加广泛。 但是 interface 也有其特定的用处:
> interface 方式可以实现接口的 extends 和 implements interface 可以实现接口合并声明
