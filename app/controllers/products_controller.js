const express = require('express');
const router = express.Router();
const { Product } = require('../models/product');
const { validateID } = require('../middlewares/utilities');

//Populate -> populate on arrayOfObjects or Single Object,in both types, in place of foriegn key(category_id) we will get reference information(of category eg. name,id,_v)

// {
//     "product": {
//         "codEligible": true,
//         "_id": "5bd4bb9fab872337781d7e21",
//         "category": "5bd4926b80d74b1d58b82fb6",
//         "name": "Chopper",
//         "price": 249,
//         "description": "Pigeon by Stovekraft New Handy Plastic Chopper with 3 Blades, Green",
//         "stock": 100,
//         "createdAt": "2018-10-27T19:25:19.426Z",
//         "__v": 0
//     },
//     "notice": "Successfully created"
// }
// 5bd492ad80d74b1d58b82fb4 (beauty),5bd4922080d74b1d58b82faf (electronocs)

// GET localhost:3000/products
router.get('/',(req,res) => {
    Product.find().populate('category').then( (products) => {
        res.send(products);
    }).catch( (err)=> {
        res.send(err);
    });
})

// POST localhost:3000/products   //middlewares will be authorization(sign),authentication
router.post('/', (req,res) => {
    let body = req.body;
     let product= new Product(body);
     product.save().then((product) => {
        res.send({
             product,
             notice: 'Successfully created'
        });
     }).catch( (err) => {
        res.send(err);
     })
});


// GET localhost:3000/products/:id
//populate(field name)
// i am populating on field called as category, my category referencing Category model,hence whatever objectid is here,it will go to the categories collection,fetch that record and send it back to us
// {
//     "codEligible": true,
//     "_id": "5bd4ca6dfea5273724a22b44",
//     "category":  "5bd4913780d74b1d58b82fa7",                              /getting only category id,whithout populate('category) --> gave this total reference to object 
//     "name": "Creative Educational Aids 0639 Fun...",
//     "price": 30490,
//     "description": "Fun with Words is an ideal resource to improve letter recognition, letter sounds and spelling to help children in building their language skills.",
//     "stock": 139,
//     "createdAt": "2018-10-27T20:28:29.826Z",
//     "__v": 0
// }
// router.get('/:id', (req,res) => {
//     let id = req.params.id;
//     Product.findById(id).then((product) => {   
//         if(!product){
//             res.send({
//                 notice: "Record Not Found"
//             })
//         }
//         res.send(product);
//     }).catch((err) => {
//         res.send(err);
//     });
// });


// GET localhost:3000/products/:id
//populate(field name)
// i am populating on field called as category, my category referencing Category model,hence whatever objectid is here,it will go to the categories collection,fetch that record and send it back to us
// {
//     "codEligible": true,
//     "_id": "5bd4ca6dfea5273724a22b44",
//     "category": {                               //populate('category) --> gave this total reference to object
//         "_id": "5bd4913780d74b1d58b82fa7",
//         "name": "Beauty, Toys & More",
//         "__v": 0
//     },
//     "name": "Creative Educational Aids 0639 Fun...",
//     "price": 30490,
//     "description": "Fun with Words is an ideal resource to improve letter recognition, letter sounds and spelling to help children in building their language skills.",
//     "stock": 139,
//     "createdAt": "2018-10-27T20:28:29.826Z",
//     "__v": 0
// }
//populate,middlewares
router.get('/:id', validateID ,(req,res) => {
    let id = req.params.id;
    Product.findById(id).populate('category').then((product) => {   
        if(!product){
            res.send({
                notice: "Record Not Found"
            })
        }
        res.send(product);
    }).catch((err) => {
        res.send(err);
    });
});

// Delete localhost:3000/products/:id
router.delete('/:id', validateID ,(req,res) => {
    let id = req.param.id;
    Product.findByIdAndDelete(id).then((product) => {
        if(!product){
            res.send({
                notice: "Record Not Found"
            })
        }
        res.send(product);
    }).catch( (err) => {
        res.send(err);
    });
});

// INSTACE METHOD USAGE
//products/id/short
// info of product like name id and price

router.get('/:id/short', validateID ,(req, res) => {
    let id = req.params.id;
    Product.findById(id).then(() => {
        // res.send({
        //     id: product.id,
        //     name: product.name,
        //     price: product.price
        // })
        res.send(product.shortInfo());
    })
})

// INSTANCE METHOD USAGE ON COLLECTION
// products/short/all
router.get('/short/all', (req,res) => {
    Product.find().then((products)=>{
        res.send(products.map(product => product.shortInfo()));
    })
})

module.exports = {
    productsController: router
}

//middleware --> helpers
//Authentication -> signin or not
// Authorization -> role
// JWT