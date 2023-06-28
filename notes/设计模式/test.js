var Container = function(x){
    this._value = x;
}

Container.of = x => new Container(x);
Container.prototype.map = function(f){
    return Container.of(f(this._value))
}

Container.of(3)
         .map(x => x + 1)
         .map(x => console.log(`The result is ${x}`)) // 4