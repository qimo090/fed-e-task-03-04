---
title: web09-vue
catalog: true
date: 2019-12-13 10:25:30
tags: []
categories: []
---

# Vue 核心API && 组件设计

## 课堂目标

1. 实现一个购物车案例
2. 掌握vue核心API
3. 深入了解Vue的组件化机制
4. 第三方组件库element-ui应用
5. 设计并实现表单组件



## 实现一个购物车案例

+ 实现课程列表

  ```vue
  <template>
    <div>
      <h3>添加课程</h3>
      <label for="classname">课程名称：</label>
      <input id="classname" type="text" v-model="courseInfo.name" />
      <br />
      <label for="classPrice">课程价格：</label>
      <input type="text" v-model.number="courseInfo.price" />
      <br />
      <button @click="addClassToList">添加课程到列表</button>
    </div>
    <hr />
    <table>
      <tr>
        <th>课程名称</th>
        <th>课程价格</th>
      </tr>
      <tr v-for="(item,index) in classList" :key="item.id">
        <td>{{item.name}}</td>
        <td>{{item.price}}</td>
        <td>
          <button @click="addCourseToCart(index)">添加到购物车</button>
        </td>
      </tr>
    </table>
    <hr />
    <cart :courseItem="courseItem" @test="removeTest(arguments[0])"></cart>
  </template>
  <script>

  export default {
    name: '',
    data () {
      return {
        title: '开课吧-精彩课程', // 标题
        subTitle: false, // 副标题是否显示
        courseInfo: {
          name: ''
        },
        courseList: [ // 课程列表数据
          { id: 0, name: 'web全栈开发架构师', price: 1000 },
          { id: 0, name: 'Python人工智能', price: 999 }
        ],
        courseItem: [] // 购物车数据
      }
    },
    methods: {
      removeTest (index) {
        this.courseItem.splice(index, 1)
      },
      addClassToList () {
        this.courseList.push(this.courseInfo)
      },
      addCourseToCart (index) {
        const course = this.courseList[index]
        const isHasCourse = this.courseItem.find((item) => item.id === course.id)
        if (isHasCourse) {
          isHasCourse.number += 1
        } else {
          this.courseItem.push({ ...course, number: 1, isActive: true })
        }
      }
    }
  }
  </script>
  ```

+ 购物车

  ```vue
  <template>
    <div>
      <h2>购物车</h2>
      <table>
        <tr>
          <th>勾选</th>
          <th>课程名称</th>
          <th>课程价格</th>
          <th>数量</th>
          <th>价格</th>
        </tr>
        <tr v-for="(item,index) in courseItem" :key="item.id" :class=" {active:item.isActive}">
          <td>
            <input type="checkbox" v-model="item.isActive" />
          </td>
          <td>{{item.courceName}}</td>
          <td>{{item.courcePrice}}</td>
          <td>
            <button @click="minus(index)">-</button>
            {{cource.number}}
            <button @click="add(index)">+</button>
          </td>
          <td>{{item.number*item.courcePrice}}</td>
        </tr>
        <tr>
          <td></td>
          <td colspan="2">{{activeList}}/{{allList}}</td>
          <td>{{activePrice}}</td>
        </tr>
      </table>
    </div>
  </template>

  <script>

  export default {
    props: ['courseItem'],
    name: 'Cart',
    data () {
      return { title: '开课吧-购物车' }
    },
    methods: {
      minus (index) {
        const num = this.courceItem[index].number
        if (num > 0) {
          this.courceItem[index].number -= 1
        } else {
          // this.remove(index);
          if (window.confirm('确定要删除操作吗')) {
            this.$emit('test', index)
          }
        }
      },
      add (index) {
        this.courceItem[index].number += 1
      },
      remove (index) {
        if (window.confirm('确定要删除吗')) {
          this.courceItem.splice(index, 1)
        }
      }
    },
    computed: {
      activeList () {
        return this.courceItem.filter(item => item.isActive).length
      },
      allList () {
        return this.courceItem.length
      },
      activePrice () {
        let num = 0; this.courceItem.forEach(item => {
          if (item.isActive) { num += item.courcePrice * item.number }
        })
        return num
      }
    }
  }
  </script>
  ```



## 组件化

+ 组件化思想

  ![01](https://tva1.sinaimg.cn/large/006tNbRwgy1g9uz2hdnnvj31320f43z1.jpg)

+ 第三方组件应用

  + Element-UI：http://element-cn.eleme.io/

  + element集成：vue add element

  + 组件使用：创建一个登录表单并可以校验用户输入

    ```vue
    <template>
      <div id="app">
        <h3>Element表单</h3>
        <hr />
        <el-form :model="model" :rules="rules" ref="loginForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="model.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password">
            <el-input type="password" v-model="model.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>

    <script>
    
    export default {
      name: 'app',
    data () {
        return {
          model: {
            username: 'tom', password: ''
          },
          rules: {
            username: [
              { required: true, message: '请输入用户名' },
              { min: 6, max: 10, message: '请输入6~10位的用户名' }
            ],
            password: [{ required: true, message: '请输入密码' }]
          }
        }
      },
      methods: {
        submitForm (form) {
          this.$refs[form].validate(valid => {
            if (valid) {
              alert('请求登录!')
            } else {
              alert('校验失败！')
            }
          })
        }
      }
    }
    </script>
    ```
    
    > 需要在element.js导入Form、FormItem和Input
    >
    > import { Button,Form,FormItem,Input } from 'element-ui'
    >
    > Vue.use(Form)
    >
    > Vue.use(FormItem)
    >
    > Vue.use(Input)

+ 组件设计：实现 Form、FormItem、Input

  > 需要思考的几个问题？
  >
  > 1. Input是自定义组件，它是怎么实现双向绑定的？
  > 2. FormItem是怎么知道执行校验的，它是怎么知道Input状态的？它是怎么获得对应数据模型的？
  > 3. Form是怎么进行全局校验的？它用什么办法把数据模型和校验规则传递给内部组件？

  设计思想

  ![image-20191213123036015](https://tva1.sinaimg.cn/large/006tNbRwgy1g9uzhtt8g0j30ui0duaaq.jpg)

  + 实现 Input

    + 任务1：实现自定义组件双向绑定功能

      > v-model 是语法糖，实现自定义组件双绑需要指定 :value 和 @input 即可

    + 任务2：值发生变化能够通知到 FormItem 组件

    ```vue
    <template>
      <div>
        <input :type="type" :value="value" @input="onInput" />
      </div>
    </template>

    <script>

    export default {
      props: {
        value: {
          type: String, default: ''
        },
        type: {
          type: String, default: 'text'
        }
      },
      methods: {
        // input事件触发设置模型的值并通知父组件
        onInput (e) {
          let inputValue = e.target.value
          this.$emit('input', inputValue)
        }
      }
    }
    </script>
    ```

  + 实现 FormItem

    + 任务1：给 Input 预留插槽 - slot

      + 匿名插槽

        ```vue
        // 定义parent中插槽
        <div>
          <slot></slot>
        </div>
        // 使用parent并指定插槽内容
        <parent>
          content
        </parent>
        ```

      + 具名插槽

        ```vue
        // 定义parent中插槽
        <div>
          <slot name="top"></slot>
          <slot></slot>
        </div>
        // 使用parent并指定插槽内容
        <parent>
          <template slot="top">top content</template>
          content
        </parent>
        ```

    + 任务2：能够展示 label 和校验信息

    + 任务3：能够进行校验

      ```vue
      <template>
        <div>
          <label v-if="label">{{label}}</label>
          <slot></slot>
          <p v-if="error">{{error}}</p>
        </div>
      </template>

      <script>
      export default {
        props: {
          label: {// 输入项标签
            type: String, default: ''
          },
          prop: {// 字段名
            type: String, default: ''
          }
        },
        data () {
          return {
            error: '' // 校验错误
          }
        }
      }
      </script>
      ```

  + 实现 Form

    + 给 FormItem 预留槽位
    + 将数据传递给后代便于它们访问**数据模型**和**校验规则**
      + provide && inject

    ```vue
    <template>
      <form>
        <slot></slot>
      </form>
    </template>

    <script>
    export default {
      provide () {
        return {
          form: this // 将组件实例作为提供者，子代组件可方便获取
        }
      },
      props: {
        model: { type: Object, required: true },
        rules: { type: Object }
      }
    }
    </script>
    ```

  + 数据校验

    + 思路：校验发生在 FormItem，它需要知道**何时校验**（由Input通知），还需要知道**怎么校验**（注入校验规则）
    + 任务1：Input 通知校验

    ```js
    onInput (e) {
      // ...
      // $parent 指 FormItem
      this.$parent.$emit('validate')
    }
    ```

    + 任务2：FormItem 监听校验通知，获取规则并执行校验

    ```js
    export default {
      inject: ['form'], // 注入
      mounted () { // 监听校验事件
        this.$on('validate', this.validate)
      },
      methods: {
        validate () { // 获取对应FormItem校验规则
          console.log(this.form.rules[this.prop]) // 获取校验值
          console.log(this.form.model[this.prop])
        }
      }
    }
    ```

    + 安装 async-validator：`npm i async-validator -S`

    ```js
    import Schema from 'async-validator'

    export default {
      methods: {
        validate () {
          // 获取对应FormItem校验规则
          const rules = this.form.rules[this.prop] // 获取校验值
          const value = this.form.model[this.prop] // 校验描述对象
          const descriptor = { [this.prop]: rules } // 创建校验器
          const schema = new Schema(descriptor)
          schema.validate({ [this.prop]: value }, errors => {
            if (errors) {
              // 将错误信息显示
              this.error = errors[0].message
            } else {
              // 校验通过
              this.error = ''
            }
          })
        }
      }
    }
    ```




# Vue-router && Vuex 实战



## 课堂目标

1. vue-router基础配置
2. 路由传参
3. 子路由
4. 路由重定向
5. 路由守卫
6. vuex数据流
7. Store
8. state
9. mutation
10. action



## 知识要点

1. vue-router 多页面
2. vuex 管理数据



## 资源

1. [vue-router](https://router.vuejs.org/zh/guide/)

2. [vuex](https://vuex.vuejs.org/zh/guide/)

vuex模块切分 modules 分模块(后续) getter可以理解为vuex里面的computed action 异步mutions



## 起步

Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。

包含的功能有：

1. 嵌套的路由/视图表

2. 模块化的、基于组件的路由配置

3. 路由参数

4. 基于 Vue.js 过渡系统的视图过渡效果

5. 细粒度的导航控制

6. 带有自动激活的 CSS class 的链接

7. HTML5 历史模式或 hash 模式

![image-20191214095113339](https://tva1.sinaimg.cn/large/006tNbRwly1g9w0imk7bhj30mu0ka0tn.jpg)

1. 新建项目 `vue create vue-router-vuex`
2. 安装 vue-router `npm i vue-router -S` 或 `vue add router`
3. `npm run serve`



## 多页面体验

+ 新建 router.js

  新建两个测试组件

  ```vue
  // Page1.vue
  <template>
  	<div>
      页面1
    </div>
  </template>
  <script>
  export default {}
  </script>
  ```

  ```vue
  // Page2.vue
  <template>
  	<div>
      页面2
    </div>
  </template>
  <script>
  export default {}
  </script>
  ```

  ```js
  // router.js
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  import Page1 from './components/Page1'
  import Page2 from './components/Page2'

  Vue.use(VueRouter)

  export default new VueRouter({
    routes: [
      { path: '/page1', component: Page1 },
      { path: '/page2', component: Page2 }
    ]
  })
  ```
  
+ main.js
  ```js
  // main.js
  import Vue from 'vue'
  import App from './App.vue'
  import VueRouter from 'vue-router'
  import router from './router'
  Vue.config.productionTip = false

  Vue.use(VueRouter)

  new Vue({
    router, //名字必须是router
    render: h => h(App)
  }).$mount('#app')
  ```
  
+ app.vue 使用 router-view 占位符
  ```vue
  <template>
  	<div id="app">
      <router-view />
    </div>
  </template>
  
  <script>
  export default {
    name: 'app'
  }
  </script>
  ```
  
  访问 http://localhost:8080/#/page1 和 http://localhost:8080/#/page2 即可看到不同的组件内容



## 导航

使用 App.vue 中，使用 router-view 作为导航按钮

```vue
<div>
  // to 必须得有
  <router-link to="/page1">Page1</router-link>
  <router-link to="/page2">Page2</router-link>
</div>
```



## history 模式

默认是hash模式，url使用#后面定位路由，对seo不利，设置history，就可以使用普通的url模式

```js
// router.js
export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/page1', component: Page1 },
    { path: '/page2', component: Page2 }
  ]
})
```

url 就变成了 `http://localhost:8080/page1`



## 重定向

```js
{
  path: '/',
  redirect: '/page1'
}
```



## 路由命名

可以给路由设置name，方便router-link跳转

```html
<router-link :to="{name: 'home', params: {userId: 123}}">Home</router-link>
```

首页 => 搜索 列表页面 => 详情页面

/index

/list?searchval=xxx



shuma/detail/123

detail?id=123

shipin/detail/123



## 动态路由

路由可以携带一些参数，使用this.$router获取

```js
{ path: '/page3/:id', component: Page3 }
```

```vue
<template>
	<div>
    详情页面
  </div>
</template>

<script>
export default {
  created () {
    console.log(this.$route)
  }
}
</script>
```

![image-20191214131833332](https://tva1.sinaimg.cn/large/006tNbRwly1g9w6ib0qr3j311o0f8436.jpg)



## 参数属性传递

设置props属性，获取路由的变量就和普通的属性传递没什么区别

```js
{ path: '/page3/:id', props: true, component: Page3 }
```

```vue
<template>
	<div>
    <p>详情页面</p>
    <div>哈喽呀{{id}}</div>
  </div>
</template>

<script>
export default {
  created () {
    console.log(this.$route)
  },
  props: ['id']
}
</script>
```



## 嵌套路由

子路由的概念，比如页面内部的导航复用

```js
export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/login', component: Login },
    {
      path: '/dashboard',
      component: Dashboard,
      children: [
        { path: 'page1', component: Page1 },
        { path: 'page2', component: Page2 },
        { path: 'page3/:id', props: true, component: Page3 }
      ]
    }
  ]
})
```

app.vue

```vue
<template>
  <div id="app">
    <router-view></router-view>
    <hr />
    <div>开课吧还不错</div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'app'
}
</script>
```

dashboard.vue

```vue
<template>
  <div>
    <div>
      <router-link to="/dashboard/page1">Page1</router-link>|
      <router-link to="/dashboard/page2">Page2</router-link>|
      <router-link to="/login">login</router-link>
    </div>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>
```

page1.vue

```vue
<template>
  <div>
    <p>页面1</p>
    <div>
      <router-link to="page3/react">react</router-link>
      <br />
      <router-link to="page3/vue">vue</router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
```



## 命名视图

一个组件内部有多个router-view 怎么来分配组件呢？ 比如三栏布局，顶部栏点击按钮，左侧栏的菜单变化

home.vue

```vue
<template>
  <div id="app">
    <router-view></router-view>
    <router-view name="a"></router-view>
  </div>
</template>
```

```js
// router.js
routes:[
	{ 
    path:'/home', 
   	compontents:{ 
    	defalut: Home,
      a: List 
  	}
  }
]
```



## 导航守卫

+ ### 全局守卫

  + 每次路由跳转 都会被触发

    ```js
    // router.js
    router.beforeEach((to, from, next) => {
      // 全局前置守卫,当一个导航触发时，全局前置守卫按照创建顺序调用
      // 数据校验时，非常有用
      // if (to.fullPath === '/home') {
      //   next('/login')
      // }
      console.log('before Each')
      next();
    })
    router.beforeResolve((to, from, next) => {
      //全局解析守卫,2.5.0 新增,这和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内 守卫和异步路由组件被解析之后，解析守卫就被调用
      console.log('before Resolve')
      next();
    })
    router.afterEach((to, from) => {
      // 全局后置钩子
      console.log('after each')
    })
    ```

  + beforeEach 所有路由跳转前执行，next同意跳转 比如login执行2秒后跳转

    ```js
    // router.js
    routers.beforeEach((to, from, next) => {
      console.log('beforeEach')
      console.log(to)
      if (to.path != '/login') {
        next()
      } else {
        setTimeout(() => {
          next()
        }, 2000)
      }
    })
    
    routers.afterEach((to, from) => {
      console.log('afterEach')
    })
    ```

+ ### 路由独享的守卫

  + 写在配置里

    你可以在路由配置直接定义 `beforeEnter` 守卫

    ```js
    // router.js
    const router = new VueRouter({
      routes: [
        {
          path: '/foo', component: Foo,
          // 在进入这个路由之前调用
          beforeEnter: (to, from, next) => {
            // ...
          }
        }
      ]
    })
    ```

+ ### 组件内的守卫

  最后，你可以在路由组件内直接定义以下路由导航守卫

  ```js
  const Foo = {
    template: `...`,
    beforeRouteEnter (to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建
    },
    beforeRouteUpdate (to, from, next) {
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
    },
    beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      // 通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 next(false) 来取消
    }
  }
  ```

  1. 导航被触发。
  2. 调用全局的 beforeEach 守卫。
  3. 在重用的组件里调用 beforeRouteUpdate 守卫。
  4. 在路由配置里调用 beforeEnter。
  5. 在被激活的组件里调用 beforeRouteEnter。

  6. 调用全局的 beforeResolve 守卫 (2.5+)。
  7. 导航被确认。
  8. 调用全局的 afterEach 钩子。
  9. 触发 DOM 更新。



## 异步组件

路由懒加载 vue 中配合 webpack 非常简单

```js
{
  path: '/login',
  component: () => import('./components/Login')
}
```



## Vuex 数据管理

有几个不相关的组件，想共享一些数据怎么办呢？

`npm install vuex --save` 安装

`vue add vuex`

核心概念

+ store
+ state // 数据中心
+ mutations // 操作数据，同步
+ actions // 异步，什么时候触发操作，执行动作，改变数据



## 状态管理模式

![image-20191214134624290](https://tva1.sinaimg.cn/large/006tNbRwly1g9w7b01w73j31140s4n0a.jpg)

## store

```js
// store.js
import Vuex from 'vuex'
export default new Vuex.Store({
  state: {
    count: 0
  }
})
```

```js
// main.js
import Vue from 'vue' 
import App from './App.vue' 
import VueRouter from 'vue-router' 
import Vuex from 'vuex' 
import router from './routes' 
import store from './store' 

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuex)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

```js
// Page1.vue
export default {
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```



## Mutation

直接修改state的数据也可以，但是建议使用单向数据流的模式，使用Mutation来修改数据，直接改 VS 数据中心

```js
created () {
  setInterval(() => {
    this.$store.state.count ++
  }, 500)
}
```

使用 strict 配置，可以禁用这种模式

使用 commit 调用 mutation 来修改数据

```js
import Vue from 'vue' 
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({ 
  state: { 
    count: 0 
  }, 
  mutations: { 
    increment(state) { 
      state.count++ 
    } 
  }, 
  strict: true
})
```

```js
export default { 
  created(){ 
    setInterval(()=>{ 
      this.$store.commit('increment') 
    },500) 
  }, 
  computed: { 
    count() { 
      return this.$store.state.count; 
    } 
  } 
};
```



## getters

有时候我们需要从 store 中的 state 中派生出一些状态，我们可以理解为vuex中数据的computed功能

```js
// store.js
getters: {
  money: state => `￥${state.count * 1000}`
}
```

```js
// Page1.vue
computed: {
  money () {
    return this.$store.getters.money
  }
}
```



## Action

Mutation必须是同步的，Action是异步的Mutation

```js
// store.js
actions: {
	incrementAsync({ commit }) { 
    setTimeout(() => { 
      commit('increment')                 
    }, 1000) 
  }
}

// Page1.vue
this.$store.dispatch('incrementAsync')
```

传递参数

```js
this.$store.dispatch('incrementAsync', {
  amount: 10
})

actions: {
  incrementAsync(store, args) {
    setTimeout(() => {
      store.commit('incrementNum', args)
    }, 1000)
  }
},

incrementNum(state, args) {
  state.count += args.amount
}
```



## mapState

更方便的使用api，当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解 决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键

```js
...mapState({ 
  count: state => state.count 
})
```



## mapActions

```js
methods:{ 
  ...mapActions(['incrementAsync']), 
  ...mapMutations(['increment'])
},
```

this.$store.dispatch可以变为

```js
this.incrementAsync({ 
  amount: 10 
})
```



## mapMutations

```js
...mapMutations(['increment']) 

this.increment()
```



# Vue 源码解析



## 课堂目标

+ 深入理解 vue 底层原理
+ 手写 vue 核心部分实现



## 知识要点

+ vue 工作机制
+ vue 响应式的原理
+ 依赖收集与追踪
+ 编译 compile



### Vue 工作机制

#### 初始化

在 `new Vue()` 之后。Vue 会调用进行初始化，会初始化生命周期、事件、props、methods、data、computed 与 watch 等。其中最重要的是通过 `Object.defineProperty` 设置 `setter` 与 `getter` ，用来实现「**响应式**」以及「**依赖收集**」

初始化之后调用 `$mount` 挂载组件

![1606e7eaa2a664e8](https://tva1.sinaimg.cn/large/006tNbRwly1g9wmjko8xrj31780u0dik.jpg)

简化版

![image-20191214225028697](https://tva1.sinaimg.cn/large/006tNbRwly1g9wn15bw9uj314q0lwwi7.jpg)



#### 编译

编译模块分为三个阶段

1. parse

   使用正则解析 template 中的 vue 指令(v-xx) 变量等等，形成语法树AST

2. optimize

   标记一些静态节点，用作后面的性能优化，在 diff 的时候直接略过

3. generate

   把第一步生成的 AST 转化为渲染函数 render function



#### 响应式

vue 最核心的内容

getter 和 setter，初始化的时候通过 defineProperty 进行绑定，设置通知的机制当编译生成的渲染函数被实际渲染的时候，会触发 getter 进行依赖收集，在数据发生变化的时候，触发 setter 进行更新



#### 虚拟 dom

Virtual DOM 是react首创，vue2开始支持，就是用 JavaScript 对象来描述DOM结构，数据修改的时候，先修改虚拟DOM中的数据，然后数据做diff，最后再汇总所有的 diff，力求做最少的 dom操作，毕竟 js 里对比很快，而真实的DOM操作太慢

```html
// dom
<div name="kai" style="color: red" @click="xx">
  <a>click me</a>
</div>
```

```js
// vdom
{
  tag: 'div',
  props: {
    name: 'kai',
    style: { color: red },
    onClick: xx
  },
  children: [
    {
      tag: 'a',
      text: 'click me'
    }
  ]
}
```





### vue 响应式的原理 defineProperty

```js
class KVue {
  constructor(options) {
    this._data = options.data;
    this.observer(this._data);
  }
  observer (value) {
    if (!value || typeof value !== "object") {
      return;
    }
    Object.keys(value).forEach(key => {
      this.defineReactive(value, key, value[key]);
    });
  }
  defineReactive (obj, key, val) {
    Object.defineProperty(obj, key, {
      enumerable: true /* 属性可枚举 */,
      configurable: true /* 属性可被修改或删除 */,
      get () {
        return val;
      },
      set (newVal) {
        if (newVal === val) return;
        this.cb(newVal);
      }
    });
  }

  cb (val) {
    console.log("更新数据了", val);
  }
}

let o = new KVue({
  data: {
    test: "I am test."
  }
});
o._data.test = "hello,kaikeba";
```



#### 依赖收集与追踪

```js
new Vue({
  template:
    `<div>
      <span>{{text1}}</span>
    <div>`,
  data: {
    text1: 'name1',
    text2: 'name2'
  },
  created () {
    this.text1 = "开课吧"
  }
});
```

text1被修改，所以视图更新，但是text2视图没用到，所以不需要更新，如何实现呢，就需要我们的依赖收集

```js
// 依赖收集
class Dep {
  constructor() {
    // 存数所有的依赖
    this.deps = []
  }
  // 在deps中添加一个监听器对象
  addDep (dep) {
    this.deps.push(dep)
  }
  // 通知所有监听器去更新视图
  notify () {
    this.deps.forEach((dep) => {
      dep.update()
    })
  }
}
```

```js
class Watcher {
  constructor() {
    // 在new一个监听器对象时将该对象赋值给Dep.target，在get中会用到
    Dep.target = this
  }
  // 更新视图的方法
  update () {
    console.log("视图更新啦～")
  }
}
```

