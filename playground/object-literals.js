// concise object properties

let firstName = 'ishwarya';
let lastName = 'Lakshmi';

// es5
var player = { 
    firstName: firstName,
    lastName: lastName
}

// es5
var fName= player.firstName;
var lName = player.lastName

console.log(fName,lName)

// es6

const person = {
    firstName,
    lastName
}
console.log(person);

// Concise object methods
// es5

var car = {
    name: 'civic',
    model: 1998,
    deatils: function(){
        return this.name + '' + this.model;
    }
}
console.log(car.deatils());

// es6

var product = {
    name: 'civic',
    price: 15,
    details(){
        return `${this.name} ${this.price}`;
    }
}
console.log(product.details());

const {name, price} = product;
console.log(name, price);
console.log(product);
// { name: 'civic', price: 15, details: [Function: details] }




