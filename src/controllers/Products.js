const Products = require('../models/Products')

const productController = {

    productUpdate: async (req, res) => {
        const {
            prodName,
            prodPrice
        } = req.body

        const newProduct = new Products({
            prodName,
            prodPrice
        })

        await newProduct.save()
            .then(() => res.send('produto salvo com sucesso!'))
            .catch(err => res.send(err.message))

    },
    productDelete: async (req, res) => {

        const verifyProduct = await Products.findOne({prodName: req.body.prodName})

        if(!verifyProduct){
            return res.status(404).send('O produto nao existe')
        }

        await Products.findByIdAndDelete(verifyProduct._id)
            .then(() => res.send('produto deletado com sucesso'))
            .catch(err => res.send(err))

    },
}

module.exports = productController