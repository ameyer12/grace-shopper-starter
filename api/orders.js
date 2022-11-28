const express = require('express');
const { getOrdersByUserId, getAllOrders, createOrder, getOrderByOrderId, deleteOrder } = require('../db/orders');
const { createOrderItem } = require('../db/orderItems')
const {getProductById} = require('../db/products')
const { requireUser } = require('./utils');
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
    const { itemArray } = req.body // requires item array in body [{id, qty}]
    const customerId = null
    if(req.user) {
        customerId = req.user.id // will need logged in user
    }
    const date = createDate()
    try {
        const order = await createOrder({customerId, date})
        const orderId = order.id
        const newItems = await Promise.all(itemArray.map( async (item) => {
            const product = await getProductById(item.id)
            const productId = product[0].id
            const price = product[0].price
            const quantity = item.qty
            const newItem = await createOrderItem({orderId, productId, quantity, price})

            return newItem
        }))

        order.items = newItems
        res.send(await getOrderByOrderId(orderId))
    } catch({name, message}) {
        next({name, message})
    }
})

ordersRouter.get('/', async (req, res, next) => {
    try {
        const orders = await getAllOrders()
        res.send(orders)
    } catch ({ name, message}) {
        next({name, message})
    }
    
})

ordersRouter.get('/user/:id', requireUser, async (req, res, next) => {
    const id = req.params.id * 1
    console.log(id)
    try {
        const orders = await getOrdersByUserId(id)

        res.send(orders)
    } catch ({ name, message}) {
        next({name, message})
    }

})

ordersRouter.delete('/:orderId', requireUser, async (req, res, next) => {
    const { orderId } = req.params;
    try {
        const selectedOrder = await getOrderByOrderId(orderId)
        if(selectedOrder.customerId === req.user.id) {
            const deletedOrder = await deleteOrder(orderId)

            res.send(deletedOrder[0])
        }

    } catch ({name, message}) {
        next({name, message})
    }
})

ordersRouter.use((error, req, res, next) => {
    console.log('error occurred in orders')
    res.send({
      name: error.name,
      message: error.message
    });
  });

module.exports = ordersRouter;