
面试题 1

```javascript
let name = "window";
let person = {
  name: "person",
  sayName: function () {
    console.log(this.name);
  }
};
function sayName() {
  let fn = person.sayName;
  fn(); // 独立函数调用，默认绑定，this 指向Window
  person.sayName(); // 作为对象方法调用，隐式绑定，this指向对象
  (person.sayName)(); // 与上面一样，不会因为加括号而变化
  (b = person.sayName)(); // 括号中的赋值表达式直接将整个函数作为结果，然后调用，成为独立函数调用，默认绑定，this 指向Window
}
sayName();
```

面试题 2

```javascript
var name = 'window'
var person1 = {
  name: 'person1',
  foo1: function () {
    console.log(this.name)
  },
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name)
    }
  },
  foo4: function () {
    return () => {
      console.log(this.name)
    }
  }
}

var person2 = { name: 'person2' }

person1.foo1(); // 隐式绑定，指向对象person1
person1.foo1.call(person2); //显示绑定>隐式绑定，指向对象person2

person1.foo2(); // 箭头函数this为上层作用域this，上层作用为 Window
person1.foo2.call(person2); // 箭头函头不绑定this，只会向上层作用域查找this，call也无法更改，上层作用为 Window

person1.foo3()(); // 先`person1.foo3()`时this绑定person1，但得到结果后再调用成为直接函数调用，默认绑定,this指向 Window
person1.foo3.call(person2)();//外层函数进行call调用时变为person2，但返回的内层函数又是直接调用，默认绑定,this指向 Window
person1.foo3().call(person2);//外层函数先调用得到内层函数，然后内层函数在进行call调用，显示绑定，绑定person2

person1.foo4()(); //第一次调用外层函数，外层函数this指向person1，然后得到内部箭头函数，内部箭头函数执行时向上层作用域找this，上层作用域是外层函数，外层函数的this指向person1
person1.foo4.call(person2)(); // 外层函数先进行call调用将this改为person2，然后得到内部箭头函数，内部箭头函数执行时向上层作用域找this，上层作用域是外层函数，外层函数的this已经改变为person2
person1.foo4().call(person2); //外层函数先执行，外层函数this指向person1，返回内层函数，内层函数是箭头函数，不绑定this，也不会被call改变，只会向上层作用域找this，为person1

```

面试题 3

```javascript
var name = 'window'
function Person (name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
  },
  this.foo2 = () => console.log(this.name),
  this.foo3 = function () {
    return function () {
      console.log(this.name)
    }
  },
  this.foo4 = function () {
    return () => {
      console.log(this.name)
    }
  }
}
var person1 = new Person('person1')  // => {'name':'person1', ...}
var person2 = new Person('person2')  // => {'name':'person2', ...}

person1.foo1() // 对象方法调用，隐式绑定
person1.foo1.call(person2) // 显式call绑定>隐式，this指向person2

person1.foo2() // 箭头函数不绑定this，上层作用域this指向Person函数,而 Person函数进行new操作时，this指向person1
person1.foo2.call(person2) // 箭头函数不绑定this不会别call影响，结果同上

person1.foo3()() //外层先执行，得到内部函数，又直接调用，默认绑定，指向 Window
person1.foo3.call(person2)()//外层先call调用绑定为person2，但得到内部函数又直接调用，依然默认绑定，指向 Window
person1.foo3().call(person2)//外层函数先执行，得到内部函数，对内部函数进行call调用，显式绑定，this指向person2

person1.foo4()() // 外部函数先执行，返回内部箭头函数，找上层作用域的this，即外层函数的this，为person1
person1.foo4.call(person2)()//先对外部函数进行call调用，this已变为person2，返回内部箭头函数，找上层作用域的this，即外层函数的this，为person2
person1.foo4().call(person2)//外部函数先执行this指向person1,内部箭头函数不会被call影响，找上层作用域的this，即外层函数的this，为person1
```

面试题 4

```javascript
var name = 'window'
function Person (name) {
  this.name = name
  this.obj = {
    name: 'obj',
    foo1: function () {
      return function () {
        console.log(this.name)
      }
    },
    foo2: function () {
      return () => {
        console.log(this.name)
      }
    }
  }
}
var person1 = new Person('person1')
var person2 = new Person('person2')

person1.obj.foo1()() //person1.obj对象调用foo1外层函数得到内层函数，但内层函数是直接调用的，默认绑定，this指向 Window
person1.obj.foo1.call(person2)() //person1.obj用call调用foo1将其外层函数this改为person2，但内层函数还是直接调用的，默认绑定，this指向 Window
person1.obj.foo1().call(person2)//person1.obj对象调用foo1外层函数得到内层函数，用call调用内层函数，并将其this改为person2

person1.obj.foo2()()//外层函数执行后得到内部箭头函数，向上找上层作用域为外层函数foo2，而foo2的调用者为obj，所以上层作用域指向this
person1.obj.foo2.call(person2)()//外层函数foo2使用call调用并绑定this为 person2，得到内部箭头函数直接执行，找上层作用域的this，为外层函数的person2
person1.obj.foo2().call(person2)//外层函数foo2调用时this指向obj，返回的内部箭头函数不绑定 this 不会被call影响，找上层作用域的this，为obj
```