const jwt = require('jsonwebtoken')

const tokenData = {
    userId: 1,
}

const token = jwt.sign(tokenData, 'supersecret')   //( ,random sting like  gensalt)

console.log(token)