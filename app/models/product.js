const mongoose = require('mongoose');
var validatePackage = require('validator');
var sh = require("shorthash");
const Schema = mongoose.Schema;

// Mongoose methods are of 2 types :- 1.Static Methods( (are nothing but Class variable when we are calling Methods)on class   are written), 2.Instance Methods(On object when we calling methods which are written)
// Static Methods examples:- find,findById 
// Product.find(); , Product.findById();
// Instance Methods :- product.save();
// Static :- On collection i  am performing the operation(calling to model)
// Instance methods :- we will have object that belongs to certain type


const productSchema = new Schema({
  //foreign key reference
  category: {
      type: Schema.Types.ObjectId, //ForiegnKey reference 
      //frontend we have dropdown which we will pass to vales to dropdown
      //Here we are setting what value it should accept
      //It wont go to categories table and look into this
      //It checks is user is passing the value for category is it valid object id type
      required: true,
      ref: 'Category' //this field references product called as Category
  },
  name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 128
  },
  price: {
      type: Number,
      required: true,
      min: 1  //for price, Number type, minimum length is represented as min not as minlength
  },
  description: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1000
  },
  stock: {
      type: Number,
      required: true,
      min: 0
  },
  codEligible: {
      type: Boolean,
      required: true,
      enum: [true, false], //picked from this array it cannot be T or F, It should be True or False
      default: true,
      validate: {
          validator: function(value){
              return !(this.price >= 2500 && this.codEligible)
          },
          message: function(){
              return 'cod eligibility not there if the product price is greater than 25000'
          }
      }
  },
  createdAt: {
      type: Date,
      default: Date.now
  },
  product_id: {
      type: String,
  },
  code: {
    type: String,
    // unique: true
    // required: true
}
//   available
});

// productSchema.methods.shortInfo = () => { } //ES6 Arrow function,this is empty object {} so we should not use
productSchema.methods.shortInfo = function(){
  // let product = this;
  console.log(this);
  return { 
    _id: this._id,
    name: this.name,
    price: this.price
  }
}

productSchema.pre('validate', function(next){
    let product = this
    let code = sh.unique(product._id.toString());
    product.code = `DCT-${code}`
    next()
})

const Product = mongoose.model('Product', productSchema);

module.exports = {
    Product
}