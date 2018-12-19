const express = require('express');
const router = express.Router();
const { Category } = require('../models/category');
const { Product } = require('../models/product');
const { validateID } = require('../middlewares/utilities');
const { authenticateUser, authorizeUser } = require('../middlewares/authentication')




//GET localhost:3000/categories/

router.get('/',(req,res) => {
    Category.find().then((categories) => {
        res.send(categories);
    }).catch((err) => {
        res.send(err);
    });
})

// router.get('/',(req,res) => {
//     let id = req.params.id;
//     Category.find().then((category) => {
//         if(!category){
//             res.send({
//                 notice: 'record not found'
//             })
//         }
//         res.send(category);
//     }).catch((err) => {
//         res.send(err);
//     });
// });


// POST locahost:3000/categories
router.post('/', (req, res) => {
    let body = req.body;
    let category = new Category(body);
    category.save().then((category) => {
        res.send({
            category,  //consise property
            notice: 'Scccessfuly createda category'
        });
    }).catch((err) => {
        res.send(err);
    });
});

//PUT 
// router.put('/', validateID,( req, res) => {
//     const id = req.params.id
//     let body = req.body;

//     Category.findByIdAndUpdate(id. {$set: body}, {new: true}.then(res.send(category)})
   
// });


// Get by  id
// GET localhost:3000/categories/:id
// router.get('/:id',(req,res) => {
//     let id = req.params.id;
//     Category.findById(id).then((category)=>{
//         if(category){
//             res.send(category);
//         }else{
//             res.send({
//                 notice: "Record Not Found"
//             })
//         }
     
//     }).catch( (err) => {
//      res.send(err)
//     })
//  })

// 2nd way to impleament without using if else
router.get('/:id',validateID,(req,res) => {
    let id = req.params.id;
    Category.findById(id).then((category)=>{
        if(!category){
            res.send({
                notice: "Record Not Found"
            })
        }
        res.send(category);
    }).catch( (err) => {
     res.send(err)
    })
 })



 router.delete('/:id', validateID ,(req,res) => {
     let id = req.params.id;
     Category.findByIdAndDelete(id).then( (category) => {
        if(category){
            res.send({
                category,
                notice: "Successfully Deleted The Record"
            });
        }else{
            res.send({
                notice: "Record Not Found"
            })
        }
     }).catch( (err) => {
        res.send(err);
     })
 })










// Delete localhost:3000/categories/:id
// router.delete('/:id', (req, res) => {
//     let id = req.params.id;
//     Category.findByIdAndDelete(id).then((category) => {
//         if(!category){
//             res.send({
//                 notice: 'record not found'
//             })
//         }
//         res.send({
//             category,
//             notice:  "Successfully deleted the record"
//         });
//     }).catch((err) => {
//         res.send(err)
//     });
// })

// expected output
// {
//     "_id": "5bd4871f2c41510bf030b6d4",
//     "name": "Kurtas",
//     "__v": 0
// }
// router.post('/', (req, res) => {
//     let body = req.body;
//     let category = new Category(body);
//     category.save().then((category) => {
//         res.send(category);
//     }).catch((err) => {
//         res.send(err);
//     });
// })

// Expected Output
// Scccessfuly createda category
// router.post('/', (req, res) => {
//     console.log(req.body);
//     res.send('Scccessfuly createda category');
// })

// // categories/id/products
// router.get('/:id/products',(req,res) => {
//     let categoryId = req.params.id;

//     Category.findAllProducts(categoryId).then((products) => {
//         res.send(products);
//     }).catch((err) => {
//         res.send(err);
//     })
//     // Product.find({category: categoryId}).then((products) => {
//     //     res.send(products)
//     // }).catch((err) => {
//     //     res.send(err);
//     // });
// });

// All products related to categoy id
// Categories/id/products
router.get('/:id/:products', (req,res) => {
    let categoryId = req.params.id;
    Category.findAllProducts(categoryId).then((products) => {
                res.send(products);
            }).catch((err) => {
                res.send(err);
            })
    // Product.find({category: categoryId}).then((products) => {
    //     res.send(products);
    // }).catch((err) => {
    //     res.send(err);
    // })
})



module.exports = {
    categoriesController: router
}
// const express = require('express');
// const router = express.Router();
// const { Category } = require('../models/category');

// //GET localhost:3000/categories/

// router.get('/',(req,res) => {
//     Category.find().then((categories) => {
//         res.send(categories);
//     }).catch((err) => {
//         res.send(err);
//     });
// })

// // POST locahost:3000/categories
// router.post('/', (req, res) => {
//     let body = req.body;
//     let category = new Category(body);
//     category.save().then((category) => {
//         res.send({
//             category,
//             notice: 'Scccessfuly createda category'
//         });
//     }).catch((err) => {
//         res.send(err);
//     });
// })

// module.exports = {
//     categoriesController: router
// }