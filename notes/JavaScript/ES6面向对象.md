#### 类的定义

1.`constructor()`相当于`new`，会对`this`进行复制，并对新对象的`prototype`进行赋值

2.普通方法是挂载在类的原型对象上

3.静态方法直接挂载在类上面，定义时要使用`statci`，需要通过类名直接调用

4.通过类的访问器方法,可以对特定属性的拦截访问/设置操作

```javascript
class  Person{
    // 类的构造方法
    constructor(name,age){
        this.name = name
        this.age = age
        this._address = "China"
    }

    // 普通方法，实例共享
    run(){

    }

    // 类的访问器方法,可拦截访问/设置操作
    get address(){
        return this._address
    }

    set address(newAddress){
        this._address = newAddress
    }

    // 类静态方法/类方法,可直接通过类名调用
    static randomPerson(){

    }
}
```

#### 类的继承

1.类继承使用`extends`关键字

2.继承父类属性,必须在`constructor`里使用this前调用super,即调用父类构造方法 

3.可以完全重写父类方法，子类实例会调用子类的方法而不是父类

4.可以继承父类方法，并增加新的逻辑，继承父类方法时需要使用`super`进行调用

5.可以继承父类的静态方法,但要求子类也必须是静态方法。继承父类方法时需要使用`super`进行调用

```javascript
//类的继承
class Student extends Person{
    constructor(name,age,grade){
        // 继承父类属性,必须在使用this前调用super,即调用父类构造方法 
        super(name,age)
        this.grade = grade
    }
    // 完全重写父类方法
    run(){
        console.log(`${this.name} running`)
    }
    // 继承父类方法，并增加逻辑
    sing(){
        super.sing(this.name)
        console.log('good')
    }
    // 继承静态方法,子类也必须是静态方法
    static randomStudent(){
        // 继承父类静态方法
        super.randomPerson()
        console.log('random student.')
    }

}

let student = new Student('flten',16)
student.run()
student.sing()
Student.randomStudent()
```


