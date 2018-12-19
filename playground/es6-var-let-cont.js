var name  =  'ani';

// declare once and assign once
const city = "banglore";
console.log(city);
// city = 'mysore'; //reassignment not allowed
// const city = 'mysore'; // redeclarion not allowed

let country = 'india';
console.log(country);
// reassign  values is allowed
country = 'us';
console.log(country);

// redeclare not allowed
// let country = 'sri lanka';

// var if function scoped and not block scoped
for(var i=0; i<5; i++ ){
    // console.log(i);
}
console.log(i);

// how can you make var block scope
(function(){
    for(var i=0; i<5; i++){
        // console.log(i);
    }
})();
console.log(i);

// let  is blocked scoped
for(let index = 0;index<5; index++){
    // console.log(index);
}
// console.log(index); we cannot access it outside the block {}

var user={
    name: 'mohan'
}

if(true){
    let user = {
        name: 'ani'
    }
    console.log('inside if', user);
}
console.log('outside if', user);


// console.log(user);
(function(){
    let firstName = 'ani';
})();
// console.log(firstName);