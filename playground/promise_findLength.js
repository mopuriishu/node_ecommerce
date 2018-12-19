function determine(n){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            if(n % 2 == 0){
                resolve('even')
            } else {
                reject('odd')
            }
        }, 2000)
        console.log('inside the promise function')
    })
}

determine(10)
.then(function(msg){
    console.log(msg)
})
.catch(function(err){
    console.log(err)
})

function findLength(str){
    return new Promise(function(resolve, reject){
            if(str.length > 5){
                resolve('valid')
            }else{
                reject('invalid')
            }
    })
}

findLength("ishwarya")
.then(function(msg){
    console.log(msg)
})
.catch(function(err){
    console.log(err)
})