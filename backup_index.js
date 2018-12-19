var express = require('express');
var app = express();

// Route Handlers
// app.get('/',function(req,res){
//     res.send('<h2>Hello World</h2>');
// });

// app.listen(3000,function(){
//     console.log('listening on port 3000');
// });

app.get('/',(req,res) => {
    res.send('<h2>Hello World</h2>');
});

app.get('/about',(req,res) => {
    res.send('<h2>About the company</h2');
});

app.get('/contact',(req,res) => {
    res.send('<h2>Contact Details</h2>')
});

app.get('/service',(req,res) => {
    res.send('<h2>Service Area</h2>')
});

let products = [
    {id:1,name: 'Market', price: '15'},
    {id:2,name: 'Scale', price: '1025'},
    {id:3,name: 'Board', price: '45'},
]

app.get('/products',(req,res) => {
res.send(products);
});

app.get('/products/:id',(req,res) => {
    let id = req.params.id;
    let product = products.find(prod => prod.id == id);
    if(product){
        res.send(product);
    }else{
        res.send({
            notice: 'product you  are lokking for does not exit'
        });
    }
});

app.get('/products/name/:name',(req,res) => {
    let name = req.params.name;
    let filteredproducts = products.filter(prod => prod.name.toLowerCase().indexOf(name.toLowerCase()) >= 0);
    if(filteredproducts){
        res.send(filteredproducts);
    }else{
        res.send({
            notice: 'product you  are lokking for does not exit'
        });
    }
});

let users = [
    {id: "1", email: "1@gmail.com", name: 'user1'},
    {id: "2",email: "2@gmail.com", name: 'user2'},
    {id: "3",email: "3@gmail.com", name: 'user3'},
    {id: "4",email: "4@gmail.com", name: 'user3'},
    {id: "5",email: "5@gmail.com", name: 'user3'}
];

app.get('/users',(req,res)=>{
    res.send(users);
});

app.get('/users/:id',(req,res) => {
    let id = req.params.id;
    let user = users.find(user => user.id == id);
    // let user = users.find(function(user){
    //     user.id == id
    // });
    if(user){
        res.send(user);
    }else{
        res.send({notice: 'user not found'});
    }
})

// localhost:3000/users/show/name
app.get('/users/show/:name',(req,res) => {
    let name = req.params.name;
    let user = users.filter(user => user.name == name);
    if(user.length >0){
        res.send(user);
    }else{
        res.send({notice: 'user not found'});
    }
});

// localhost:3000/users/show/email/1@gmail.com
// /users/show?email = "";
app.get('/users/show/:email',(req,res) => {
    let email = req.params.email;
    let user = users.find(user => user.email == email);
    if(user){
        res.send(user);
    }else{
        res.send({notice: 'user not found'});
    }
})

// localhost:3000/profile/user1
app.get('/users/profile/:name',(req,res) => {
    let name = req.params.name;
    let user = users.filter(user => user.name == name);
    if(user.length >0){
        res.send(user);
    }else{
        res.send({notice: 'user not found'});
    }
});




app.listen(3000,() => {
    console.log('listening on port 3000');
});