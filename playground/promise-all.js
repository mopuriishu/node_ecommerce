function apiCall1(){
    return new Promise(function(resolve, reject){
        setTimeout(() => {
            resolve(['ishu', 'rani', 'viji', 'madhuri'])
        }, 4000);
    })
}

function apiCall2(){
    return new Promise(function(resolve, reject){
        setTimeout(() => {
            resolve(['fix homePage', 'get banner for fb' , 'take db backu'])
        }, 1000);
    })
}

function apiCall3(){
    return new Promise(function(resolve, reject){
        setTimeout(() => {
            reject('!Oops  Something went wrong')
        }, 500)
    })
}

Promise.all([apiCall1(), apiCall2(), apiCall3()]).then((values) => {
    console.log(values)
}).catch((err) => {
    console.log(err)
})


