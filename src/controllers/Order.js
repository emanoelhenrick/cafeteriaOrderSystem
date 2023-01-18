const Order = require('../models/Order')
const Products = require('../models/Products')

const orderController = {

    newOrder: async (req, res) => {

        const products = req.body.products

        const user = 'manel'

        let productsList = products.map(async prod => await Products.findOne({ prodName: prod }));

        await Promise.all(productsList)
            .then(data => {
                productsList = data
            })

        let totalPrice = 0

        for(product of productsList){
            totalPrice += Number(product.prodPrice);
        }

        const newOrder = new Order({
            productsOrder: productsList,
            orderPrice: totalPrice,
            user: user
        })

        newOrder.save()
            .then(() => res.send('Pedido enviado!'))
            .catch(err => res.send(err))


    },
    deleteOrder: async (req, res) => {

        try{
           await Order.findByIdAndDelete(req.body.order_id)
            .then(() => res.send("Pedido removido"))
        } catch(error){
            console.log(error);
        }

    },
    updateOrder: async (req, res) => {


        try {
            await Order.findByIdAndUpdate(req.body.order_id, {orderStatus: req.body.orderStatus})
            res.send('Pedido atualizado')
        } catch(error) {
            console.log(error);
        }


    }
}

module.exports = orderController