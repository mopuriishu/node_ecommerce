function getUser(id){
    return new Promise(function(resolve, reject){
        const users = [
            {id: 1, name: 'ishu'},
            {id: 2, name: 'viji'},
            {id: 3, name: 'rani'}
        ]
        setTimeout(() => {
            let user = users.find(user => user.id == id)
            if(user) {
                resolve(user)
            } else {
                reject('user not found')
            }
        }, 1000)
    })
}

function getUserTasks(userId){
    return new Promise(function(resolve, reject){
        const tasks = [
            {id: 1,userId: 1, title: 'fix website'},
            {id: 2,userId: 1, title: 'fix seo'},
            {id: 3,userId: 2, title: 'get more candidates'}
        ]
        setTimeout(() => {
            let task = tasks.filter(task => task.userId == userId)
            resolve(userTasks)
        }, 2000);
    })
}

getUser(4).then(function(user){
    console.log(user)
    return getUserTasks(user.id)
})
.then((tasks) => {
    console.log(tasks)
    // return getTaskLog()  //if another function
})
.catch((err) => {
    console.log(err)
})

