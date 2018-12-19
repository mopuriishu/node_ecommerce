const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addressSchema = new Schema({
    name: {
        type: String
    },
    mobile_no: {
        type: String
    },
    pincode: {
        type: String
    },
    area_and_steet: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    alt_phone_no: {
        type: String
    },
    landmark: {
        type: String
    },
    address_type: {
        type: String
    },
    geo: [
        {
          latitude: {
              type: String
          },
          longitude: {
            type: String
          }
        }
    ]
})

const Address = mongoose.model('Address',addressSchema)

module.exports = {
    addressSchema,
    Address
}