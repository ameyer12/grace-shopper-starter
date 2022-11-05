const express = require('express');
const { Router } = require('express');


const apiRouter = express.Router();

// ROUTER /api/users
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const productsRouter = require('./productsRouter');
apiRouter.use('/products', productsRouter);



module.exports = apiRouter;
