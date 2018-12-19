const error = (value) => {
    console.log('error msg', value);
}

const success = (value) => {
    console.log('success msg', value);
}

const fetchUsers = (error, success) => {
    let random = Math.round(Math.random() * 100);

    // error first
    if(!(random > 90)){
        error('something has gone wrong');
        return
    }
    success('list of users');
}

fetchUsers(error, success);