const express = require('express');
const { getOrdersByUserId, getAllOrders, createOrder } = require('../db/orders');
const { createOrderItem } = require('../db/orderItems')
const {getProductById} = require('../db/products')
const ordersRouter = express.Router()

function createDate() {
    let date_ob = new Date();
    let day = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let date = `${year}${month}${day}`
    return date
}

ordersRouter.post('/neworder', async (req, res, next) => {
    const { itemArray } = req.body
    const { id } = req.user
    const date = createDate()
    customerId = id
    try {
        const order = await createOrder({isGuest, customerId, date})
        const orderId = order.id
        itemArray.map( async (item) => {
            const product = await getProductById(item.id)
            const productId = product.id
            const price = product.price
            const quantity = item.qty
            const newItem = await createOrderItem({orderId, productId, quantity, price})

            return newItem
        })
        order.items = itemArray
        res.send(order)
    } catch({name, message}) {
        next({name, message})
    }
})

ordersRouter.get('/', async (req, res, next) => {
    console.log(createDate())
    try {
        const orders = await getAllOrders()
        res.send(orders)
    } catch ({ name, message}) {
        next({name, message})
    }
    
})

ordersRouter.get('/user/:id', async (req, res) => {
    const id = req.params.id * 1
    console.log(id)
    try {
        const orders = await getOrdersByUserId(id)

        res.send(orders)
    } catch ({ name, message}) {
        next({name, message})
    }

})

ordersRouter.use((error, req, res, next) => {
    console.log('error occurred')
    res.send({
      name: error.name,
      message: error.message
    });
  });

module.exports = ordersRouter;