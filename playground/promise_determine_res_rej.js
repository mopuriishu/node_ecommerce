function determine(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve('promise resolved');
        },2)
    })
}

determine().then(function(msg){
    console.log(msg)
});


function willReject(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            reject('promise rejected')
        },1)
    })
}

willReject()
.then(function(msg){
    console.log(msg)
})
.catch(function(err){
    console.log(err)
})