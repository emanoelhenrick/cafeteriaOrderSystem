const express = require('express')
const authController = require('../controllers/Auth')
const prodController = require('../controllers/Products')
const orderController = require('../controllers/Order')
const router = express.Router()



// AUTH
router.post('/login', authController.loginController)
router.post('/register', authController.registerController)

// PRODUCTS
router.post('/product-upload', prodController.productUpdate)
router.post('/product-delete', prodController.productDelete)

// PEDIDOS
router.post('/new-order', orderController.newOrder)
router.post('/delete-order', orderController.deleteOrder)
router.post('/update-order', orderController.updateOrder)

module.exports = router