---
tags: [react, typescript]
---

## 类型简述

| 内置类型               | 说明                                                                  |
| ---------------------- | --------------------------------------------------------------------- |
| React.ReactElement     | 使用`React.createElement`创建的，可以简单理解为`React`中的`JSX`的元素 |
| React.ReactNode        | `<div>xxx</div>` 的合法类型                                           |
| React.CSSProperties    | 组件内联的`style`对象的类型                                           |
| React.RefObject        | `React.createRef`创建的类型，只读不可改                               |
| React.MutableRefObject | `useRef`创建的类型，可以修改                                          |

## hooks 声明

### useState

`useState`可以使用泛型传参或者自动推断

```javascript
const [state, setState] = useState(""); // state的类型为string，自动推断
const [state, setState] = useState<string>(); // state的类型为 string | undefined
// 给初值
const [state, setState] = useState<string | null>(null); // state的类型为 string | null
```

### useEffect

当使用 `useEffect` 时，注意不要返回任何东西，除了函数或未定义:

```javascript
function DelayedEffect(props: { timerMs: number }) {
  const { timerMs } = props;
  useEffect(
    () =>
      setTimeout(() => {
        /* do stuff */
      }, timerMs),
    [timerMs]
  );
  return null;
}
```

### useContext

### useReducer

`useReducer`相对来说要写的更多一点，可以自动推断，所以不需要手动写泛型类型

```javascript
// state类型
interface ReducerState {
  value: string;
}
// action类型
interface AnyAction {
  type: string;
  [key: string]: any;
}
// reducer函数
const reducer: React.Reducer<ReducerState, AnyAction> = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
// 初始值
const initialState: ReducerState = { value: "" };

const [state, dispatch] = useReducer(reducer, initialState);
// state 的类型为 ReducerState
// dispatch 的类型为 React.Dispatch<AnyAction>
```

`Action`也可以是多个不同的`Action`的联合类型

### useCallback

### useMemo

### useRef

`useRef`同样也会自动推断

```javascript
const ref = useRef(""); // ref.current的类型为 string
// 泛型
type Value = { value: string };
const ref = useRef < Value > { value: "" };
// ref为html元素
const ref = useRef < HTMLDivElement > null;
return <div ref={ref} />;
```

需要注意的是如果`ref`为元素，那么初始值得写个`null`才不会报错

### useImperativeHandle

`useImperativeHandle`这个钩子可以把内部方法通过`ref`暴露出去，用`ts`也是要写多一点，类型都需要标注清楚

```javascript
// props
interface AppProps {
  value: string;
}
// useImperativeHandle获取到ref的类型
interface Handle {
  get: () => string;
}

const App = React.forwardRef<Handle, AppProps>(({ value }, ref) => {
  // 定义
  useImperativeHandle(ref, () => ({
    get: () => `handle get value : ${value}`,
  }));
  return null;
});
// 使用
const handleRef = useRef<Handle>(null);
// handleRef.current?.get();
return <App value="hello" ref={handleRef} />;
```

### useLayoutEffect

### useDebugValue

### 自定义 hooks

有如下钩子

```javascript
const useCustomHook = () => {
  const [state, setState] = useState("");
  const set = (value: string) => {
    if (!value) return;
    setState(value);
  };
  return [state, set];
};
// 使用
const [state, setState] = useCustomHook();
setState("hello"); // This expression is not callabl
```

自定钩子还需要定义返回值才行

```javascript
- const useCustomHook = () => {
+ const useCustomHook = (): [string, (value: string) => void] => {
```

## 组件声明

组件声明分为类组件和函数组件

### 类组件

类组件使用的定义主要为`React.Component<P,S>`和`React.PureComponent<P,S,SS>`

```javascript
interface AppProps {
  value: string;
}
interface AppState {
  count: number;
}
class App extends React.Component<AppProps, AppState> {
  static defaultProps = {
    value: "",
  };
  state = {
    count: 0,
  };
}
```

`React.Component<P,S>`这里的`P`是`props`的类型，`S`是`state`的类型，可以写为`React.Component<AppProp>`,因为`state`的类型会自己推断

在上面`PureComponent`中还有个`SS`，这个`SS`是`getSnapshotBeforeUpdate`的返回值

### 函数组件

函数组件定义的方式简单来看有两种，一种是使用`React.FC`，一种是直接给`props`写上定义

```javascript
interface AppProps {
  value?: string;
}

const App: React.FC<AppProps> = ({ value = "", children }) => {
  // ...
};
```

`React.FC`的意思是`FunctionComponent`，如果使用了`React.FC`，它在定义里就已经规定好了`children`的类型和函数的返回值，所以可以直接用`children`，如果是直接给`props`写上定义，就需要自己定义`children`的类型

```javascript
interface AppProps {
  value?: string;
  children?: React.ReactNode; // 自己定义children的类型
}

function App({ value = "", children }: AppProps) {
  return <>{children}</>;
}
```

## React.forwardRef

`React.forwardRef<T, P = {}>`只需要传`props`的类型和`ref`的类型，第一个`T`是`ref`的类型，`P`是`props`的类型

```javascript
const App = React.forwardRef<HTMLDivElement, AppProps>(({ value }, ref) => {
  return <div ref={ref} />;
});
// 使用
const ref = useRef<HTMLDivElement>(null);
return <App value="hello" ref={ref} />;
```

## React.ForwardRefRenderFunction

定义为该类型的函数可以放进`React.forwardRef`函数中作为参数

```javascript
// 定义
const forwardRender: React.ForwardRefRenderFunction<
  HTMLDivElement,
  AppProps
> = ({ value }, ref) => {
  return <div ref={ref} />;
};
const App = React.forwardRef(forwardRender);
// 使用
const ref = useRef < HTMLDivElement > null;
return <App value="hello" ref={ref} />;
```

## React.createContext

泛型有自动推断的功能，所以`useContext`就不需要再写上类型了

```javascript
interface ContextType {
  getPrefixCls: (value: string) => string;
}

const context =
  React.createContext <
  ContextType >
  {
    getPrefixCls: (value) => `prefix-${value}`,
  };

const App = () => {
  const { getPrefixCls } = useContext(context);
  getPrefixCls("App"); // prefix-App
  return null;
};
```

## React.cloneElement

如果使用的`React.FC`定义的组件，它的`children`类型默认是`React.ReactNode`，需要显式转为`React.ReactElement`

```javascript
const App: React.FC = ({ children }) => {
  return React.cloneElement(children as React.ReactElement, { value: "hello" });
};
// 也可以覆写定义
const App: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  return React.cloneElement(children, { value: "hello" });
};
```

## React.ComponentType

通过`React.ComponentType<P>`定义的组件可以将变量名传入组件，在组件内调用，高阶组件通常会使用

```javascript
interface AppProps {
  value: string;
}
const App: React.FC<AppProps> = (props) => {
  return null;
};
// React.ComponentType定义组件
function HOC<T>(Component: React.ComponentType<T>) {
  return function (props: T) {
    return <Component {...props} />;
  };
}
const WrappedComponent = HOC(App);
// 调用
<WrappedComponent value="hello" />;
```

## 泛型参数的组件

泛型参数的组件是`javascript`2.9 版本新增的

```javascript
<Select<number>>
  <Select.Option value={1}>1</Select.Option>
  <Select.Option value={2}>2</Select.Option>
</Select>
```

### 类组件的定义

```javascript
// 定义泛型参数的组件
class GenericComponent<P> extends React.Component<P> {
  internalProp: P;
  constructor(props: P) {
    super(props);
    this.internalProp = props;
  }
  render() {
    return null;
  }
}

type Props = { a: number; b: string };

<GenericComponent<Props> a={10} b="hi" />; // OK
<GenericComponent<Props> a={10} b={20} />; // Error
```

### 函数组件的定义

```javascript
function GenericComponent<P>(props: P) {
  const internalProp = useRef(props);
  return null;
}
```

## 事件处理

```javascript
const App = () => {
  // React.MouseEventHandler
  const onClick: React.MouseEventHandler<HTMLInputElement> = (e) => {
    console.log(e.currentTarget.value);
  };
  // React.ChangeEventHandler
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.currentTarget.value);
  };
  // React.FocusEventHandler
  const onFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    console.log(e.currentTarget.value);
  };
  return <input onClick={onClick} onChange={onChange} onFocus={onFocus} />;
};
```

如果有事件不清楚该如何定义类型，可以点组件上的事件名去看看定义

需要注意的是只有`e.currentTarget`才会有对应的元素类型，`e.target`是没有的，它的类型是`EventTarget`
