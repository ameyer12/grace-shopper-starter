const express = require('express');

const { getAllProducts, createProduct, getProductById, deleteProduct } = require('../db/products')

const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => {
  const products = await getAllProducts();

  try {
    res.send(products)

  } catch ({name, message}) {
    res.send({name, message})
  }

})

productsRouter.post('/', async (req, res, next) => {

  const { title, description, price, category, inventory, image } = req.body;

    try {
      console.log("attempting function")

      const product = createProduct(req.body)

      res.send({
        product
      })

    } catch ({name, message}) {

      res.send({name, message})
    }

})

productsRouter.delete('/:productId', async (req, res, next) => {
  try {
      const product = await getProductById(req.params.productId);

      await deleteProduct(req.params.productId)

  } catch ({ name, message }) {
      res.send({name, message})
  }
});


module.exports = productsRouter;
