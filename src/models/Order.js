const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    productsOrder: {
        type: Array,
        required: true,
    },
    orderPrice: {
        type: Number,
        required: true,
    },
    orderStatus: {
        type: String,
        default: 'Pendente'
    },
    user: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Order', orderSchema)