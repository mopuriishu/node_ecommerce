//npm install --save mongodb
const { ObjectID } = require('mongodb');

const validateID = (req, res, next) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)) {
        res.send({
            notice: 'Invalid Object ID'
        });
    }
    next();  //calls next function eg. once this id is in db, then go to next function and execute another function
}

module.exports = {
    validateID
}