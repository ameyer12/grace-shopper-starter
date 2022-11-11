const express = require('express');
const { Router } = require('express');


const apiRouter = express.Router();

// ROUTER /api/users
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const productsRouter = require('./productsRouter');
apiRouter.use('/products', productsRouter);

const ordersRouter = require('./orders');
apiRouter.use('/orders', ordersRouter);

const reviewsRouter = require('./reviews');
apiRouter.use('/reviews', reviewsRouter);

module.exports = apiRouter;
