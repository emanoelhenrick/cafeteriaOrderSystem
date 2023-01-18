const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    prodName: {
        type: String,
        required: true,
        unique: true
    },
    prodPrice: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Product', productSchema)