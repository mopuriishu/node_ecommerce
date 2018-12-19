function Book(){

}
Book.data = [
    {id:1, name: 'Harry Poter', author: 'JK Rowling'},
    {id:2, name: 'The day of the Jackel', author: 'Freodick'}
];

Book.all = function(){
    return Book.data;
}

Book.findById = function(id){
    // Book.data.find(function(book){
    //     return book.id == id;
    // });
    return Book.data.find(book => book.id == id);
}
module.exports = {
    Book
}