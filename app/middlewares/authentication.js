const { User } = require('../models/user')

const authenticateUser = (req, res, next) => {
    const token = req.header('x-auth')
    
    User.findByToken(token).then((user) => {
        req.user = user   //adding user property to req 
        req.token = token   //adding token property to token
        next()
    }).catch((err) => {
        res.send({
            notice: err
        })
    })
}


const authorizeUser = (req, res, next) => {
    const currentUser = req.user 
    if(currentUser.role == 'admin') {
        next()
    } else {
        res.status(403).send({
            notice: 'access denied'
        })
    }
}


module.exports = {
    authenticateUser,
    authorizeUser
}