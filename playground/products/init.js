const {Product} = require('./product');

let p1 = new Product({name: 'market' , price: 15});

console.log(p1.details());

const {User} = require('./user');

let u1 = new User({username: 'ishwarya', email: 'milakshmi33@gmail.com'});

console.log(u1.details());

func = require('./file1');
console.log(func());

 const name = require('./file2');
 console.log(name);
