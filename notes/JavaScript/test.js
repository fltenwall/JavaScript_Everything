let x = [12, 23];
const fn = function(y){
    y[0] = 100;
    y = 100;
    y[1] = 200;
    console.log(y);
};
fn(x);
console.log(x)

/*
100
[ 100, 23 ]
*/