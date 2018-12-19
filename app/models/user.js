const mongoose = require('mongoose')
var validatePackage = require('validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { cartLineItemSchema } = require('./cart_line_items');
const { addressSchema } = require('./address')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 24,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 128
    },
    email: {
        type: String,
        required: true,
        unique:  true,
        //TODO
        //custom validation to dertermine the format
        validate: {
            validator: function(value){ //if function returns false 
                return validatePackage.isEmail(value)
            },
            message: function() {  //message used to show to the user
                return 'invalid email format'
            }
        }
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        //TODO //custom valdation to check format of mobile
        trim: true,
        validate: {
            validator: function(value){
                return validatePackage.isNumeric(value)
            },
            message: function(){
                return 'invalid email format'
            }
        }
    },
    tokens: [
        {
            token: {
                type: String
            }
        }
    ],
    cartLineItems: [cartLineItemSchema],
    wishlists: [
        {
            whishlist: {
                type: String
            }
        }
    ],
    role: ['admin', 'customer'],
    address: [addressSchema]
})

//tokens = [{_id: 1, token: '12345tyfyuhfg6557'}, {_id: 2, token: '6876987uyfyugyuhg876'}]
//npm install --save bcryptjs

//mongoose middleware functions - pre hooks or post hooks
userSchema.pre('save', function(next){
    let user = this
    if(user.isNew){
        bcrypt.genSalt(10).then(function(salt){
            bcrypt.hash(user.password, salt).then(function(encrypted){
                user.password = encrypted
                next()
            })
        })  
    } else {
        next()
    }
})

userSchema.pre('save', function(next){
    let user = this 
    if(user.isNew){
        
    }
})

userSchema.pre('save', function(next){
    let user = this 
    if(user.isNew) {
        User.countDocuments().then((count) => {
            if(count == 0){
                user.role = 'admin'
            }
            next()
        })
    } else {
        next()
    }
})

userSchema.statics.findByCredentials = function(email, password){
    let User = this 
    return User.findOne({email: email}).then(function(user){
        if(!user){
            return Promise.reject('invalid email or password')
        }

        return bcrypt.compare(password, user.password).then(function(result){
            if(result) {
                return Promise.resolve(user)
            }else{
                return Promise.reject('invalid email or password')
            }
        })

        // return new Promise(function(resolve, reject){
        //     bcrypt.compare(password,  user.password).then(function(res){
        //         if(res){
        //             resolve(user)
        //         }else{
        //             reject('invalid password')
        //         }
        //     })
        // })

    })
}

// Generate TOken while login
userSchema.methods.generateToken = function(){
    const user = this
    const tokenData = {
        userId : user._id
    }
    const token = jwt.sign(tokenData, 'supersecret')
    user.tokens.push({
        token
    })
    return user.save().then((user) => {
        return Promise.resolve(token)
    })
}

// FindToken  while user logged in
userSchema.statics.findByToken = function(token){
    let User = this
    let tokenData
    try {
        tokenData = jwt.verify(token, 'supersecret')   //verify is this valid JWT token
    } catch(e) {
        return Promise.reject(e)
    }

    return User.findOne({
        '_id': tokenData.userId,
        'tokens.token' : token  //array of objects to call we need to pass inside string
    })
}



const User = mongoose.model('User',userSchema)

module.exports = {
    User
}

//plugin if i add it will add to db or header. file


//cartlineitems specific to user

// one-one -> Regular Object ->single nested (no need to multiple quires)
//one-many -> object(Array of object)  -> .id -> push and add to subdoc  -> remove()

// Array of objects  ==> one-many  ==>  cartLineItems: [CartLineItemSchema]
// objects ===> one-one  ==>  cartLineItems: CartLineItemSchema


//find SQL -> instance level find and delete
//find NOSQL -> class level, find total record and delete

// TO push 
// push and save 

//address:[{type: address,  geo: [{ lat , lon}]}]

