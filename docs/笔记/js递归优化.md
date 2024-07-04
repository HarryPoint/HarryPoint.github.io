## 尾递归优化

```javascript
function sumAll(n, i = 0, result = 0) {
  return i > n ? result : sumAll(n, i + 1, i + result);
}
```

## 蹦床

```javascript
function sumAll(n, i = 0, result = 0) {
  return i > n ? () => result : () => sumAll(n, i + 1, i + result);
}

function trampoline(f) {
  return function (...args) {
    let result = f(...args);
    while (typeof result === "function") {
      result = result();
    }
    return result;
  };
}

const _sumAll = trampoline(sumAll);
_sumAll(10000);
```
