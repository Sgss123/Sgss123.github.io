```js
// 定义一个防抖函数 debounce，接受两个参数：func（要执行的函数）和 wait（延迟时间，默认为 500 毫秒）
function debounce(func, wait = 500) {
    // 声明一个变量 timer，用于存储定时器的引用
    let timer;
    // 返回一个函数，这个函数就是我们实际调用的函数
    return () => {
        // 在调用之前，先清除之前的定时器（如果有的话）
        clearTimeout(timer);
        // 设置一个新的定时器，延迟执行传入的函数 func，时间为 wait 毫秒
        timer = setTimeout(func(), wait);
    }
}

```

