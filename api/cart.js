const express = require('express');
const { requireUser } = require('./utils');
const { getUsersCart, editCartItem, deleteCartItem, addCartItem } = require('../db/cart')
const cartRouter = express.Router()

cartRouter.get('/user', requireUser, async (req, res, next) => {
    const { userId } = req.user.id
    try {
        const usersCart = await getUsersCart(userId)
        res.send({
            success: true,
            data: usersCart,
            message: 'sent users cart data'
        })
    } catch({name, message}) {
        next({name, message})
    }
})

cartRouter.post('/', requireUser, async (req, res, next) => {
    const { userId } = req.user.id
    const { itemId, qty} = req.body

    try {
        const addedItem = await addCartItem({itemId, userId, qty})
        res.send({
            success: true,
            data: addedItem,
            message: 'successfully added item to cart'
        })

    } catch({name, message}) {
        next({name, message})
    }
})

cartRouter.patch('/', requireUser, async (req, res, next) => {
    const { userId } = req.user.id
    const { itemId, qty} = req.body

    try {
        const updatedItem = await editCartItem({itemId, userId, qty})
        res.send({
            success: true,
            data: updatedItem,
            message: 'successfully edited item'
        })

    } catch({name, message}) {
        next({name, message})
    }
})

cartRouter.delete('/:itemId', requireUser, async (req, res, next) => {
    const { userId } = req.user.id
    const { itemId } = req.params.itemId

    try {
        const deletedItem = await deleteCartItem({itemId, userId})
        res.send({
            success: true,
            data: deletedItem,
            message: 'successfully removed item from cart'
        })

    } catch({name, message}) {
        next({name, message})
    }
})



cartRouter.use((error, req, res, next) => {
    console.log('error occurred in cart')
    res.send({
      success: false,
      name: error.name,
      message: error.message
    });
  });


module.exports = cartRouter;