// const product_data = {
//     name: 'ishwarya',
//     price: 15,
//     details(){
//         return `${this.name} ${this.price}`;
//     }
// }

function Product(data){
    this.name = data.name;
    this.price = data.price;
    this.details = function(){
        return `${this.name} ${this.price}`;
    }
}

module.exports = {
    Product
}
    


// Product(product_data);