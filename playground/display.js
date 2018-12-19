
const { quote, name, city, add } = require('/data');
const { users } = require('./users/info');
console.log(quote,name);
console.log(users);

// console.log(require('./data'));  //retun object
// console.log(quote); //reference errror as the variable not there
// console.filterData = require('./data'); //object assigned to variable 
// console.log(filterData.quote)  //invoking one of the pro

// // make  it availale as independent variable
// const quote = require('./data').quote;
// const add = require('./data').add;

// console.log(quote);

// obj disturbing