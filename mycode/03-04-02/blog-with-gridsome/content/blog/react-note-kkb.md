---
title: react-note-kkb
catalog: true
top: true
header-img: https://tva1.sinaimg.cn/large/006tNbRwly1gbemrgzfojj315o0rsaaf.jpg
date: 2019-09-11 21:19:08
tags:
- react
- note
- kkb
categories:
- react
---

## 资源

1. [react]('https://reactjs.org')
2. [create-react-app]('https://github.com/facebook/create-react-app')



## 环境配置与快速上手

### CDN 链接

可以通过 CDN 获得 React 和 ReactDOM 的 UMD 版本

#### 开发环境，不适合生产环境

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/reactdom@16/umd/react-dom.development.js"></script>
```

#### 生产环境

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js "></script>
<script crossorigin src="https://unpkg.com/reactdom@16/umd/react-dom.production.min.js"></script>
```

如果需要加载指定版本的 react 和 react-dom，可以把 16 替换成所需加载的版本号。

如果你通过 CDN 的⽅式引⼊ React，我们建议你设置 `crossorigin` 属性

### create-react-app

Create React App 是⼀个官⽅⽀持的创建 React 单⻚页应⽤程序的⽅法。它提供了⼀个零配置的现代构建设置

```shell
# 1. 安装官方脚手架
npm install -g create-react-app
# 2. 创建项目
create-react-app my-app
# 1. 直接使用 npx 创建项目
npx create-react-app my-app
# 3. 启动项目
npm start
# 4. 构建生产
npm run build
# 5. webpack 扩展
npm run eject # 打散项目，不可逆操作
```

## 起步

创建项目：`npx create-react-app my-app`

### 文件结构

#### 文件结构一览

```
|- README.md               文档
|- public                  静态资源，//公共⽂件，⾥边有公⽤模板和图标等⼀些东⻄
|  |- favicon.ico
|  |- index.html
|  |- manifest.json
|- src                     源码
   |- App.css
   |- App.js               根组件
   |- App.test.js
   |- index.css            全局样式
   |- index.js             入口文件
   |- logo.svg
   |- serviceWorker.js     PWA 支持，配合线上发布，实现离线使⽤的⽬的
|- package.json            npm 依赖
```

#### CRA 项目真容

使用`npm run eject`弹出项目真面目，会多出两个目录：

```
|- config
   |- env.js                      处理.env环境变量配置文件
   |- paths.js                    提供各种路径
   |- webpack.config.js           webpack配置文件
   |- webpackDevServer.cofig.js   测试服务器配置文件
|- scripts      启动，打包和测试脚本
   |- build.js     打包脚本
   |- start.js     启动脚本
   |- test.js      测试脚本
```

env.js 用来处理.env 文件中配置的环境变量

```js
// node运行环境：development/production/test etc...
const NODE_ENV = process.env.NODE_ENV;

// 要扫描的文件名数组
var dotenvFiles = [
  `${paths.dotenv}.${NODE_ENV}.local`, // .env.development.local
  `${paths.dotenv}.${NODE_ENV}`, // .env.development
  NODE_ENV !== "test" && `${paths.dotenv}.local`, // .env.local
  paths.dotenv // .env
].filter(Boolean);

// 从.env文件加载环境变量
dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require("dotenv-expand")(
      require("dotenv").config({
        path: dotenvFile
      })
    );
  }
});
```

创建.env 文件，修改默认端口号

```js
// .env
PORT = 8080;
```

webpack.config.js 是 webpack 配置文件，开头的常量声明可以看出 CRA 能够支持 ts,sass,css 模块化

```js
// Check if Typescript is setup
const useTypeScript = fs.existsSync(paths.appTsConfig);

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
```

### React and ReactDOM

删除 src 下面所有文件代码，新建 index.js

```jsx
import React from "react";
import ReactDOM from "react-dom";

// 这里好像没有看到React使用
// jsx => React.createELement(...)
ReactDOM.render(<h1>React is Cool</h1>, document.getElementById("root"));
```

> React 负责逻辑控制，数据 -> VDOM
> ReactDOM 负责渲染实际 DOM，VDOM -> DOM，如果切换到移动端，就用别的库来渲染
> React 使用 JSX 来描述 UI

> 入口文件定义，webpack.config.js

```js
entry: [
  // webpackDevServer 客户端，它实现开发时的热更新功能
  isEnvDevelopment && require.resolve("react-dev-utils/webpackHotDevClient"),
  // 应用程序入口 src/index
  paths.appIndexJs
].filter(Boolean);
```

### JSX

JSX 是一种 JavaScript 的语法扩展，其格式比较像模板语言，但事实上完全是在 JavaScript 内部实现的。
JSX 仅仅只是 `React.createElement(component, props, ...children)` 函数的语法糖
JSX 可以很好的描述 UI，能够有效提高开发效率
React 官网体验 [jsx](https://zh-hans.reactjs.org/)
Babel 在线编译器体验 [jsx](https://babeljs.io/repl/#?presets=react&code_lz=GYVwdgxgLglg9mABACwKYBt1wBQEpEDeAUIogE6pQhlIA8AJjAG4B8AEhlogO5xnr0AhLQD0jVgG4iAXyJA)

> jsx 本质就是 React.createElement 的调用，最终结果是 React '元素'（JavaScript对象），React '元素' 类型可以是原生DOM，字母小写，首字母大写的视为自定义组件
>
> ```jsx
> const jsx = <h2>Hello React</h2>;
> ReactDOM.render(jsx, document.getElementById('root'));
> ```



#### 使用 JSX

**jsx 中通过 {} 使用表达式**

表达式`{}`的使用
```jsx
// index.js
const name = "react study";
const jsx = <h2>{name}</h2>;
```
函数也是合法表达式
```jsx
// index.js
const user = { firstName: "tom", lastName: "jerry" };
function formatName(user) {
  return user.firstName + " " + user.lastName;
}
const jsx = <h2>{formatName(user)}</h2>;
```
jsx 是 js 对象，也是合法表达式
```jsx
// index.js
const greet = <p>hello, Jerry</p>;
const jsx = <h2>{greet}</h2>;
```

### 动态渲染UI

```jsx
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

### 条件渲染

`if` 语句以及 `for` 循环不是 JavaScript 表达式，所以不能在 jsx 中直接使用。

但是你可以用在 jsx 以外的代码中。条件语句可以基于上面理论实现

#### if 语句

```jsx
let isShowTitle = true;
if (isShowTitle) {
  title = <h1>是否显示h1</h1>
}
```

#### 逻辑与&&

```jsx
const jsx = (<div>
    {isShowTitle && <h1>title</h1>}
  </div>
)
ReactDOM.render(jsx, document.querySelector('#root'))
```

#### 三元表达式 || 三目运算符

```jsx
const showTitle = true;
const title = name ? <h2>{name}</h2> : null;
const jsx = (
  <div>
    {/* 条件语句 */}
    {title}
  </div>
)
```

#### 循环列表 && key

数组会被作为一组子元素对待，数组中存放一组 jsx 可用于显示列表数据

```jsx
const arr = [1, 2, 3].map(num => <h1 key={num}>{num}</h1>);
const jsx = (
  <div>
    {/* 数组 */}
    <ul>{arr}</ul>
  </div>
);
```



### React DOM 元素属性的使用

```jsx
import logo from "./logo.svg";
import 'index.css';

const box = {
  color: 'blue',
  border: '1px solid blue'
}

const jsx = (
  <div style={box}>
    {/* 属性:静态值用双引号，动态值用花括号;class、for等要特殊处理。 */}
    <img src={logo} style={{ width: 100 }} className="img" />
  </div>
);
```

> css 模块化，创建 index.module.css
>
> ```jsx
> // index.js
> import style from "./index.module.css";
> <img className={style.img} />;
> <img className={`${style.font14} ${style.red}`} />
> ```
>
> 更多 css modules 规则[参考这里](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)

React的样式解决⽅案⼀直是个让⼈诟病的地⽅

#### 样式解决方案

+ [styled-components](https://github.com/styled-components/styled-components)
+ [styled-jsx](https://github.com/zeit/styled-jsx)
+ [classnames](https://github.com/JedWatson/classnames)



## 组件

组件允许你讲 UI 拆分为独立可复用的代码片段，并对每个片段进行独立构思

组件类型
+ 函数组件
+ class 组件



### 函数组件

定义组件最简单的方式就是函数组件，本质上就是 JavaScript 函数

函数组件通常**无状态**，仅**关注内容展示**，返回渲染结果即可

（从 React 16.8 开始引入 **hooks** ，函数组件也能够拥有状态）

```jsx
function Welcome (props) {
  return <h1>Hello, {props.name}</h1>
}
```



#### 组件Props

当 React 元素为用户自定义组件时，它会将 JSX 所接受的属性（attributes）转换为单个对象传递给组件，这个对象被称为 **props**



#### 组件使用

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}

const element = <Welcome name="Sara" msg={'消息'} arr={[1, 2, 3, 4]} obj={{id: 0}} />;
ReactDOM.render(
	element,
	document.getElementById('root')
)
```

**渲染过程分析**

1. 我们调用 `ReactDOM.render()` 函数，传入 `<Welcome name="Sara" />` 作为参数
2. React 调用 `Welcome` 组件，并将 `{name: "Sara"}` 作为 props 传入
3. `Welcome` 组件将 `<h1>Hello, Sara</h1>` 元素作为返回值
4. ReactDOM 将 dom 高效地更新为 `<h1>Hello, Sara</h1>`



#### 组件注意事项

**组件名称必须以大写字母开头**

React 会将以⼩写字⺟开头的组件视为原⽣ DOM 标签。例如， `<div />` 代表 HTML 的 div 标签，⽽ `<Welcome />` 则代表⼀个组件

return的内容只能有⼀个根节点，需要⼀个包裹元素，⽐如使⽤ div，如果相反会多个兄弟元素，不想额外的嵌套，可以使用数组的方法或者 Fragments

**所有 React 组件都必须像纯函数一样保护它们的 props 不被更改**

```jsx
// ---------- 数组方式 ----------
return [<h1 />, <h2 />, <h3 />];

// ----------- Fragments ----------
return (
  <React.Fragment>
    <h1 />
    <h2 />
    <h3 />
  </React.Fragment>
)
// 短语法
return (
  <>
    <h1 />
    <h2 />
    <h3 />
  </>
);

/* 注意：使用显式 <React.Fragment> 语法声明的片段可能具有 key */
<dl>
  {
   props.items.map(item => (
      // 没有 key，React 会报出一个关键警告
     <React.Fragment>
        <dt>{item.term}</dt>
       	<dd>{item.description}</dd>
     </React.Fragment>
   ))
  }
</dl>
```



### class 组件

使用 ES6 的 [class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) 来定义组件，成为 class 组件

class 组件通常拥有 **状态** 和 **生命周期** ，继承于 **Component** ，实现 **render** 方法

```jsx
import React from 'react';

class Welcome extends React.Component {
  // 通过构造函数接受 props，可以省略 constructor
  render () {
    return <h1>Hello, {this.props.name}</h1>;
    // return null;
  }
}
```

`render` 方法直接返回 `null` ，表示不进行任何渲染



### 组件状态管理

如果组件中数据会变化，并影响页面内容，则组件需要拥有状态（state）并维护状态

`props` 是在父组件中指定，而且一经指定，不再改变。对于需要改变的数据，我们需要使用 `state`

state 状态改变，组件会重新调用 render 方法，更新 UI



#### 类组件中

class 组件使用 state 和 setState 维护状态

```jsx
// components/StateMgt.js
import React, { Component } from "react";
export default function StateMgt {
  return (
    <div>
      <Clock />
    </div>
  );
}
```

创建一个 Clock 组件

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    // 使用state属性维护状态，在构造函数中初始化状态
    this.state = { date: new Date() };
  }
  componentDidMount() {
    // 组件挂载时启动定时器每秒更新状态
    this.timerID = setInterval(() => {
      // 使用setState方法更新状态
      this.setState({
        date: new Date()
      });
    }, 1000);
  }
  componentWillUnmount() {
    // 组件卸载时停止定时器
    clearInterval(this.timerID);
  }
  render() {
    return <div>{this.state.date.toLocaleTimeString()}</div>;
  }
}
```

> 扩展：**setState 特性讨论**
>
> - 用 setState 更新状态而不能直接修改
>
>   ```jsx
>   this.state.counter += 1; // error
>   ```

> - state 的更新会被合并：当你调用 `setState()` 的时候，React 会把你提供的对象合并到当前的 state，这里的合并是 **浅合并**

> - setState 通常可能是异步的，
>
>   - 对于多个 `setState` 执行，会合并成一个调用，因此对同一个状态执行多次只起一次作用，多个状态更新合并在一个 `setState` 中进行：
>
>     ```jsx
>     componentDidMount() {
>       // 假如couter初始值为0，执行三次以后其结果是多少?
>       this.setState({counter: this.state.counter + 1});
>       this.setState({counter: this.state.counter + 1});
>       this.setState({counter: this.state.counter + 1});
>
>       console.log(this.state.counter); // 0
>   }
>     ```
>
>   因此如果要获取到最新状态值有以下三种方式：
>
> 1. 传递函数给 setState 方法：可以让 `setState()` 接受一个函数而不是一个对象。这个函数用 **上一个 state** 作为第一个参数，将此次更新被应用时的 props 作为第二个参数
>
>    ```jsx
>    this.setState((state, props) => ({ counter: state.counter + 1 })); // 1
>    this.setState((state, props) => ({ counter: state.counter + 2 })); // 3
>    this.setState((state, props) => ({ counter: state.counter + 3 })); // 6
>
>    console.log(this.state.counter); // 0
>    ```
>
> 2. 使用定时器
>
>    ```jsx
>    setTimeout(() => {
>      console.log(this.state.counter);
>    }, 0);
>    ```
>
> 3. 原生事件中修改状态
>
>    ```jsx
>    componentDidMount(){
>        document.body.addEventListener('click', this.changeValue, false)
>    }
>    changeValue = () => {
>        this.setState({counter: this.state.counter+1})
>        console.log(this.state.counter)
>    }
>    ```
>
>

#### 函数组件中

函数组件通过 Hooks api 进行状态管理

```jsx
import { useState, useEffect } from "react";
function ClockFunc() {
  // useState创建一个状态和修改该状态的函数
  const [date, setDate] = useState(new Date()); // useEffect编写副作用代码
  useEffect(() => {
    // 启动定时器是我们的副作用代码
    const timerID = setInterval(() => {
      setDate(new Date());
    }, 1000);
    // 返回清理函数
    return () => clearInterval(timerID);
  }, []); // 参数2传递空数组使我们参数1函数仅执行一次
  return <div>{date.toLocaleTimeString()}</div>;
}
```



## 事件处理

React 事件的命名采用小驼峰式（camel case），而不是纯小写

使用 jsx 语法时，你需要传入一个函数作为事件处理函数，而不是一个字符串

例如：`onClick={activateLasers}`



范例：用户输入事件，创建 EventHandle.js

```jsx
import React, { Component } from "react";
export default class EventHandle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({ name: e.target.value });
  }
  render() {
    return (
      <div>
        {/* 使用箭头函数，不需要指定回调函数this，且便于传递参数 */}
        {/* <input
          type="text"
          value={this.state.name}
          onChange={e => this.handleChange(e)}
        /> */}
        {/* 直接指定回调函数，需要指定其this指向，或者将回调设置为箭头函数属性 */}
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <p>{this.state.name}</p>
      </div>
    );
  }
}
```

> 事件回调函数注意绑定 this 指向，常见三个方法：
>
> 1. 构造函数中绑定并覆盖：`this.textChange = this.textChange.bind(this)`
> 2. 方法定义为箭头函数：`textChange = () => {}`
> 3. 事件中定义为箭头函数：`onChange={() => this.textChange()}`
>
> react 里面遵循 **单向数据流** ，没有双向绑定，输入框要设置 value 和 onChange，称为 **受控组件**



## 组件通信



#### Props 属性传递

遵循 **单向数据流**

Props 属性传递可用于父子组件相互通信

```jsx
// index.js
ReactDOM.render(<App title="React is Cool" />, document.getElementById("root"));

// App.js
<h2>{this.props.title}</h2>;
```

如果父组件传递的是函数，则可以把子组件信息传入父组件，这个常称为**状态提升**

```jsx
// stateMgt.js
<Clock change={this.onChange} />;

// Clock.js
this.timerID = setInterval(() => {
  this.setState(
    {
      date: new Date()
    },
    () => {
      // 每次状态更新就通知父组件
      this.props.change(this.state.date);
    }
  );
}, 1000);
```



#### context

跨层级组件之间通信

> 主要用于组件库开发中

React 中使用 Context 实现祖代向后代组件跨层级传值。Vue 中的 provide&inject 来源于 context
在 Context 模式下有两个角色

- `Provider`：外层提供数据的组件
- `Consumer`：内层获取数据的组件

  > 函数组件中可以通过 useContext 引入上下文



#### redux

类似 vuex，无明显关系的组件间通信



### 生命周期

React 16.3 之前的生命周期

![react-life-cycle-old](https://tva1.sinaimg.cn/large/006tNbRwly1ga4p60bf68j31050u0gp5.jpg)

范例：验证生命周期，创建 Lfiecycle.js

```jsx
import React, { Component } from "react";
export default class Lifecycle extends Component {
  constructor(props) {
    super(props);
    // 常用于初始化状态
    console.log("1.组件构造函数执行");
  }
  componentWillMount() {
    // 此时可以访问状态和属性，可进行api调用等
    console.log("2.组件将要挂载");
  }
  componentDidMount() {
    // 组件已挂载，可进行状态更新操作
    console.log("3.组件已挂载");
  }
  componentWillReceiveProps(nextProps, nextState) {
    // 父组件传递的属性有变化，做相应响应
    console.log("4.将要接收属性传递");
  }
  shouldComponentUpdate(nextProps, nextState) {
    // 组件是否需要更新，需要返回布尔值结果，优化点
    console.log("5.组件是否需要更新?");
    return true;
  }
  componentWillUpdate() {
    // 组件将要更新，可做更新统计
    console.log("6.组件将要更新");
  }
  componentDidUpdate() {
    // 组件更新
    console.log("7.组件已更新");
  }
  componentWillUnmount() {
    // 组件将要卸载, 可做清理工作
    console.log("8.组件将要卸载");
  }
  render() {
    console.log("组件渲染");
    return <div>生命周期探究</div>;
  }
}
```



## vue 与 react 两个框架的粗略区别对比

Vue 优势：

1. 模板和渲染函数的弹性选择
2. 简单的语法及项目创建
3. 更快的渲染速度和更小的体积

React 优势：

1. 更适用于大型应用和更好的可测试性
2. 同时适用于 Web 端和原生 App
3. 更大的生态圈带来的更多支持和工具

### 相似之处

React 与 Vue 有很多相似之处，React 和 Vue 都是⾮常优秀的框架，它们之间的相似之处多过不同之处，并且它们⼤部分最棒的功能是相通的：如他们都是 JavaScript 的 UI 框架，专注于创造前端的富应⽤。不同于早期的 JavaScript 框架“功能⻬全”，Reat 与 Vue 只有框架的骨架，其他的功能如路由、状态管理等是框架分离的组件

+ 两者都是⽤于创建 UI 的 JavaScript 库
+ 两者都快速轻便
+ 都有基于组件的架构
+ 都是⽤虚拟 DOM
+ 都可放⼊单个 HTML ⽂件中，或者成为更复杂 webpack 设置中的模块
+ 都有独⽴但常⽤的路由器和状态管理库
+ 它们之间的最⼤区别是 Vue 通常使⽤ HTML 模板⽂件，⽽ React 则完全是 JavaScript。Vue 有双向绑定语法糖。

### 不同点

+ Vue 组件分为全局注册和局部注册，在 react 中都是通过 import 相应组件，然后模版中引⽤
+ props 是可以动态变化的，⼦组件也实时更新，在 react 中官⽅建议 props 要像纯函数那样，输⼊输出⼀致对应，⽽且不太建议通过 props 来更改视图
+ ⼦组件⼀般要显式地调⽤ props 选项来声明它期待获得的数据。⽽在 react 中不必需，另外两者都有 props 校验机制
+ 每个 Vue 实例都实现了事件接⼝，⽅便⽗⼦组件通信，⼩型项⽬中不需要引⼊状态管理机制，⽽ react 需要⾃⼰实现
+ 使⽤插槽分发内容，使得可以混合⽗组件的内容与⼦组件⾃⼰的模板
+ 多了指令系统，让模版可以实现更丰富的功能，⽽ React 只能使⽤ JSX 语法
+ Vue 增加的语法糖 computed 和 watch，⽽在 React 中需要⾃⼰写⼀ 套逻辑来实现
+ react 的思路是 all in js，通过 js 来⽣成 html，所以设计了 jsx，还有通过 js 来操作 css，社区的 styled-component、jss 等；⽽ vue 是把 html，css，js 组合到⼀起，⽤各⾃的处理⽅式，vue 有单⽂件组件， 可以把 html、css、js 写到⼀个⽂件中，html 提供了模板引擎来处理
+ react 做的事情很少，很多都交给社区去做，vue 很多东⻄都是内置的，写起来确实⽅便⼀些， ⽐如 redux 的 combineReducer 就对应 vuex 的 modules， ⽐如 reselect 就对应 vuex 的 getter 和 vue 组件 的 computed， vuex 的 mutation 是直接改变的原始数据，⽽ redux 的 reducer 是返回⼀个全新的 state，所以 redux 结合 immutable 来 优化性能，vue 不需要
+ react 是整体的思路的就是函数式，所以推崇纯组件，数据不可变，单向数据流，当然需要双向的地⽅也可以做到，⽐如结合 redux-form，组件的横向拆分⼀般是通过⾼阶组件。⽽ vue 是数据可变的，双向绑定，声明式的写法，vue 组件的横向拆分很多情况下⽤ mixin



# React 16 新特性

## 1. 引言

于 2017.09.26 Facebook 发布 React v16.0 版本，时⾄今⽇已更新到 React v16.12，且引⼊了⼤量的令⼈振奋的新特性，本⽂章将带领⼤家根据 React 更新的时间脉络了解 React16 的新特性



## 2. 概述

**React v16.0**

+ render ⽀持返回数组和字符串、Error Boundaries、createPortal、⽀持⾃定义 DOM 属性、减少⽂件体积、ﬁber

**React v16.1**

+ react-call-return

**React v16.2**

+ Fragment

**React v16.3**

+ createContext, createRef, forwardRef, 生命周期函数的更新，Strict Mode

**React v16.4**

+ Pointer Events, update getDerivedStateFromProps

**React v16.5**

+ Proﬁler；

**React v16.6**

+ memo、lazy、Suspense、static contextType、static getDerivedStateFromError()；

**React v16.7（~Q1 2019）**

+ Hooks；

**React v16.8（~Q2 2019）**

+ Concurrent Rendering；

**React v16.9（~mid 2019）**

+ Suspense for Data Fetching；





















激活更新阶段:App.js

```jsx
class App extends Component {
  state = { prop: "some content" };
  componentDidMount() {
    this.setState({ prop: "new content" });
  }
  render() {
    return (
      <div>
        <Lifecycle prop={this.state.prop} />
      </div>
    );
  }
}
```

激活卸载阶段，App.js

```jsx
class App extends Component {
  state = { prop: "some content" };
  componentDidMount() {
    this.setState({ prop: "new content" });
    setTimeout(() => {
      this.setState({ prop: "" });
    }, 2000);
  }
  render() {
    return <div>{this.state.prop && <Lifecycle prop={this.state.prop} />}</div>;
  }
}
```

### 生命周期探究

#### v16.0 前的生命周期

大部分团队不见得会跟进升到 16 版本，所以 16 前的生命周期还是很有必要掌握的，何况 16 也是基于之前的修改

![lifecycle-x16.0](https://tva1.sinaimg.cn/large/006tNbRwgy1ga7qteebs2j31jk0pok4j.jpg)

#### 1. 组件初始化阶段

第一个是组件初始化(initialization)阶段

也就是以下代码中类的构造方法( constructor() ),Test 类继承了 react Component 这个基类，也就继承这个 react 的
基类，才能有 render(),生命周期等方法可以使用，这也说明为什么 函数组件不能使用这些方法 的原因。

`super(props)` 用来调用基类的构造方法( constructor() ), 也将父组件的 props 注入给子组件，功子组件读取(组件 中 props 只读不可变，state 可变)。 而 constructor() 用来做一些组件的初始化工作，如定义 this.state 的初始内 容。

```jsx
import React, { Component } from "react";
class Test extends Component {
  constructor(props) {
    super(props);
  }
}
```

#### 2. 组件挂载阶段

第二个是组件的挂载(Mounting)阶段
此阶段分为 componentWillMount，render，componentDidMount 三个时期。

- componentWillMount
  在组件挂载到 DOM 前调用，且只会被调用一次，在这边调用 this.setState 不会引起组件重新渲染，也可以把写在这 边的内容提前到 constructor()中，所以项目中很少用
- render
  根据组件的 props 和 state(无两者的重传递和重赋值，论值是否有变化，都可以引起组件重新 render) ，return 一个 React 元素(描述组件，即 UI)，不负责组件实际渲染工作，之后由 React 自身根据此元素去渲染出页面 DOM。render 是纯函数(Pure function:函数的返回结果只依赖于它的参数;函数执行过程里面没有副作用)， 不能在里面执行 this.setState，会有改变组件状态的副作用
- componentDidMount
  组件挂载到 DOM 后调用，且只会被调用一次

#### 3. 组件更新阶段

第三个是组件的更新(update)阶段
在讲述此阶段前需要先明确下 react 组件更新机制。setState 引起的 state 更新或父组件重新 render 引起的 props 更 新，更新后的 state 和 props 相对之前无论是否有变化，都将引起子组件的重新 render

造成组件更新有两类(三种)情况

1. 父组件重新 render
   父组件重新 render 引起子组件重新 render 的情况有两种

   - 直接使用，每当父组件重新 render 导致的重传 props，子组件将直接跟着重新渲染，无论 props 是否有变化
     (可通过`shouldComponentUpdate`方法优化)

   ```jsx
   class Child extends Component {
     shouldComponentUpdate(nextProps) {
       // 应该使用这个方法，否则无论props是否有变化都将会导致组件跟着重新渲染
       if (nextProps.someThings === this.props.someThings) {
         return false;
       }
     }
     render() {
       return <div>{this.props.someThings}</div>;
     }
   }
   ```

   - 在 `componentWillReceiveProps` 方法中，将 props 转换成自己的 state

   ```jsx
   class Child extends Component {
     constructor(props) {
       super(props);
       this.state = {
         someThings: props.someThings
       };
     }
     componentWillReceiveProps(nextProps) {
       // 父组件重传props时就会调用这个方法
       this.setState({ someThings: nextProps.someThings });
     }
     render() {
       return <div>{this.state.someThings}</div>;
     }
   }
   ```

   根据官网的描述

   > 在该函数(componentWillReceiveProps)中调用 this.setState() 将不会引起第二次渲染。

   是因为 componentWillReceiveProps 中判断 props 是否变化了，若变化了，this.setState 将引起 state 变化，从而引
   起 render，此时就没必要再做第二次因重传 props 引起的 render 了，不然重复做一样的渲染了。

2. 组件本身调用 setState，无论 state 有没有变化。
   (可通过 shouldComponentUpdate 方法优化)

   ```jsx
   class Child extends Component {
     constructor(props) {
       super(props);
       this.state = {
         someThings: 1
       };
     }
     shouldComponentUpdate(nextStates) {
       // 应该使用这个方法，否则无论state是否有变化都将会导致组件 重新渲染
       if (nextStates.someThings === this.state.someThings) {
         return false;
       }
     }
     handleClick = () => {
       // 虽然调用了setState ，但state并无变化 const preSomeThings = this.state.someThings
       this.setState({
         someThings: preSomeThings
       });
     };
     render() {
       return <div onClick={this.handleClick}>{this.state.someThings}</div>;
     }
   }
   ```

   **此阶段分为 componentWillReceiveProps，shouldComponentUpdate， componentWillUpdate，render，componentDidUpdate**

   - `componentWillReceiveProps(nextProps)`
     此方法只调用于 props 引起的组件更新过程中，参数 nextProps 是父组件传给当前组件的新 props。但父组件 render 方法的调用不能保证重传给当前组件的 props 是有变化的，所以在此方法中根据 nextProps 和 this.props 来查明重传 的 props 是否改变，以及如果改变了要执行啥，比如根据新的 props 调用 this.setState 出发当前组件的重新 render
   - `shouldComponentUpdate(nextProps, nextState)`
     此方法通过比较 nextProps，nextState 及当前组件的 this.props，this.state，返回 true 时当前组件将继续执行更新
     过程，返回 false 则当前组件更新停止，以此可用来减少组件的不必要渲染，优化组件性能。

     ps:这边也可以看出，就算 componentWillReceiveProps()中执行了 this.setState，更新了 state，但在 render 前 (如 shouldComponentUpdate，componentWillUpdate)，this.state 依然指向更新前的 state，不然 nextState 及当前组件的 this.state 的对比就一直是 true 了。

   - `componentWillUpdate(nextProps, nextState)`
     此方法在调用 render 方法前执行，在这边可执行一些组件更新发生前的工作，一般较少用。
   - `render render`
     方法在上文讲过，这边只是重新调用。
   - `componentDidUpdate(prevProps, prevState)`
     此方法在组件更新后被调用，可以操作组件更新的 DOM，prevProps 和 prevState 这两个参数指的是组件更新前的 props 和 state

#### 4. 卸载阶段

此阶段只有一个生命周期方法 componentWillUnmount
此方法在组件被卸载前调用，可以在这里执行一些清理工作，比如清楚组件中使用的定时器，清楚 componentDidMount 中手动创建的 DOM 元素等，以避免引起内存泄漏。

### React(16.4)生命周期![react-lifecycle-16.4](https://tva1.sinaimg.cn/large/006tNbRwgy1ga7qsat9mkj31in0u0adr.jpg)

#### 变更缘由

原来(React v16.0 前)的生命周期在 React v16 推出的 Fiber 之后就不合适了，因为如果要开启 async rendering，
在 render 函数之前的所有函数，都有可能被执行多次

原来(React v16.0 前)的生命周期有哪些是在 render 前执行的呢?

- omponentWillMount
- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate

如果开发者开了 async rendering，而且又在以上这些 render 前执行的生命周期方法做 AJAX 请求的话，那 AJAX 将被 无谓地多次调用。。。明显不是我们期望的结果。而且在 componentWillMount 里发起 AJAX，不管多快得到结果 也赶不上首次 render，而且 componentWillMount 在服务器端渲染也会被调用到(当然，也许这是预期的结 果)，这样的 IO 操作放在 componentDidMount 里更合适。

禁止不能用比劝导开发者不要这样用的效果更好，所以除了 shouldComponentUpdate，其他在 render 函数之前的 所有函数(componentWillMount，componentWillReceiveProps，componentWillUpdate)都被 getDerivedStateFromProps 替代。

也就是用一个静态函数 getDerivedStateFromProps 来取代被 deprecate 的几个生命周期函数，就是强制开发者在 render 之前只做无副作用的操作，而且能做的操作局限在根据 props 和 state 决定新的 state

React v16.0 刚推出的时候，是增加了一个 componentDidCatch 生命周期函数，这只是一个增量式修改，完全不影 响原有生命周期函数;但是，到了 React v16.3，大改动来了，引入了两个新的生命周期函数。

**新引入了两个新的生命周期函数: `getDerivedStateFromProps` `getSnapshotBeforeUpdate`**

#### getDerivedStateFromProps

`static getDerivedStateFromProps(props, state)` 在组件创建时和更新时的 render 方法之前调用，它应该返回
一个对象来更新状态，或者返回 null 来不更新任何内容。

getDerivedStateFromProps 本来(React v16.3 中)是只在创建和更新(由父组件引发部分)，也就是不是由父
组件引发，那么 getDerivedStateFromProps 也不会被调用，如自身 setState 引发或者 forceUpdate 引发。

![reactlifecycle-16.3](https://tva1.sinaimg.cn/large/006tNbRwgy1ga7qsv0selj30ue0igjtf.jpg)

这样的话理解起来有点乱，在 React v16.4 中改正了这一点，让 getDerivedStateFromProps 无论是 Mounting 还是 Updating，也无论是因为什么引起的 Updating，全部都会被调用，具体可看 React v16.4 的生命周期图。

#### getSnapshotBeforeUpdate

**getSnapshotBeforeUpdate()** 被调用于 render 之后，可以读取但无法使用 DOM 的时候。它使您的组件可以在可 能更改之前从 DOM 捕获一些信息(例如滚动位置)。此生命周期返回的任何值都将作为参数传递给 componentDidUpdate()

官网例子

```jsx
class ScrollingList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    //我们是否要添加新的 items 到列表?
    // 捕捉滚动位置，以便我们可以稍后调整滚动.
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    //如果我们有snapshot值, 我们已经添加了 新的items.
    // 调整滚动以至于这些新的items 不会将旧items推出视图。
    // (这边的snapshot是 getSnapshotBeforeUpdate方法的返回值)
    if (snapshot !== null) {
        const list = this.listRef.current;
        list.scrollTop = list.scrollHeight - snapshot;
      }
  }
  render() {
    return (
      <div ref={this.listRef}>{/* ...contents... */}</div>
    );
}
```

#### 高阶组件

为了提高组件复用率，可测试性，就要保证**组件功能单一性**；但是若要满足复杂需求就要扩展功能单一的组件，在 React 中就有了 HOC(Higher-Order Components)的概念，**高阶组件是一个工厂函数，它接受一个组件并返回另一个组件**







# React 组件开发

+ 目标
  + 掌握组件化开发中多种实现技术
+ 知识要点
  1. 组件跨层级通信 - context --- React 16.3
  2. 高阶组件 -HOC
  3. 组建复合 - Composition
     1. Hooks API --- React 16.7
+ 资源
  + [context](https://reactjs.org/docs/context.html)
  + [hoc](https://reactjs.org/docs/higher-order-components.html)
  + [hooks](https://zh-hans.reactjs.org/docs/hooks-intro.html)



## 使用 Context

1. 创建 Context
2. 获取 Provider 和 Consumer
3. Provider 提供值
4. Consumer 消费值



例子：模拟 redux 存放全局状态，在组件间共享

```jsx
import React from "react";
// 创建上下⽂
const Context = React.createContext();
// 获取Provider和Consumer
const Provider = Context.Provider;
const Consumer = Context.Consumer;

// Child显示计数器，并能修改它，多个Child之间需要共享数据
function Child (props) {
  return <div onClick={() => props.add()}>{props.counter} </div>;
}

export default class ContextTest extends React.Component {
  // state是要传递的数据
  state = { counter: 0 };
  // add⽅法可以修改状态
  add = () => {
    this.setState(nextState => ({
      counter: nextState.counter + 1
    }));
  };
  // counter状态变更
  render () {
    return (
      <Provider value={{ counter: this.state.counter, add: this.add }}>
        {/* Consumer中内嵌函数，其参数是传递的数据，返回要渲染的组 件 */}
        {/* 把value展开传递给Child */}
        <Consumer>{value => <Child {...value} />}</Consumer>
        <Consumer>{value => <Child {...value} />}</Consumer>
      </Provider>
    );
  }
}
```

> 函数组件中可以通过 useContext 引入上下文，在 hooks 部分介绍



## 扩展：Context API

+ `React.createContext(defaultValue)`
  + 返回带有 Provider 组件 Consumer 组件的对象
+ `Context.Provider`
  + 组件是数据的发布方，一般在组件树的上层并接受一个数据的初始值
+ `Class.contextType`
  + 挂载在 class 上的 `contextType` 属性会被 **重赋值** 为一个由 `React.createContext()` 创建的 Context 对象。这能让你使用 `this.context` 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。
+ `Context.Consumer`
  + 组件是数据的订阅方，它的 props.children 是一个函数，接受被发布的数据，并且返回 React Element
  + 能让你在 函数式组件 中完成订阅 Context
  + 这个函数接收当前的 context 值，返回一个 React 节点。传递给函数的 `value` 值等同于往上组件树离这个 context 最近的 Provider 提供的 `value` 值，如果没有对应的 Provider，`value` 参数等同于传递给 `createContext` 和 `defaultValue`

例子 - contextType

```jsx
import React, { Component } from "react";

const Context = React.createContext({
  name: 'React',
  foo: 'bar'
});
// 在组件中使⽤contextType,获取Context的默认值
class Child extends Component {
  // static contextType = Context; 实验性的语法
  render () {
    return (<div>{this.context.name}</div>)
  }
}
Child.contextType = Context;
function App () {
  // Child不能为函数组件，因为contextType只能挂载到class组件
  return <Child />
}

export default App
```



## 高阶组件HOC

高阶组件（HOC: Higher-Order Components）是 React 中用于复用组件逻辑的一种高级技巧。HOC 本身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。

**高阶组件是一个工厂函数，参数为组件，返回值为新组件的函数**

为了提高组件复用率，可测试性，就要保证 **组件功能单一性**；但是如要满足复杂需求就要扩展功能单一的组件，所以在 React 中就有了 HOC 的概念。

### 基本使用

例子：为展示组件添加获取数据的能力

```jsx
import React from 'react'

// Lesson 保证功能的单一，它不关心数据来源，只负责展示
function Lesson (props) {
  return (
    <div>
      {props.stage} - {props.title}
    </div>
  )
}

// 模拟数据
const lessons = [
  { stage: 'React', title: '核心API' },
  { stage: 'React', title: '组件化1' },
  { stage: 'React', title: '组件化2' }
]

// 高阶组件 withContent 负责包装传入组件 Comp
// 包装后组件能够根据传入索引获取课程数据，真实案例中可以通过 api 查询得到
const withContent = Comp => props => {
  const content = lessons[props.idx];

  // {...props} 将属性展开传递下去
  return <Comp {...content} />
}

// LessonWithContent 是包装后的组件
const LessonWithContent = withContent(Lesson);

export default function HocTest () {
  // HocTest 渲染三个 LessonWithContent 组件
  return (
    <div>
      {[0, 0, 0].map((item, idx) => (
        <LessonWithContent idx={idx} key={idx} />
      ))}
    </div>
  )
}
```



例子：改造一下前面案例使用上下文更优雅

```jsx
import React, { Component } from 'react'
// 创建上下⽂
const Context = React.createContext();
// 获取Provider和Consumer
const Provider = Context.Provider;
const Consumer = Context.Consumer;

// withConsumer 是一个高级组件工厂，它能根据配置返回一个高阶组件
function withConsumer (Consumer) {
  return Comp => props => {
    return <Consumer>{value => <Comp {...value} {...props} />}</Consumer>
  }
}
// Child显示计数器，并能修改它，多个Child之间需要共享数据
// 新的Child是通过withConsumer(Consumer)返回的⾼阶组件包装所得
const Child = withConsumer(Consumer)(function (props) {
  return (
    <div onClick={() => props.add()} title={props.name} > {props.counter}</div>
  )
})

export default class ContextTest extends Component {
  // state是要传递的数据
  state = { counter: 0 };
  // add⽅法可以修改状态
  add = () => {
    this.setState(nextState => ({
      counter: nextState.counter + 1
    }));
  };
  render () {
    return (
      <Provider value={{ counter: this.state.counter, add: this.add }}>
        {/* 改造过的 Child 可以自动从 Consumer 中获取数据，直接用就好了 */}
        <Child name="foo" />
        <Child name="bar" />
      </Provider>
    )
  }
}
```



### 链式调用

高阶组件最巧妙的一点，就是可以链式调用

```jsx
// 高阶组件 withLog 负责包装传入组件 Comp
// 包装后组件在挂载时可以输出日志记录
const widthLog = Comp => {
  // 返回组件需要生命周期，因此声明为 class 组件
  return class extends React.Component {
    render () {
      return <Comp {...this.props} />
    }
    componentDidMount (){
    	console.log('DidMount', this.props);
    }
  }
}

// LessonWithContent 是包装后的组件
const LessonWithContent = withLog(withContent(Lesson));
```



### 装饰器写法

高阶组件本身就是对装饰器模式的应用，自然可以利用 ES7 中出现的装饰器语法来更优雅的书写代码

CRA项目中默认不支持 js 代码使用装饰器语法，可修改后缀名为 tsx 则可以直接支持

```jsx
// 装饰器只能用在 class 组件上
// 执行顺序从下到上
@withlog
@withContent
class Lesson2 extends React.Component {
  render () {
    return (
    	<div>
      	{this.props.stage} - {this.props.title}
      </div>
    )
  }
}
export default function HocTest () {
  // 这里使用 Lesson2
  return (
  	<div>
    	{[0, 0, 0].map((item, idx) => {
        <Lesson2 idx={idx} key={idx} />
      })}
    </div>
  )
}
```

> 注意修改App.js中引入部分，添加一个后缀名
>
> 要求CRA版本高于2.1.0



## 组件复合 - Composition

复合组件给与你⾜够的敏捷去定义⾃定义组件的外观和⾏为，这种⽅式更 明确和安全。如果组件间有公⽤的⾮UI逻辑，将它们抽取为JS模块导⼊使⽤⽽不是继承它。



### 组件复合

例子：Dialog 组件负责展示，内容从外部传入

components/Composition.js

```jsx
import React from 'react'

// Dialog 定义组件外观和行为
function Dialog (props) {
  return <div style={{ border: '1px solid blue' }}>{props.children}</div>
}

export default function Composition () {
  return (
    <div>
      {/* 传入显示内容 */}
      <Dialog>
        <h1>组件复合</h1>
        <p>复合组件给与你足够的敏捷去定义自定义组建的外观和行为</p>
      </Dialog>
    </div>
  )
}
```

> 类似 vue 中的默认插槽，所以如果要实现具名插槽该如何做？



### children 到底是什么

children 可以是任意 js 表达式

例子：传个对象进去，key 表示具名插槽

```jsx
import React from 'react'

// Dialog 定义组件外观和行为
function Dialog (props) {
  return (
    <div style={{ border: '1px solid blue' }}
      {props.children.default}
      <div>{props.children.footer}</div>
    </div>
  )
}

export default function Composition () {
  return (
    <div>
      {/* 传入显示内容 */}
      <Dialog>
        {{
          default: (
            <>
              <h1>组件复合</h1>
              <p>复合组件给与你足够的敏捷去定义自定义组建的外观和行为</p>
            </>
          ),
          footer: <button onClick={() => alert('react is cool')}>确定</button>
        }}
      </Dialog>
    </div>
  )
}
```

> 这些内容也完全可以作为属性传入

如果传入的是函数，还可以实现 **作用域插槽** 的功能

```jsx
import React from 'react'

// Dialog 定义组件外观和行为
function Dialog (props) {
  // 备选消息
  const message = {
    'foo': { title: 'foo', content: 'foo-' },
    'bar': { title: 'bar', content: 'bar-' }
  }
  // 执行函数获得要显示的内容
  const { body, footer } = props.children(message[props.msg]);
  return (
    <div style={{ border: '1px solid blue' }}>
      {/* 此处显示的内容是动态生成的 */}
      {body}
      <div>{footer}</div>
    </div>
  )
}

export default function Composition () {
  return (
    <div>
      {/* 执行显示的消息的 key */}
      <Dialog msg="foo">
        {/* 修改为函数形式，根据传入值生成最终内容 */}
        {
          ({ title, content }) => ({
            body: (
              <>
                <h1>{title}</h1>
                <p>{content}</p>
              </>
            ),
            footer: (
              <button onClick={() => alert('react is cool')}>Click</button>
            )
          })
        }
      </Dialog>
    </div>
  )
}
```





## Hooks

[Hook](https://reactjs.org/docs/hooks-overview.html) 是 React 16.8 一个新增项，它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

Hooks 的特点：

+ 使你在无需修改组件结构的情况下复用状态逻辑
+ 可将组建中相互关联的部分拆分成更小的函数，复杂组件将变得更容易理解
+ 更简洁、更易理解的代码



### 准备工作

+ 升级 react、react-dom

  ```shell
  npm i react react-dom -S
  ```



### 状态钩子 State Hook

+ 创建 HooksTest.js

  ```jsx
  import React, { useState } from 'react'

  export default function HooksTest () {
    // useState(initialState)，
    // 接收初始状态，返回⼀个由状态和其更新函数组成的数组
    const [fruit, setFruit] = useState('');
    return (
      <div>
        <p>{fruit === '' ? '请选择喜欢的水果：' : `您的选择是：${fruit}`}</p>
      </div>
    )
  }
  ```

> 更新函数类似 setState，但它不会整合新旧状态

+ 声明多个状态变量

  ```jsx
  import React, { useState } from 'react'

  // 声明列表组件
  function FruitList ({ fruits, onSetFruit }) {
    return (
      <ul>
        {fruits.map(f => (
          <li key={f} onClick={() => onSetFruit(f)}>{f}</li>
        ))}
      </ul>
    )
  }

  export default function HooksTest () {
    // 初始化数组状态
    const [fruits, setFruits] = useState(['香蕉', '西瓜']);
    return (
      <div>
        {/* 添加列表组件 */}
        <FruitList fruits={fruits} onSetFruit={setFruits} />
      </div>
    )
  }
  ```

+ 用户处理输入

  ```jsx
  import React, { useState } from 'react'

  // 声明列表组件
  function FruitList ({ fruits, onSetFruit }) {
    return (
      <ul>
        {fruits.map(f => (
          <li key={f} onClick={() => onSetFruit(f)}>{f}</li>
        ))}
      </ul>
    )
  }

  // 声明输入组件
  function FruitAdd (props) {
    // 输⼊内容状态及设置内容状态的⽅法
    const [pname, setPname] = useState('');
    // 键盘事件处理
    const onAddFruit = e => {
      if (e.key === 'Enter') {
        props.onAddFruit(pname);
        setPname('');
      }
    }
    return (
      <div>
        <input type="text" value={pname}
          onChange={e => setPname(e.target.value)}
          onKeyDown={onAddFruit}
        />
      </div>
    )
  }

  export default function HooksTest () {
    // 初始化数组状态
    const [fruits, setFruits] = useState(['香蕉', '西瓜']);
    return (
      <div>
        {/* 添加水果组件 */}
        <FruitAdd onAddFruit={pname => setFruits([...fruits, pname])} />
        {/* 添加列表组件 */}
        <FruitList fruits={fruits} onSetFruit={setFruits} />
      </div>
    )
  }
  ```



### 副作用钩子 Effect Hook

`useEffect` 给函数组件增加了执行副作用操作的能力

**副作用（Side Effect）** 是指一个函数做了和本身运算返回值无关的事，比如：修改了全局变量、修改了传入的参数、甚至是 console.log() 也算，所以 ajax 操作，修改 dom 都算作副作用

+ 异步数据获取，更新 HooksTest.js

  ```jsx
  import { useEffect } from 'react';

  useEffect(() => {
    setTimeout(() => {
      setFruits(['香蕉', '西瓜'])
    }, 1000)
  })
  ```

  > 测试发现副作用的操作会被频繁调用

+ 设置依赖

  设置空数组意为没有依赖，则副作用操作仅执行一次

  ```jsx
  useEffect(() => {...}, [])
  ```

  > 如果副作用操作对某状态有依赖，务必添加依赖选项
  >
  > ```jsx
  > useEffect(() => {
  >   document.title = fruit
  > }, [fruit])
  > ```

+ 清除工作

  有一些副作用是需要清除的，清除工作非常重要，可以防止引起内存泄漏

  ```jsx
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('msg')
    }, 1000);
    return function () {
      clearInterval(timer)
    }
  }, [])
  ```

  > 组件卸载后会执行返回的清理函数



### useReducer

useReducer 是 useState 的可选项，常用于组件有复杂状态逻辑时，类似于 redux 中 reducer 概念

+ 商品列表状态维护

  ```jsx
  import React, { useState, useReducer, useEffect } from 'react'

  // 添加 fruit 状态维护 fruitReducer
  function fruitReducer (state, action) {
    switch (action.type) {
      case 'init':
        return action.payload;
      case 'add':
        return [...state, action.payload];
      default:
        return state;
    }
  }

  // 声明列表组件
  function FruitList ({ fruits, onSetFruit }) {
    return (
      <ul>
        {fruits.map(f => (
          <li key={f}>{f}</li>
        ))}
      </ul>
    )
  }

  // 声明输入组件
  function FruitAdd (props) {
    // 输⼊内容状态及设置内容状态的⽅法
    const [pname, setPname] = useState('');
    // 键盘事件处理
    const onAddFruit = e => {
      if (e.key === 'Enter') {
        props.onAddFruit(pname);
        setPname('');
      }
    }
    return (
      <div>
        <input type="text" value={pname}
          onChange={e => setPname(e.target.value)}
          onKeyDown={onAddFruit}
        />
      </div>
    )
  }

  export default function HooksTest () {
    // 初始化数组状态
    // const [fruits, setFruits] = useState(['香蕉', '西瓜']);
    const [fruits, dispatch] = useReducer(fruitReducer, [])

    useEffect(() => {
      setTimeout(() => {
        dispatch({ type: 'init', payload: ['香蕉', '西瓜'] })
      }, 1000);
    }, [])
    return (
      <div>
        {/* 添加水果组件 */}
        <FruitAdd onAddFruit={pname => dispatch({ type: 'add', payload: pname })} />
        {/* 列表组件 */}
        <FruitList fruits={fruits} />
      </div>
    )
  }
  ```



### useContext

useContext 用于在快速在函数组件中导入上下文。

```jsx
import React, { useState, useReducer, useEffect, useContext } from 'react'

// 创建上下文
const Context = React.createContext();


// 添加 fruit 状态维护 fruitReducer
function fruitReducer (state, action) {
  switch (action.type) {
    case 'init':
      return action.payload;
    case 'add':
      return [...state, action.payload];
    default:
      return state;
  }
}

// 声明列表组件
function FruitList ({ fruits, onSetFruit }) {
  return (
    <ul>
      {fruits.map(f => (
        <li key={f}>{f}</li>
      ))}
    </ul>
  )
}

// 声明输入组件
function FruitAdd (props) {
  // 输⼊内容状态及设置内容状态的⽅法
  const [pname, setPname] = useState('');
  const { dispatch } = useContext(Context);
  // 键盘事件处理
  const onAddFruit = e => {
    if (e.key === 'Enter') {
      // 直接派发动作修改状态
      dispatch({ type: 'add', payload: pname })
      setPname('');
    }
  }
  return (
    <div>
      <input type="text" value={pname}
        onChange={e => setPname(e.target.value)}
        onKeyDown={onAddFruit}
      />
    </div>
  )
}

export default function HooksTest () {
  // 初始化数组状态
  // const [fruits, setFruits] = useState(['香蕉', '西瓜']);
  const [fruits, dispatch] = useReducer(fruitReducer, [])

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'init', payload: ['香蕉', '西瓜'] })
    }, 1000);
  }, [])
  return (
    // 提供上下文的值
    <Context.Provider value={{ fruits, dispatch }}>
      {/* 添加水果组件 */}
      <FruitAdd />
      {/* 列表组件 */}
      <FruitList fruits={fruits} />
    </Context.Provider>
  )
}
```



### Hook 相关扩展

1. 基于 useReducer 的方式能否处理异步 action
2. [Hook 规则](https://zh-hans.reactjs.org/docs/hooks-rules.html)
3. [自定义 Hook](https://zh-hans.reactjs.org/docs/hooks-custom.html)
4. 一些 NB 的 [实现](https://github.com/streamich/react-use)



# React 组件开发2

## 要点

+ 使用 antd
+ 设计并实现表单控件
+ 实现树最贱
+ 使用 PureCompnent
+ 使用 Memo

## 资源

[ant-design](https://ant.design/index-cn)



## 使用第三方组件

安装：`npm install antd --save`

例子：使用 ant-design 组件库

```jsx
import React, { Component } from 'react'
import Button from 'antd/lib/button'
import 'antd/dist/antd.css'

export default class App extends Component {
  render () {
    return (
      <div className="App">
        <Button type="primary">Button</Button>
      </div>
    )
  }
}
```



## 配置按需加载

安装 `react-app-rewired` 取代 `react-scripts`, 可以扩展 webpack 的配置，类似 vue.config.js

+ react-app-rewired：一个对 create-react-app 进行自定义配置的社区解决方案
+ customize-cra：是 react-app-rewired 的依赖
+ babel-plugin-import：按需加载组件代码和样式的 babel 插件

```shell
npm i react-app-rewired customize-cra babel-plugin-import -D
```

```js
// 根目录创建 config-overrides.js
const { override, fixBabelImports } = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  })
)
```

修改 package.json

```json
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
  "eject": "react-app-rewired eject"
}
```

支持装饰器配置

```shell
npm i @babel/plugin-proposal-decorators -D
```

```js
// config-overrides.js
const { addDecoratorsLegacy } = require("customize-cra");

module.exports = override(
  ...,
  addDecoratorsLegacy()
);
```



## 表单组件设计与实现

### antd 表单使用

```jsx
import React from 'react'
import { Form, Icon, Input, Button } from 'antd';
import 'antd/dist/antd.css'

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm
```



### 表单组件设计思路

+ 表单组件要求实现 **数据收集、校验、提交** 等特性，可通过高阶组件扩展
+ 高阶组件给组件传递一个 input 组件 **包装函数** 接管其输入事件并统一管理表单数据
+ 高阶组件给表单组件传递一个 **校验函数** 使其具备数据校验功能



### 表单组件实现

+ 表单基本结构，创建 ./components/KFormTest.js

  ```jsx
  import React, { Component } from "react";

  export default class FormTest extends Component {
    render () {
      return (<div>
        <Input type="text" />
        <Input type="password" />
        <Button>登录</Button> </div>
      )
    }
  }
  ```

+ 高阶组件 kFormCreate：扩展现有表单 ./components/FormTest.js

  ```jsx
  // 2.扩展表单的⾼阶组件，提供输⼊控件包装、事件处理、表单校验等
  function formCreate (Comp) {
    return class extends React.Component {
      constructor(props) {
        super(props);
        this.options = {}; // 各字段选项
        this.state = {}; // 各字段值
      }

      handleChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value }, () => {
          // 校验:注意回调中调⽤
        });
      };

      // 返回包装输⼊控件的⾼阶组件，代理其事件处理、赋值等操作
      // field字段名，options选项，InputComp输⼊控件
      getFieldDec = (field, option) => {
        this.options[field] = option;
        return InputComp => (
          <div>
            {/* 由React.createElement⽣成的元素不能修改，需要 克隆⼀份再扩展 */}
            {React.cloneElement(InputComp, {
              name: field, // 控件name
              value: this.state[field] || "", // 控件值
              onChange: this.handleChange // 控件change事件 处理
            })}
          </div>
        );
      };
      render () {
        return (
          <div> <Comp {...this.props} getFieldDec={this.getFieldDec} />
          </div>
        );
      }
    };
  }
  ```

+ 应用高阶组件

  ```jsx
  @formCreate
  class FormTest extends Component {
    onSubmit = () => {
      console.log('submit')
    };
    render () {
      // 解构出扩展的方法
      const { getFieldDec } = this.props;
      return (
        <div>
          {getFieldDec("uname", {
            rules: [{ required: true, message: "请输⼊⽤户 名" }]

          })(<input type="text" />)}
          {getFieldDec("pwd", {
            rules: [{
              required: true, message: "请输⼊密码"
            }]
          })(<input type="password" />)}
          <button onClick={this.onSubmit}>登录</button>
        </div>
      )
    }
  }

  export default FormTest
  ```

+ 添加校验功能

  ```jsx
  // 2.扩展表单的⾼阶组件，提供输⼊控件包装、事件处理、表单校验等
  function formCreate (Comp) {
    return class extends React.Component {
      constructor(props) {
        super(props);
        this.options = {}; // 各字段选项
        this.state = {}; // 各字段值
      }
      handleChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value }, () => {
          // 校验:注意回调中调⽤
          this.validateField(name)
        });
      };
      // 校验指定字段
      validateField = field => {
        const rules = this.options[field].rules; // 获取校 验规则
        // 只要有任何⼀项校验失败就返回true跳出，对返回值取反表示 校验失败
        const ret = !rules.some(rule => {
          if (rule.required) { // 仅验证必填项
            if (!this.state[field]) { // 校验失败 this.setState({ // 错误信息设置 [field + "Message"]: rule.message });
              return true; // 若有校验失败，返回true
            }
          }
        });
        // 若校验成功，清除错误信息
        if (ret) this.setState({
          [field + "Message"]: ""
        });
        return ret;
      };
      // 校验全部字段
      validate = cb => {
        // 将选项中所有field组成的数组转换为它们校验结果数组
        const rets = Object.keys(this.options).map(field => {
          return this.validateField(field);
        });
        // 校验结果中每⼀项都要求true
        const ret = rets.every(v => v == true);
        cb(ret, this.state);
      };
      // 返回包装输⼊控件的⾼阶组件，代理其事件处理、赋值等操作
      // field字段名，options选项，InputComp输⼊控件
      getFieldDec = (field, option) => {
        this.options[field] = option;
        return InputComp => (
          <div>
            {/* 由React.createElement⽣成的元素不能修改，需要 克隆⼀份再扩展 */}
            {React.cloneElement(InputComp, {
              name: field, // 控件name
              value: this.state[field] || "", // 控件值
              onChange: this.handleChange // 控件change事件 处理
            })}
          </div>
        );
      };
      render () {
        return (
          <div>
            <Comp
              {...this.props}
              getFieldDec={this.getFieldDec}
              validate={this.validate} // 添加校验属性
            />
          </div>
        );
      }
    }
  }
  ```

+ 调用校验函数

  ```jsx
  @formCreate
  class FormTest extends Component {
    onSubmit = () => {
      // 校验，提交
      this.props.validate((isValid, data) => {
        if (isValid) {
          console.log('提交登录', data)
        } else {
          alert('校验失败')
        }
      })
    };
  	render() { ... }
  }

  export default FormTest;
  ```



### 扩展

尝试实现 Form（布局，提交），FormItem（错误信息），Input（前缀图标）

```jsx
// FormItem组件定义
import React, { Component } from 'react'

class FormItem extends Component {
  render () {
    return (
      <div className="formItem">
        {this.props.children}
        {this.props.validateStatus === "error" && (
          <p style={{ color: "green" }}>
            {this.props.help}
          </p>
        )}
      </div>
    );
  }
}

// kFormCreate中扩展touch判断、错误获取功能
getFieldDec = (field, option, InputComp) => {
  // ...
  {
    React.cloneElement(InputComp, {
      onFocus: this.handleFocus
    })
  }
  // ...
};

handleFocus = e => {
  const field = e.target.name;
  this.setState({
    [field + "Focus"]: true
  });
};
isFieldTouched = field => {
  return !!this.state[field + "Focus"];
};

getFieldError = field => {
  return this.state[field + "Message"];
};

render() {
  return (
    <Comp
      // ...
      isFieldTouched={this.isFieldTouched}
      getFieldError={this.getFieldError}
    />
  );
}
// 使⽤FormItem
render() {
  const { isFieldTouched, getFieldError } = this.props;
  const unameError = isFieldTouched("uname") && getFieldError("uname");
  return (
    <div>
      <FormItem
        validateStatus={unameError ? "error" : ""}
        help={unameError || ""}>
        {/* ... */}
      </FormItem >
    </div>
  );

}

// KInput实现
class KInput extends Component {
  render () {
    const { name, onChange, value, type, prefix, onFocus } = this.props;
    return (<div>
      {prefix}
      <input name={name} type={type} onChange={onChange}
        value={value} onFocus={onFocus} />
    </div>
    );
  }
}
// 使⽤
<KInput
  type="text"
  prefix={
    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}></Icon>
  }
/>
```





# React - Redux

## 要点

1. 掌握 redux
2. 掌握 redux 中间件
3. 实现 redux 及其中间件原理



## 概念

Redux 是一个用来管理数据状态的 JavaScript 应用工具，它保证程序行为一致性且易于测试

### **集成 redux 的效果**

![redux](https://tva1.sinaimg.cn/large/006tNbRwly1gaafw4vbgbj312q0nswsl.jpg)

从图中可以看出，如果不⽤Redux，我们要传递state是⾮常麻烦的。 Redux中，可以把数据先放在数据仓库（store-公⽤状态存储空间）中，这⾥可以统⼀管理状态，然后哪个组件⽤到了，就去stroe中查找状态。如果途中的紫⾊组件想改变状态时，只需要改变 store 中的状态，然后其他组件就会跟着中的⾃动进⾏改变。

### 工作流程

![redux](https://tva1.sinaimg.cn/large/006tNbRwly1gaafxvemiqj31e60s8q6c.jpg)



## Redux 快速上手

redux 较难上手，是因为上来就有太多的概念需要学习，用一个累加器举例

1. 需要一个 store 来存储数据
2. store 里的 reducer 初始化 state 并定义 state 修改规则
3. 通过 dispatch 一个 action 来提交对数据的修改
4. action 提交到 reducer 函数里，根据传入的 action 的 type，返回新的 state



### 安装 Redux

```shell
npm i redux -S
```

1. 创建 store

   ```jsx
   import { createStore } from 'redux'

   const store = createStore();

   export default store
   ```

2. 创建 reducer，帮助 store 管理更新状态

   ```jsx
   import { createStore } from 'redux'

   const counterReducer = (state = 0, action) => {
     return state;
   }
   const store = createStore(counterReducer);

   export default store
   ```

3. getState 获取 store 状态

   ```jsx
   import React, { Component } from 'react'
   import store from './store'

   export default class Counter extends Component {
     render () {
       return (
         <div>
           <p>{store.getState()}</p>
         </div>
       )
     }
   }
   ```

4. 派发 dispatch，通过 action type 描述具体行为

   ```jsx
   import React, { Component } from 'react'
   import store from './store'

   export default class Counter extends Component {
     render () {
       return (
         <div>
           <p>{store.getState()}</p>
           <button onClick={() => store.dispatch({ type: 'add' })}>Add</button>
           <button onClick={() => store.dispatch({ type: 'minus' })}>Minus</button>
         </div>
       )
     }
   }
   ```

5. reducer 接受 action，通过 type 指定行为

   ```jsx
   import { createStore } from 'redux'

   const counterReducer = (state = 0, action) => {
     switch (action.type) {
       case 'add':
         return state + 1;
       case 'minus':
         return state - 1;
       default:
         return state;
     }
   }

   const store = createStore(counterReducer);

   export default store
   ```

   > 点击按钮不能更新，因为没有订阅状态变更

   订阅状态变更，index.js

   ```jsx
   // ===== 根组件 =====
   // ...
   import store from './components/ReduxTest/store'

   const render = () => {
     ReactDOM.render(<Counter />, document.getElementById('root'));
   }
   render()

   store.subscribe(render)

   // ===== 组件内 =====
   componentDidMount () {
     store.subscribe(() => this.forceUpdate())
   }
   ```



## 检查点

1. createStore 创建 store
2. reducer 初始化、修改状态函数
3. getState 获取状态值
4. dispatch 提交更新
5. subscribe 变更订阅



### 再看工作流程

![redux](https://tva1.sinaimg.cn/large/006tNbRwly1gaafxvemiqj31e60s8q6c.jpg)

### 梳理

+ redux 是一个存储状态，响应事件动作(action)的地⽅，所以定义 redux 实现的叫 store
+ store有⼀个初始状态(default state)，还有响应某个动作(action)的处理器(reducer)
+ 然后UI视图将这个store及其状态(state)和⽅法(action)注册到视图组件的props，这样就可以在组件中取到这些状态和⽅法了。
+ 当⽤户点击了某个操作等，会从props中拿到action并调⽤它，他会向 store发送(dispatch)这个action的内容，
+ 如果store中有中间件，会先逐个调⽤中间件来完成预处理
+ 然后再调⽤各个reducer，来完成状态的改变
+ 状态改变以后，因为状态绑定了UI组件的props，所以react会⾃动刷新 UI



## react-redux

每次都重新调⽤render和getState太low了，想⽤更react的⽅式来写，需 要react-redux的⽀持

Redux 官⽅提供的 React 绑定库。 具有⾼效且灵活的特性。



简易流程图

![react-redux](https://tva1.sinaimg.cn/large/006tNbRwly1gaagot05ivj30yc0o8tfl.jpg)

```shell
npm i react-redux -S
```

提供了两个api

1. Provider 为后代组件提供 store

2. connect 为组件提供数据和变更方法

   mapStateToProps 这个函数允许我们将 store 中的数据作为 props 绑定到组件上

   mapDispatchToProps 将 dispatch 作为 props 绑定到组件上



全局提供 store

```jsx
// index.js
import store from './components/ReduxTest/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById('root')
);
```



获取状态数据

```jsx
// ReduxTest.js
import { connect } from 'react-redux'

// 实验室功能
@connect(
  state => ({ num: state }), // 状态映射
  {
    add: () => ({ type: 'add' }), // action creator
    minus: () => ({ type: 'minus' }) // action creator
  }
)
class Counter extends Component {
  componentDidMount () {
    store.subscribe(() => this.forceUpdate())
  }

  render () {
    return (
      <div>
        <p>{this.props.num}</p>
        <button onClick={this.props.add}>Add</button>
        <button onClick={this.props.minus}>Minus</button>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { num: state }
}
function mapDispatchToProps (dispatch) {
  return {
    add: () => dispatch({ type: 'add' }),
    minus: () => dispatch({ type: 'minus' })
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

export default App
```



## 异步

react 默认只支持同步，实现异步任务，比如延迟，网络请求，需要中间件的支持，比如我们使用最贱的 redux-thunk 和 redux-logger

```shell
npm i redux-thunk redux-logger -S
```

参考 redux flow 流程图



应用中间件

```jsx
// store.js
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'add':
      return state + 1;
    case 'minus':
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(counterReducer, applyMiddleware(logger, thunk));

export default store
```

使用异步操作时的变化

```jsx
// 实验室功能
@connect(
  state => ({ num: state }), // 状态映射
  {
    add: () => ({ type: 'add' }), // action creator
    minus: () => ({ type: 'minus' }), // action creator
    asyncAdd: () => dispatch => {
      setTimeout(() => {
        // 异步结束后，手动执行 dispatch
        dispatch({ type: 'add' })
      }, 1000);
    }
  }
)
```



## 代码优化

抽离 reducer 和 action， 创建 store/counter.js

















# React - react-router

## 要点

1. 掌握 react-router
2. 掌握 react-router 原理



## 资源

1. [react-router](https://reacttraining.com/react-router/web/guides/quick-start)



## react-router

React Router 包含3个库,

 react-router、react-router-dom、 reactrouter-native。

react-router 提供最基本的路由功能，

实际使⽤，我们不会直接安装 react-router,⽽是根据应⽤运⾏的环境选择安装 react-router-dom(在浏览器中使⽤)或 react-router-native(在 react-native中使⽤)。

react-router-dom 和 react-router-native 都依赖 react-router,所以在安装时， react-router 也会⾃动安装。



## 安装

```shell
npm i react-router-dom -S
```



## 基本使用

react-router中奉⾏⼀切皆组件的思想，路由器-Router、链接-Link、路 由-Route、独占-Switch、重定向-Redirect都以组件形式存在

React Router 通过 Router 和 Route 两个组件完成路由功能，在 Web应⽤ 中，我们⼀般会使⽤对 Router 进⾏包装的 BrowserRouter 或 HashRouter 两个组件 BrowserRouter使⽤ HTML5 的 history API（pushState、replaceState等）实现应⽤的 UI 和 URL 的同步。



创建 RouterTest.js

```jsx
import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

function ProductList (props) {
  return <div>ProductList</div>
}

function ProductMgt (props) {
  return <div>ProductMgt</div>
}

export default function RouterTest () {
  return (
    <Router>
      <nav>
        {/* 导航 */}
        <Link to="/">商品列表</Link>
        <Link to="/management">商品管理</Link>
      </nav>
      <div>
        {/* 直接在组件中定义路由 */}
        {/* 根路由要添加 exact，render 可以实现条件渲染 */}
        <Route exact path="/" component={ProductList} />
        <Route path="/management" component={ProductMgt} />
      </div>
    </Router>
  )
}
```



## 动态路由

使用 :id 的形式来定义 动态路由

定义路由，RouterTest

```jsx
<Route path="/detail/:name" component={Detail} />
```

添加导航链接，ProductList

```jsx
<Link to="/detail/web">Web全栈</Link>
```

创建 Detail 组件并获取参数

```jsx
function Detail ({ match, history, location }) {
  console.log(match, history, location);
  return (
    <div>
      ProductDetail
      <p>{match.params.name}</p>
    </div>
  )
}
```



例子：

```jsx
import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        { id: 1, title: '标题-1' },
        { id: 2, title: '标题-2' },
        { id: 3, title: '标题-3' },
      ]
    }
  }
  render () {
    return (
      <ul>
        {this.state.list.map((item, index) => {
          return (
            <li key={index}>
              <Link to={'/list' + item.id}>{item.title}</Link>
            </li>
          )
        })}
      </ul>
    )
  }
}
```



## 嵌套路由

Route 组件嵌套在其他页面组件中就产生了嵌套关系

修改 ProductMgt，添加新增和搜索商品

```jsx
function ProductMgt (props) {
  return <div>
    <h3>ProductMgt</h3>
    <Link to="/management/add">新增商品</Link>
    &nbsp;|&nbsp;
    <Link to="/management/search">搜索商品</Link>
    <Route path="/management/add" component={() => <div>add</div>} />
    <Route path="/management/search" component={() => <div>search</div>} />
  </div>
}
```



## 动态引入 && 基于路由的代码分割

`React.lazy` 接受⼀个函数，这个函数需要动态调⽤ `import()` 。它必须返回⼀个 `Promise` ，该 Promise 需要 resolve ⼀个 `defalut` export 的 React 组件。

然后应在 `Suspense` 组件中渲染 lazy 组件，如此使得我们可以使⽤在等待 加载 lazy 组件时做优雅降级（如 loading 指示器等）

`React.lazy` 目前只支持默认导出（default exports）

```jsx
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import React, { Suspense, lazy } from 'react'

const Home = lazy(() => import('./routes/Home'))
const About = lazy(() => import('./routes/About'))

const App = () => (
	<Router>
  	// fallback 属性接受任何在组件家在过程中你想要展示的 react 元素
    <Suspense fallback={<div>Loading...</div>}>
    	<Switch>
      	<Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Suspense>
  </Router>
)
```



## 404 页面

设定一个没有 path 的路由在路由列表最后，表示最后的倔强，类似 vue-router 中的 /* 匹配



## 路由守卫

思路：创建高阶组件包装 Route 使其具有权限判断功能

创建 PrivateRoute

```jsx
function PrivateRoute ({ Component: Component, isLogin, ...rest }) {
  // 单独解构出 component 和 isLogin
  // component为渲染目标组件，isLogin通常来自Redux
  // rest 为传递给 Route 的属性
  return (
    <Route
      {...rest}
      render={
        props => isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                redirect: props.location.pathname // 重定向地址
              }
            }}
          />
        )
      }
    />
  )
}
```

创建 Login

```jsx
function Login({ location, isLogin, login }) {
  const redirect = location.state.redirect || '/'	// 重定向地址
  if (isLogin) return <Redirect to={redirect} />

 	return (
  	<div>
    	<p>用户登录</p>
      <hr />
      <button onClick={login}>登录</button>
    </div>
  )
}
```

配置路由 ReduxTest

```jsx
<PrivateRoute path="/management" component={ProductMgt} />
<Route path="/login" component={Login} />
```

> 给 PrivateRoute 传递 isLogin={ture} 试试

> 整合 Redux，获取和设置登录态，创建 ./store/user.js
>
> ```js
> const initialState = {
>   isLogin: false,
>   loading: false
> }
>
> export default (state = initialState, action) => {
>   switch (action.type) {
>     case 'requestLogin':
>       return { isLogin: false, loading: true }
>     case 'loginSuccess':
>       return { isLogin: true, loading: false }
>     case 'loginFailure':
>       return { isLogin: false, loading: false }
>     default:
>       return state
>   }
> }
>
> export function login (user) {
>   return dispatch => {
>     dispatch({ type: 'requestLogin' })
>     setTimeout(() => {
>       dispatch({ type: 'loginSuccess' })
>     }, 1000);
>   }
> }
> ```
>
> 引入 store/index.js
>
> ```js
> import user from './user'
> const PrivateRoute = connect(state => ({
>   isLogin: state.user.isLogin
> }))(function ({ isLogin, ...rest }) { })
>
> const Login = connect(state => ({
>   isLogin: state.user.isLogin
> }), { login })(function ({ isLogin, login }) {})
> ```



## 拓展

react-router 秉承一切皆组件，因此实现的核心就是 BrowserRouter、Route、Link

**BrowserRouter** 历史记录管理对象 history 初始化及向下传递，location 变更监听

context

```js
import React from 'react'

let { Provider, Consumer } = React.createContext()

export { Provider, Consumer }
```



创建 MyRouter.js 首先实现 BrowserRouter

```jsx
import React, { Component } from 'react';
import { createBrowserHistory } from 'history'

import { Provider } from './context'

class BrowserRouter extends Component {
  constructor(props) {
    super(props)
    this.history = createBrowserHistory(this.props)
    this.state = {
      location: this.history.location
    }
    this.unlisten = this.history.listen(location => {
      this.setState({ location })
    })
  }
  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten()
    }
  }

  render () {
    return (
      <Provider
        value={{
          history: this.history,
          location: this.state.location
        }}
      >{this.props.children}</Provider>
    )
  }
}

export default BrowserRouter
```



Route 路由配置，匹配检测，内容渲染

+ path-to-regexp https://www.npmjs.com/package/path-to-regexp
+ https://blog.csdn.net/weixin_33768153/article/details/82413983

```jsx
import React, { Component } from 'react'

import pathToReg from 'path-to-regexp'
import { Consumer } from './context'

// 发现Route组件包含有path，exact，component这些属性
// <route path="xx" component="xx" exact={true}></route>

class Route extends Component {
  render () {
    return (
      <Consumer>
        {value => {
          let { path: component, exact = false } = this.props
          let pathname = value.location.pathname
          // 要使⽤路径中找到的键填充的数组 let keys = [];
          let keys = []
          let reg = pathToReg(path, keys, { end: exact });
          keys = keys.map(item => item.name);
          let result = pathname.match(reg);
          let [url, ...values] = result || [];
          // path="list/:user"
          let props = {
            location: value.location,
            history: value.history,
            match: {
              //params:{id:123}
              params: keys.reduce((obj, current, index) => {
                console.log(keys);
                obj[current] = values[index];
                console.log(obj);
                return obj;
              }, {})
            }
          };
          if (result) {
            return <Component {...props}></Component>;
          }
          return null;
        }}
      </Consumer>
    )
  }
}

export default Route
```



Link.js 跳转链接，处理点击事件

```jsx
export default class Link extends Component {
  handleClick (event, history) {
    event.preventDefault()
    history.push(this.props.to)
  }
  render () {
    const { to, ...rest } = this.props
    return (
      <RouterContext.Consumer>
        {context => {
          return (
            <a
              {...rest}
              onClick={event => this.handleClick(event, context.history)}
              href={to}
            >{this.props.children}</a>
          )
        }}
      </RouterContext.Consumer>
    )
  }
}
```





