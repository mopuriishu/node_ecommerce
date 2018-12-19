function Person(data){
    this.firstName =  data.firstName,
    this.lastName = data.lastName
    this.details = function(){
        return `{this.firstName} {this.lastName}`
    }
}

module.exports = {
    firstName: 'ishwarya',
    lastName: 'Lakshmi',
    details: function(){
        return `{this.firstName} {this.lastName}`
    }
}