function getUser(){
    return new Promise(function(resolve, reject){
        setTimeout(() => {
            resolve({id: 1, name: 'ishu'})
        }, 1000)
    })
}

function getUserTasks(){
    return new Promise(function(resolve, reject){
        setTimeout(() => {
            resolve(['fix header', 'finalize log', 'revamp admin score'])
        }, 2000);
    })
}

getUser().then(function(user){
    console.log(user)
    return getUserTasks()
})
.then((tasks) => {
    console.log(tasks)
    // return getTaskLog()  //if another function
})
.catch((err) => {
    console.log(err)
})

