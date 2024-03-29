#### computed和watch的区别

computed和watch不是同一个东西，实际无法进行对比。

computed用于计算`产生新的数据`

watch用于`监听现有数据`

好的框架功能应该具备单一性，computed和watch是各自的功能


#### computed为什么能实现缓存的功能

computed有缓存，只要computed依赖的值不变，computed就不会重新进行计算

method没有缓存

#### vue中改变了一个data中的值，但是视图未更新，如何拿到更新后的值

1. 首先确认是不是vue2中的响应式缺陷：(1)直接操作数组下标不会dom更新；(2)对象和数组新增属性需要手动设置set
2. Dom 未渲染：(1)dom挂载之前的数据变化是不会在此次更新的，需要放在mouted生命周期里；(2)使用`$nextTick`在下一次更新前取值

#### vue生命周期以及每个生命周期都做了什么

可以分为三个阶段：渲染阶段、更新阶段、销毁阶段、keep-alive组件的特殊生命周期

渲染阶段

`beforeCreate`: 创建一个空白的vue实例，data,method尚未初始化

`created`: vue实例初始化完成，完成了响应式绑定。data, method已经初始化完成，可以调用。尚未开始渲染模板。可以做一些与Dom 节点无关的操作，但不要操作模板。

`beforeMount`: 编译模板，调用render生成vdom，但是还没有将vdom转化为Dom, 即未开始 Dom 渲染

`mounted`:完成了 Dom 渲染，`组件创建完成`。开始由创建阶段，`进入运行阶段`

更新阶段

`beforeUpdate`: data发生变化之后，此时准备更新 Dom，但尚未更新 Dom

`updated`: data发生变化，且Dom 更新完成。但是不要在updated中修改data，可能会导致死循环。

销毁阶段

`beforeUnmount`: 组件进入销毁阶段，但尚未销毁，仍可正常使用。可以在这里移除、解绑一些全局事件、自定义事件、定时器等

`unmounted`: 组件销毁完成，所以子组件也已经销毁

keep-alive组件的生命周期

`activated`: 缓存组件被激活。但这个钩子在服务端渲染时不会被调用。

`deactivated`: 组件被隐藏，实际是组件从 DOM 中被移除时调用，但不销毁重建。但这个钩子在服务端渲染时不会被调用

#### Vue 中什么时候操作 Dom 比较合适

mounted和updated都不能保证`子组件`全部挂载完成。在这两个生命周期函数里，应该使用`$nextTick`渲染 Dom

```javascript
mounted(){
    this.$nextTick(function(){
        // 整个视图被渲染后才会执行的操作
    })
}
```

#### 网络请求应该放在哪个生命周期里

可以放在`create`和`mounted`中，但放在`mounted`更好。因此`create`和`mounted`之间进行的dom-diff和dom渲染操作会很快，不会有很长的间隔。在`create`发出的网络请求可能在`mounted`完成后都还没有完成。

#### vue3中的生命周期和 Vue2有什么区别

1. setup代替了`beforeCreated`和`Created`
2. 使用`hooks`函数的形式，将`mounted`改成了`onMounted`等


#### Vue2，Vue3，React 中的diff算法有何不同

首先diff算法是什么？通过vdom和dom进行对比，找出不同再进行更新的。

github中的pull request中就用到了diff算法

但是严格diff两棵树，需要O(n^3)，不可用，需要优化才能使用

diff优化：

1. 只比较同一层级，不跨级比较，因为很少跨级dom移动
2. tag 不同就删除重建，不再比较内部细节
3. 子节点通过`key`进行区别

核心：找到必须移动的dom元素

React-diff：仅右移

Vue2: 双端比较，四个指针相互比较。对于中间插入dom节点的操作效率很高

Vue3：最长递增子序列，减少中间元素的移动


#### 为什么循环时子元素必须使用key

diff算法会根据key判断元素是否要删除，如何匹配到key则只会移动元素而不是进行删除重建；未匹配到key则删除重建，性能较差。


#### vue是如何生成组件的

#### 模板是如何编译的

#### keep-alive组件

#### nextTick 

vue响应式并不是数据发生变化后DOM 立即发生变化，而是观察到数据变化后开启一个任务队列，将同一个事件循环中观察到的数据变化的Watcher添加到任务队列。

nextTick是为了在数据变化后，等待 Vue 完成Dom 更新，数据变化之后立即执行nextTick中的回调。利用的是浏览器的宏任务和微任务。

#### nextTick 的实际应用

1. `created`中使用`$nextTick`操作 Dom。在下一轮事件循环开始后(此时dom 已完成挂载)，执行`created`中的`$nextTick`操作。
2. 解决修改数据但页面没有改变的问题。因为数据更新和 Dom 改变不是实时的。

#### 插槽

父组件决定子组件的内容是什么，让使用者决定某一块区域放置什么元素和内容。也可以用于父子组件间的传值。如果使用作用域插槽，还可以将子组件的值传给父组件。

作用域插槽：默认情况下插槽的内容无法访问到子组件的状态。然而在某些场景下插槽的内容可能想要同时使用父组件域内和子组件域内的数据。做法是可以像对组件传递 props 那样，向一个插槽的出口上传递 attributes：

```javascript
// 子组件
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```

父组件通过子组件标签上的 v-slot 指令，直接接收到了一个插槽 props 对象
```javascript
// 父组件
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
```

#### 组件通信

1. prop和$emit
2. 自定义事件
3. $attrs
4. $parent
5. $refs
6. provide/inject
7. vuex

根据适合场景划分：

1. 父子通讯

(1)子组件用`props`接收事件，用`emits`触发父组件改变数据的操作

(2)使用`$attrs`接收子组件未在`props`中接收，但父组件传递了的剩下数据。

(3)`mounted`中通过`this.$parent`可以直接获取父节点属性和方法；通过`this.$children`可以获取子节点属性和方法，而vue3中可以使用`this.$refs`获取子节点属性和方法

2. 上下级组件(跨多级)通讯

(1)自定义事件，即事件总线。

Vue2 可以在独立文件中通过直接`new Vue()`直接生成事件总线

Vue3 中需要引入第三方事件总线库`event-emitter`

在 A 组件里引入事件总线，在`mounted`生命周期中通过`event.on`监听事件，在`beforeUnmounted`生命周期中通过`evnet.off`将事件解绑。为了进行函数解绑，因此传入回调函数时，应该使用具名函数，不能使用匿名函数。

在 B 组件中引入事件总线，通过`event.emit`发出事件。

这样 A 组件就能监听到 B 组件发出的事件并监听到。

但是多监听多触发，容易混乱

------------------

(2)`$attrs` + `v-bind`

存在三个组件A，B，C，它们之间的包含关系为，A > B > C, A传递了三个属性a,b,c和对应的三个方法`getA`,`getB`,`getC`给 B，但是B只在`props`和`emits`里接收了一个属性`a`和一个方法`getA`。这时 B 未接收的剩下属性和方法就存放在了`$attrs`中。

注意：Vue2 中，子组件未传递到它的下一级组件的属性是放在`$attrs`中，方法是放在`$listeners`中。而 Vue3 里，移除了`$listeners`，将属性和方法全部放在了`$attrs`中。

然后 B 给 C 传递了 A 的三个属性和三个方法，因为 B 并未接收 C 传递过来的属性`b`,`c`以及对应的方法`getB`和`getC`。此时可以通过`v-bind:$attrs`传递给 C 。

注意：如果子组件中只有一个节点，那么父组件传递的信息会填充在该子组件的唯一 Dom 节点中。如果子组件不想被填充信息，那么可以通过`inheritAttrs:false`取消。如果子组件中的节点数多于 1，则没有此问题。


(3) `provide`和`inject`

祖先组件中提供`provide`，下面任意层级的组件中都可以通过`inject`取到

```javascript
provide(){
  return {
    info：computed(()=>this.age)
  }
}
```

3. 全局通讯

vuex, pinio


#### 谈谈对vue/react框架的理解

核心价值：`数据和视图分离`，`数据驱动视图`。只关注业务数据，不再关注DOM 变化。

整体思想：数据变化 => 生成新的vdom =>  dom diff => 更新dom 

vdom的价值: 用js对象模拟 Dom 节点。使用vdom实现数据驱动视图。




