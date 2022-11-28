const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const {  getUserById } = require('../db/users');


apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
  
    if (!auth) { // nothing to see here
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
  
      try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
  
        if (id) {
          req.user = await getUserById(id);
          next();
        }
      } catch ({ name, message }) {
        next({ name, message });
      }
    } else {
      next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${ prefix }`
      });
    }
  });

apiRouter.use((req, res, next) => {
    if (req.user) {
     console.log("User is set:", req.user);
    }
  
    next();
  });



// ROUTER /api/users
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const productsRouter = require('./productsRouter');
apiRouter.use('/products', productsRouter);

const ordersRouter = require('./orders');
apiRouter.use('/orders', ordersRouter);

const reviewsRouter = require('./reviews');
apiRouter.use('/reviews', reviewsRouter);

const cartRouter = require('./cart')
apiRouter.use('/cart', cartRouter)

module.exports = apiRouter;
