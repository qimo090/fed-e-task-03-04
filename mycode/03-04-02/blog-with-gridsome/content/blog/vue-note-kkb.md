---
title: vue-note-kkb
catalog: true
date: 2019-09-17 15:19:59
tags:
- vue
- note
- kkb
categories:
- vue
---

#### 组件传值、通信

##### 父组件 => 子组件

- 属性 props

<!-- more -->

```html
<!-- parent -->
<HelloWorld msg="welcome to Your Vue.js" />
<!-- child -->
props: { msg: String }
```

- 引用 refs

```html
<!-- parent -->
<HelloWorld ref="hw" />
this.$refs.hw.xx
```

##### 子组件 => 父组件：自定义事件

```
// child
this.$emit('add', good)

// parent
<Cart @add="cartAdd($event)" />
```

##### 兄弟组件：通过共同祖辈组件

通过共同的祖辈组件搭桥，`$parent` 或 `$root`

```js
// brother1
this.$parent.$on('foo', handle)
// brother2
this.$parent.$emit('foo')
```

##### 祖先和后代之间

由于嵌套层数过多，传递 props 不切实际，vue 提供了`provide/inject` API 完成该任务

- `provide/inject`：能够实现组件实现给后代传值

```js
// ancestor
provide () {
  return { foo: 'foo' }
}
// descendant
inject: ['foo']
```

> 注意：`provide` 和 `inject` 主要为了高阶插件/组件库提供用例。并不推荐直接用于应用程序代码中，更多会在开源组件库中见到。
> 另外，反过来想要后代给祖先传值这种方案就不行了，但这难不倒聪明的程序猿

- `dispatch`：后代给祖先传值

```js
function dispatch(eventName, data) {
  let parent = this.$parent
  // 只要还存在父元素就继续往上查找
  while(parent) {
    if (parent) {
      // 父元素用$emit触发
      parent.$emit(eventName, data)
      // 递归查找父元素
      parent = parent.$parent
    } else {
      break
    }
  }
}

// HelloWorld.vue
<h1 @click="dispatch('hello', 'hello world')">{{ msg }}</h1>
// App.vue
this.$on('hello', this.sayHello)
```

##### 任意两个组件之间：事件总线 或 vuex

- 事件总线：创建一个 Bus 类负责事件派发、监听和回调管理

```js
// Bus: 事件派发、监听和回调管理
class Bus {
  constructor() {
    this.callbacks = {}
  }
  $on(name, fn) {
    this.callbacks[name] = this.callbacks[name] || []
    this.callbacks[name].push(fn)
  }
  $emit(name, args) {
    if (this.callbacks[name]) {
      this.callbacks[name].forEach(cb => cb(args))
    }
  }
}

// main.js
Vue.prototype.$bus = new Bus()

// child1
this.$bus.$on('foo', handle)

// child2
this.$bus.$emit('foo')
```

- vuex: 创建唯一的全局数据管理者 store，通过它管理数据并通知组件状态变更

#### 插槽

插槽语法是 vue 实现的内容分发 API，用于复合组件开发。该技术在通用组件库开发中有大量应用

> Vue 2.6.0 之后采用全新 `v-slot` 语法取代之前的 `slot/slot-scope`

##### 匿名插槽

```html
<!-- comp1 -->
<div>
  <slot></slot>
</div>

<!-- parent -->
<comp>hello</comp>
```

##### 具名插槽

将内容分发到子组件指定位置

```html
<!-- comp2 -->
<div>
  <slot></slot>
  <slot name="content"></slot>
</div>
<!-- parent -->
<Comp2>
  <!-- 默认插槽用default做参数 -->
  <template v-slot:default
    >具名插槽</template
  >
  <!-- 具名插槽用插槽名做参数 -->
  <template v-slot:content></template>
</Comp2>
```

##### 作用域插槽

```html
<!-- comp3 -->
<div>
  <slot :foo="foo"></slot>
</div>
<!-- parent -->
<Comp3>
  <!-- 把v-slotde值指定为作用域上下文对象 -->
  <template v-slot:default="ctx">
    来自子组件的数据：{{ ctx.foo }}
  </template>
</Comp3>
```

##### 表单组件实现

- `Input`
  - 双向绑定：`@input, :value`
  - 派发校验事件
  ```html
  <template>
    <div>
      <input :value="value" @input="onInput" v-bind="$attrs" />
    </div>
  </template>
  <script>
    export default {
      inheritAttrs: false,
      props: {
        value: {
          type: String,
          defalult: ''
        }
      },
      methods: {
        onInput(e) {
          this.$emit('input', e.target.value)
          this.$parent.$emit('validate')
        }
      }
    }
  </script>
  ```

* `FormItem`
  - 给 `Input` 预留插槽-slot
  - 能够展示 label 和校验信息
  - 能够进行校验
  ```html
  <template>
    <div>
      <label v-if="label">{{ label }}</label>
      <slot></slot>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </template>
  <script>
    import Schema from 'async-validator'
    export default {
      inject: ['form'],
      props: {
        label: {
          type: String,
          default: ''
        },
        prop: {
          type: String
        }
      },
      data() {
        return {
          errorMessage: ''
        }
      },
      mounted() {
        // this.$on('validate', this.validate())
        this.$on('validate', () => {
          this.validate()
        })
      },
      methods: {
        validate() {
          // 做校验
          const value = this.form.model[this.prop]
          const rules = this.form.rules[this.prop]
          // npm i async-validator -S
          const desc = {
            [this.prop]: rules
          }
          const schema = new Schema(desc)
          // return 的是校验结果的 Promise
          return schema.validate({ [this.prop]: value }, errors => {
            if (errors) {
              this.errorMessage = errors[0].message
            } else {
              this.errorMessage = ''
            }
          })
        }
      }
    }
  </script>
  ```

- `Form`

  - 给 `FormItem` 留插槽
  - 设置数据和校验规则
  - 全局校验

    ```html
    <template>
      <div>
        <slot></slot>
      </div>
    </template>
    <script>
      export default {
        provide() {
          return {
            form: this
          }
        },
        props: {
          model: {
            type: Object,
            required: true
          },
          rules: {
            type: Object
          }
        },
        methods: {
          validate(cb) {
            const tasks = this.$chidren
              .filter(item => item.prop)
              .map(item => item.validate())
            // 所有任务都通过才算验证通过
            Promise.all(tasks)
              .then(() => cb(true))
              .catch(() => cb(false))
          }
        }
      }
    </script>
    ```

##### Notice 组件实现

- 组件实例创建函数：`create` 函数

  ```js
  // Component vs comp
  // Component: 组件配置，js对象
  // comp：组件实例
  // Vue.extend(Component) => function 组件构造函数
  // Vue.component('comp', Component) 全局注册组件
  // create 把传递的组件配置转换为组件实例返回

  import Vue from 'vue'

  export default function create(Component, props) {
    // 先创建vue实例，用它创建组件实例
    const vm = new Vue({
      render(h) {
        // h就是createElement，它返回VNode
        return h(Component, { props })
      }
    }).$mount() // $mount 里面会调用render生成VNode，生成的VNode会执行update函数生成DOM
    // 手动挂载
    document.body.appendChild(vm.$el)
    // 从vm.$children中拿出comp
    const comp = vm.$children[0] // vm.$root也是comp
    // 销毁方法
    comp.remove = function() {
      document.body.removeChild(vm.$el)
      vm.$destroy()
    }
    return comp
  }
  ```

- `Notice` 组件

  - 插槽预留
  - 标题，内容等属性
  - 自动关闭

  ```html
  <template>
    <div class="box" v-if="isShow">
      <h3>{{ title }}</h3>
      <p class="box-content">{{ message }}</p>
    </div>
  </template>
  <script>
    export default {
      props: {
        title: {
          type: String,
          default: ''
        },
        message: {
          type: String,
          default: ''
        },
        duration: {
          tpye: Number,
          default: 1000
        }
      },
      data() {
        return {
          isShow: false
        }
      },
      methods: {
        show() {
          this.isShow = true
          setTimeout(this.hide, this.duration)
        },
        hide() {
          this.isShow = false
          this.remove()
        }
      }
    }
  </script>
  ```

- 使用

  ```html
  <script>
    import Notice from '@/components/notice/KNotice'
    export default {
      methods: {
        submitForm(form) {
          this.$refs[form].validate(valid => {
            const notice = this.$create(Notice, {
              title: '社会你大爷',
              message: valid ? '请求登录' : '校验失败',
              duration: 1000
            })
            notice.show()
          })
        }
      }
    }
  </script>
  ```

#### Tree 组件实现

- 递归组件 Item 创建
  ```html
  <template>
    <li>
      <div @click="toggle">
        {{ model.title }}
        <span v-if="isFolder">[{{ open ? '-' : '+' }}]</span>
      </div>
      <ul v-show="open" v-if="isFolder">
        <item
          class="item"
          v-for="model in model.children"
          :model="model"
          :key="model.title"
        ></item>
      </ul>
    </li>
  </template>
  <script>
    export default {
      name: 'Item',
      props: {
        model: {
          type: Object,
          required: true
        }
      },
      data() {
        return {
          open: false
        }
      },
      computed: {
        isFolder() {
          return this.model.children && this.model.children.length
        }
      },
      methods: {
        toggle() {
          if (this.siFolder) {
            this.open = !ths.open
          }
        }
      }
    }
  </script>
  ```

* 数据和使用
  ```html
  <template>
    <div>
      <ul>
        <item class="item" :model="treeData"></item>
      </ul>
    </div>
  </template>
  <script>
    import Item from './Item'
    export default {
      name: 'app',
      data() {
        return {
          treeData: {
            title: 'web全栈架构师',
            children: [
              { title: 'Java架构师' },
              {
                title: 'JS高级',
                children: [{ title: 'es6' }, { title: '动效' }]
              },
              {
                title: 'web全栈',
                children: [
                  {
                    title: 'Vue训练营',
                    expand: true,
                    children: [
                      { title: '组件化' },
                      { title: '源码' },
                      { title: 'docker部署' }
                    ]
                  },
                  {
                    title: 'React',
                    children: [{ title: 'JSX' }, { title: '虚拟DOM' }]
                  },
                  { title: 'Node' }
                ]
              }
            ]
          }
        }
      },
      components: { Item }
    }
  </script>
  ```

> v-model & .sync

```vue
// v-model 是语法糖
<input v-model="username">
// 默认等效于下面这行
<input :value="username" @input="username = $event">

// 但是你也可以通过设置model选项修改默认行为 Input.vue
{
  model: {
    prop: 'checked',
    event: 'change'
  }
}
// 上面这样设置会导致上级使用v-model时行为变化
// v-model通常用于表单控件，它有默认行为，属性名和事件名均可定义
<Input :chekcd="username" @change="username=$event">

// sync 修饰符类似于 v-model，它能用于修改传递到子组件的属性，如果像下面这样写
<Input :value.sync="username">
// 等效于下面这行，name和v-model的区别只有事件名称的变化
<Input :value="username" @update:value="username=$event">
// 这里绑定属性名称可以随意更改，相应的属性名也会变化
<Input :foo="username" @update:foo="username=$event">
// 所以sync修饰符的控制能力都在父级，事件名称也相对固定update:xx
```

#### vue-router

配置

```js
routes: [
  { path: '/', name: 'home', component: Home },
  {
    path: '/about',
    name: 'about',
    // 路由层级代码分割，生成分片(about.[hash].js)
    // 当路由访问时会懒加载
    component: () => import(/* webpackChunkName: 'about' */ './views/About.vue')
  }
]
```

指定路由器

```js
// main.js
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

路由视图

```html
<router-view />
```

导航链接

```html
<router-link to="/">Home</router-link>
<router-link to="/about">About</router-link>
```

路由嵌套

```jsx
// router.js
{
  path: '/', component: Home, chidren: [
    { path: '/list', name: 'list', component: List }
  ]
}

// Home.vue
<template>
  <div class="name">
    <h1>首页</h1>
    <router-view></router-view>
  </div>
</template>
```

动态路由

```html
{ path: 'detail/:id', component: Detail }

<template>
  <div>
    <h2>商品详情</h2>
    <p>{{ $route.params.id }}</p>
  </div>
</template>
```

路由守卫

- 全局守卫 router.js
  ```js
  router.beforeEach((to, from, next) => {
    // 要访问/about且未登录需要去登录
    if (to.meta.auth && !window.isLogin) {
      if (window.confirm("请登录")) {
        window.isLogin = true;
        next(); // 登录成功，继续
      } else {
        next('/');// 放弃登录，回首页
      }
    } else {
      next(); // 不需登录，继续 }
    }
  );
  ```
- 路由独享守卫
  ```js
  beforeEnter(to, from, next) {
    // 路由内部知道自己需要认证
    if (!window.isLogin) {
      // ...
    } else {
      next();
    }
  },
  ```
- 组件内的守卫
  ```js
  export default {
    beforeRouteEnter(to, from, next) {
      //this不能用
    },
    beforeRouteUpdate(to, from, next) {},
    beforeRouteLeave(to, from, next) {}
  }
  ```

动态路由

```js
// 异步获取路由
api.getRoutes().then(routes => {
  const routeConfig = routes.map(route => mapComponent(route))
  router.addRoutes(routeConfig)
})
// 映射关系
const compMap = {
  Home: () => import('./view/Home.vue')
}
// 递归替换
function mapComponent(route) {
  route.component = compMap[route.component]
  if (route.children) {
    route.children = route.children.map(child => mapComponent(child))
  }
  return route
}
```

面包屑

```js
// Breadcrumb.vue
watch: {
    $route() {
    // [{name:'home'},{name:'list'}]
    console.log(this.$route.matched);
    // ['home','list']
    this.crumbData = this.$route.matched.map(m => m.name)
  }
}
```

#### vue-router 实现原理

- 实现插件
- url 变化监听
- 路由配置解析 {'/' Home}
- 实现全局组件 router-link, router-view

```js
class VueRouter {
  constructor(options) {
    this.$options = options
    this.routeMap = {}
    // 路由响应式
    this.app = new Vue({
      data: {
        current: '/'
      }
    })
  }
  init() {
    this.bindEvents() //监听url变化 this.createRouteMap(this.$options); //解析路由配置 this.initComponent(); // 实现两个组件
  }
  bindEvents() {
    window.addEventListener('load', this.onHashChange.bind(this))
    window.addEventListener('hashchange', this.onHashChange.bind(this))
  }
  onHashChange() {
    this.app.current = window.location.hash.slice(1) || '/'
  }
  createRouteMap(options) {
    options.routes.forEach(item => {
      this.routeMap[item.path] = item.component
    })
  }
  initComponent() {
    // router-link,router-view
    // <router-link to="">fff</router-link>
    Vue.component('router-link', {
      props: { to: String },
      render(h) {
        // h(tag, data, children)
        return h('a', { attrs: { href: '#' + this.to } }, [this.$slots.default])
      }
    })
    // <router-view></router-view>
    Vue.component('router-view', {
      render: h => {
        const comp = this.routeMap[this.app.current]
        return h(comp)
      }
    })
  }
}
VueRouter.install = function(Vue) {
  // 混入
  Vue.mixin({
    beforeCreate() {
      // this是Vue实例
      if (this.$options.router) {
        // 仅在根组件执行一次
        Vue.prototype.$router = this.$options.router
        this.$options.router.init()
      }
    }
  })
}
```

#### vuex

##### 整合 vuex

```bash
vue add vuex
```

##### 状态和状态变更

```js
export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state, n = 1) {
      state.count += n
    }
  }
})
```

使用状态， vuex/index.vue

```html
<template>
  <div>
    <div>冲啊，手榴弹扔了{{ $store.state.count }}个</div>
    <button @click="add">扔一个</button>
  </div>
</template>
<script>
  export default {
    methods: {
      add() {
        this.$store.commit('increment')
      }
    }
  }
</script>
```

##### 派发状态 - getters

```js
export default new Vuex.Store({
  getters: {
    score(state) {
      return `共扔出${state.count}`
    }
  }
})
```

```html
<!-- App.vue -->
<span>{{ $store.getters.score }}</span>
```

##### 动作 - actions

```js
export default new Vuex.Store({
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment', 2)
      }, 1000)
    }
  }
})
```

使用 actions

```html
<template>
  <div id="app">
    <div>冲啊，手榴弹扔了{{ $store.state.count }}个</div>
    <button @click="addAsync">蓄力扔俩</button>
  </div>
</template>
<script>
  export default {
    methods: {
      addAsync() {
        this.$store.dispatch('incrementAsync')
      }
    }
  }
</script>
```

##### 模块化

```js
const count = {
  namespaced: true
  // ...
}

export default new Vuex.Store({
  modules: {
    a: count
  }
})
```

使用变化

```html
<!-- components/vuex/module.vue -->
<template>
  <div id="app">
    <div>冲啊，手榴弹扔了{{$store.state.a.count}}个</div>
    <p>{{$store.getters['a/score']}}</p>
    <button @click="add">扔一个</button>
    <button @click="addAsync">蓄力扔俩</button>
  </div>
</template>
<script>
  export default {
    methods: {
      add() {
        this.$store.commit('a/increment')
      },
      addAsync() {
        this.$store.dispatch('a/incrementAsync')
      }
    }
  }
</script>
```

#### vuex 原理

- vuex 也是一个插件
- 实现四个东西： state/mutations/actions/getters
- 创建 Store
- 数据响应式

```js
let Vue
function install(_Vue) {
  Vue = _Vue
  // 这样store执行的时候，就有了Vue，不用import // 这也是为啥Vue.use必须在新建store之前
  Vue.mixin({
    beforeCreate() {
      // 这样才能获取到传递进来的store
      // 只有root元素才有store，所以判断一下
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}
class Store {
  constructor(options = {}) {
    this.state = new Vue({
      data: options.state
    })
    this.mutations = options.mutations || {}
    this.actions = options.actions
    options.getters && this.handleGetters(options.getters)
  }
  commit = (type, arg) => {
    this.mutations[type](this.state, arg)
  }
  dispatch(type, arg) {
    this.actions[type](
      {
        commit: this.commit,
        state: this.state
      },
      arg
    )
  }
  handleGetters(getters) {
    this.getters = {} // 定义this.getters
    // 遍历getters选项，为this.getters定义property
    // 属性名就是选项中的key，只需定义get函数保证其只读性
    Object.keys(getters).forEach(key => {
      // 这样这些属性都是只读的
      Object.defineProperty(this.getters, key, {
        get: () => {
          // 注意依然是箭头函数
          return getters[key](this.state)
        }
      })
    })
  }
}
export default { Store, install }
```



#### TypeScript

TypeScript 是 JavaScript 的**超集**，它可编译为纯JavaScript，是一种给JavaScript添加特性的语言扩展。

TS有如下特点：

+ 类型注解和编译时类型检查
+ 基于类的面向对象编程
+ 泛型
+ 接口
+ 声明文件
+ ...



##### ts & es6

![tses6](https://tva1.sinaimg.cn/large/006tNbRwgy1ga7qu0tcd0j30ca0dj0t9.jpg)