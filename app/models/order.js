const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    orderDate: {
        type: Date,
        default: Date.now
    },
    orderNumber: {
        type: String,
        // required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    total: {
        type: Number
    },
    status: {
        type: String,
        enum: ['open', 'confirmed', 'delivered'],
        default: 'confirmed'
    },
    orderLineItems: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number
            },
            price: {
                type: Number
            }
        }
    ]
})

const Order = mongoose.model('Order',orderSchema)

orderSchema.pre('validate', function(next){
    let order = this 
    order.orderNumber = `DCT-${shorthash.uniq(order._id.toString())}`
    next()
})


orderSchema.pre('save', function(next){
    let order = this 
    if(order.isNew){
        let cartTotal = 0
        User.findOne({ _id: order.user }).populate('cartLineItems.product').then(function(user){
            // console.log(user.cartLineItems)
            user.cartLineItems.forEach(function(user){
                let productData = {
                    product: lineItem.product._id,
                    quantity: lineItem.quantity,
                    price: lineItem.product.price

                }
                order.orderLineItems.push(productData)
                cartTotal += productData.price * productData.quantity
            })
            order.total = cartTotal
            next()
        })
        .catch(function(err){
            return new Promise(function(resolve, reject){
                reject(err)
            })
        })
    }else{
        next()
    }
})

orderSchema.post('save',function(next){
    let order = this 
        User.findByIdAndUpdate(order.user, {$set: { 'cartLineitems':  [] }}, {new: true}).then(function(user){
            next()
        })
        .catch(function(err){
            return Promise.reject(err)
        })
    })


module.exports = {
    Order
}