// function Person(data){
//     this.firstName =  data.firstName,
//     this.lastName = data.lastName
//     this.details = function(){
//         return `{this.firstName} {this.lastName}`
//     }
// }

function Movie(){

}
Movie.data = [
    {id: 1, name: 'Harry Poter'},
    {id: 2,name: 'Loard Of Rings'},
    {id: 3,name: 'Happy Days'}
];

Movie.all = function(){
    return Movie.data;
}

Movie.findById = function(id){
    return Movie.data.find(movie => movie.id == id );
}

module.exports = {
    Movie
}