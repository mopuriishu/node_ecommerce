// FUNCTION EXPRESSION
// Variation 1
// Keyword function is removed and => is added
const sum = (n1,n2) => {
    return n1 + n2;
}
console.log(sum(10,2));

// Variation 2
// if there is only 1 statemment to be executed inside the function we can write it on the same line,without the  { }
const sum = (n1,n2) => n1 + n2;
console.log(sum(10,2));

// FOR EACH
//VARIATION 1
numbers.forEach((n) => {
    console.log(n);
});

// VARIATION 2
numbers.forEach((n) => console.log(n));

// VARIANTION 3
// if the function 
nummbers.forEach(n => console.log(n));

// Filter 
// es5
