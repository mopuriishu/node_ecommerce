const express = require('express')
const router = express.Router()
const { User } = require('../models/user')
const { authenticateUser } = require('../middlewares/authentication');
const { CartLineItem } = require('../models/cart_line_items')



//register
//post /user

router.post('/', function(req, res){
    let body = req.body
    let user = new User(body)
    user.save().then(function(user){
        res.send({
            user,
            notice: 'successfully registered'
        })
    }).catch(function(err){
        res.send(err)
    })
})


//login
// post  /users/login
// router.post('/login', function(req,  res){
//     let body = req.body;
//     //User.findOne({email: body.email, password: body.password})
//     User.findByCredentials(body.email, body.password)
//     .then(function(user){
//         res.send(user)
//     }).catch(function(err){
//         res.status(401).send(err)
//     })
// })

router.post('/login', function(req,  res){
    let body = req.body;
    //User.findOne({email: body.email, password: body.password})
    User.findByCredentials(body.email, body.password).then(function(user){
        return user.generateToken()
    })
    .then((token) => {
        res.header('x-auth', token).send()
    })
    .catch(function(err){
        res.status(401).send(err)
    })
})
    

// const authenticateUser = (req, res, next) => {
//     const token = req.header('x-auth')
//     User.findByToken(token).then((user) => {
//         req.user = user   //adding user property to req 
//         req.token = token   //adding token property to token
//         next()
//     }).catch((err) => {
//         res.send({
//             notice: err
//         })
//     })
// }

//private routes
//users/accounts
router.get('/accounts', authenticateUser, function(req, res){
    const user = req.user 
    res.send(user)
})

//GET users/cart_line_items
// router.get('/cart_line_items', authenticateUser, function(req, res){
//     let user = req.user 
//     res.send(user.cartLineItems)
// })

// //post users/cart_line_items
// router.post('/cart_line_items', authenticateUser, function(req, res){
//     const body = req.body 
//     const user = req.user 
//     const cartLineItem = new cartLineItem(body)
//     user.save().then(function(user){
//         res.send({
//             cartLineItem,
//             notice: 'Successfully added the product to your cart'
//         })
//     }).catch(function(err){
//         res.send(err)
//     })
// })

///Pending
// router.post('/cart_line_items', authenticateUser, function(req, res){
//     const body = req.body 
//     const user = req.user 
//     const cartLineItem = new cartLineItem(body)
//     //objectID == objectID
//     //cartItem.product.equals(cartLineItem.product)
//     const inCart = user.cartLineItems.find(cartItem => cartItem.product)

//     user.save().then(function(user){
//         res.send({
//             cartLineItem,
//             notice: 'Successfully added the product to your cart'
//         })
//     }).catch(function(err){
//         res.send(err)
//     })
// })

//GET users/whishlist
// router.get('/whishlists', authenticateUser, function(req, res){
//     let user = req.user 
//     res.send(user.whishlists)
// })

//POST users/whishlist
// router.post('/whishlists', authenticateUser, function(req, res){
//     const body = req.body 
//     const user = req.user 
//     const cartlineItem = new whishlist(body)

//     const inWishlist = user.whishlists.find(whishlist => whishlist.product.equals(whishlist.product))
//     if(!inWhishlist) {
//        user.whishlists.push(data)
//     }

//     user.save().then(function(user){
//         res.send({
//             whishlist,
//             notice: 'Successfully added the product to your whishlist'
//         }).catch(function(err){
//             res.send(err)
//         })
//     })
// })

// router.delete('/whishlist', authenticateUser, function(req, res){
//     const wishlistId = req.params.id
//     const user = req.user 

//     user.whishlists.id(wishlistId).remove()
//     user.save().then((user) => {
//         res.send({
//             notice: 'removed the product from the card'
//         })
//     }).catch((err) => {
//         res.send(err)
//     })
// })

// router.post('/whish_lists', authenticateUser, function(req, res){
//     const body = req.body 
//     const user = req.user 
//     const cartLineItem = new cartLineItem(body)
//     //objectID == objectID
//     //cartItem.product.equals(cartLineItem.product)
//     const inCart = user.cartLineItems.find(cartItem => cartItem.product)

//     user.save().then(function(user){
//         res.send({
//             cartLineItem,
//             notice: 'Successfully added the product to your cart'
//         })
//     }).catch(function(err){
//         res.send(err)
//     })
// })




// router.post('/cart_line_items', authenticateUser, function(req, res){
//     const body = req.body 
//     const user = req.user 
//     const cartLineItem = new cartLineItem(body)
//     const cart_product = cartLineItem.product
//     if(user.cart_product){
//     user.quantity += 1
//     user.save().then(function(user){
//         res.send({
//             cartLineItem,
//             notice: 'Successfully added the product to your cart'
//         }).catch(function(err){
//             res.send(err)
//         })
//     })
//     }else{
//      user.save().then(function(user){
//         res.send({
//             cartLineItem,
//             notice: 'Successfully added the product to your cart'
//         }).catch(function(err){
//             res.send(err)
//         })
//     })
//     }
// })

// //PUT users/cart_line_items/:id

// router.put('/cart_line_items', authenticateUser, function(req, res){
//     const product_id = req.id
//     const body = req.body
//     const user = req.user 
//     const cartLineItem = new cartLineItem(body)
//     const cart_product = cartLineItem.product
//     if(user.product_id){
//         user.quantity += 1
//         user.save().then(function(user){
//             res.send({
//                 cartLineItem,
//                 notice: 'Successfully added the product to your cart'
//             }).catch(function(err){
//                 res.send(err)
//             })
//         })
//         }else{
//          user.save().then(function(user){
//             res.send({
//                 cartLineItem,
//                 notice: 'Successfully added the product to your cart'
//             }).catch(function(err){
//                 res.send(err)
//             })
//         })
//         }
// })

// //Delete users/cart_line_items/:id
// router.delete('/cart_line_items', authenticateUser, function(req, res){
//     const product_id = req.params.id
//     const body = req.body
//     const user = req.user 
//     const cartLineItem = new cartLineItem(body)
//     const cart_product = cartLineItem.product
//     if(product_id){
//         user.quantity += 1
//     //    delete.
//         }else{
//          user.save().then(function(user){
//             res.send({
//                 cartLineItem,
//                 notice: 'Successfully added the product to your cart'
//             }).catch(function(err){
//                 res.send(err)
//             })
//         })
//         }
// })


// router.delete('/cart_line_items/:id', authenticateUser ,(req,res) => {
//     let id = req.params.id;
//     const cartLineItem = new cartLineItem(body)
//     const findUser = user.find(user => user.id == id)

//     cartLineItem.findByIdAndDelete(id).then( (line_item) => {
//        if(line_item){
//            res.send({
//                line_item,
//                notice: "Successfully Deleted The Record"
//            });
//        }else{
//            res.send({
//                notice: "Record Not Found"
//            })
//        }
//     }).catch( (err) => {
//        res.send(err);
//     })
// })


// router.put('/cart_line_items/:id', authenticateUser ,(req,res) => {
//     let id = req.params.id;
//     let user = req.user
//     const cartLineItem = new cartLineItem(body)
//     cartLineItem.findByIdAndDelete(id).then( (line_item) => {
//        if(line_item){
//            res.send({
//                line_item,
//                notice: "Successfully Deleted The Record"
//            });
//        }else{
//            res.send({
//                notice: "Record Not Found"
//            })
//        }
//     }).catch( (err) => {
//        res.send(err);
//     })
// })




module.exports = {
    usersController: router
}

//edo-> define a func and call immediatly