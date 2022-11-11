const express = require('express');
const { getOrdersByUserId, getAllOrders } = require('../db/orders');
const ordersRouter = express.Router()


ordersRouter.get('/user/:id', async (req, res) => {
    const id = req.params.id * 1
    console.log(id)
    try {
        console.log('attempting function')
        const orders = await getOrdersByUserId(id)

        console.log(orders)
        res.send(orders)
    } catch ({ name, message}) {
        res.send({name, message})
    }

})

ordersRouter.get('/', async (req, res) => {
    
    try {
        console.log('attempting function')
        const orders = await getAllOrders()

        console.log(orders)
        res.send(orders)
    } catch ({ name, message}) {
        res.send({name, message})
    }

})



module.exports = ordersRouter;