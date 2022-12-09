const express = require('express');
const { getAllCategories, getProductsByCategoryId } = require('../db/categories')
const { getAllProducts, createProduct, getProductById, deleteProduct, updateProduct } = require('../db/products')
const { requireUser } = require("./utils")

const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => {
  const products = await getAllProducts();

  try {
    res.send(products)

  } catch ({name, message}) {
    res.send({name, message})
  }

})

productsRouter.get('/:productId', async (req, res, next) => {
  const product = await getProductById(req.params.productId);

  try {
    res.send(product)

  } catch ({name, message}) {
    res.send({name, message})
  }

})

productsRouter.post('/', async (req, res, next) => {

  const { title, description, price, categories, inventory, image } = req.body;

    try {
      console.log("attempting function")

      const product = await createProduct(req.body)

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

      const removeProduct = await deleteProduct(req.params.productId);
      
      res.send(removeProduct);

  } catch ({ name, message }) {
      res.send({name, message})
  }
});


productsRouter.patch('/:productId', async (req, res, next) => {
  const { productId } = req.params
  const { title, description, price, inventory, image } = req.body;
  console.log(req.body)

  try {
    const product = await getProductById(productId);

    if(product) {
      const updatedProduct = await updateProduct(productId, {
        id: productId,
        title: title,
        description: description,
        price: price,
        inventory: inventory,
        image: image
      });

      res.send(updatedProduct)
    } else {
      res.send({
        error: 'ProductUpdateError',
        name: 'Error updating product',
        message: `This product was not able to be udpated`,
      })
    }
  } catch (error) {
    console.log("error in API", error);
    next(error);
  }
});

productsRouter.get('/:productId', async (req, res, next) => {
  try {
      const product = await getProductById(req.params.productId);
      
      res.send({
        product
      })
      
  } catch ({ name, message }) {
      res.send({name, message})
  }
});

productsRouter.get('/category/:catId', async (req, res, next) => { //getting products by category
  try {
    const catId = req.params.catId

    const products = await getProductsByCategoryId(catId)

    res.send(products)

  } catch ({ name, message }) {
      res.send({name, message})
  }
});

productsRouter.get('/categories/data', async (req, res, next) => { //getting products by category
  try {

    const categories = await getAllCategories()

    res.send(categories)

  } catch ({ name, message }) {
      res.send({name, message})
  }
});


module.exports = productsRouter;
