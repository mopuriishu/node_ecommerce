const display = (value) => {
    console.log(value);
}

const add = (n1,n2,display) => {
    setTimeout(function(){
        let result = n1 + n2;
        display(result);
    },1000);
}
add(10,20,display);

const subtract = (n1,n2,display) => {
    setTimeout(() => {
        let result = n1 - n2;
        display(result);
    },1000);
}

subtract(10,5, (value) => {
    console.log(value);
})

// WebApi --> setTimeOut
// HeapStack
// MeanStack
