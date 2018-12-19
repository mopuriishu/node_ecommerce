const mongoose = require('mongoose')
const Schema = mongoose.Schema


const wishListSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
})

//business login

//CartLineItemSchema.methods

//CartLineItemSchema.stitics

//cartLineItemSchema.pre('save', function(){})

const Wishlist = mongoose.model('Wishlist', wishListSchema)

module.exports = {
    wishListSchema,  //Schema
    Wishlist    //Model
}