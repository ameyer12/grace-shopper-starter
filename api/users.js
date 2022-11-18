const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET = 'neverTell' } = process.env;
const {
    createUser,
    getUserByEmail
} = require('../db/users');

usersRouter.get('/', (req, res, next) => {
    res.send('USERS')
  })



//POST /api/users/register
usersRouter.post('/register', async (req, res, next) => {

    try{
        const { email, password } = req.body;
        const registeringUser = await getUserByEmail(email);
        if(registeringUser) {
            next({
                name: 'UserExistsError',
                message: 'A user with that email already exists'
            });
        } else {
            const user = await createUser({
                email,
                password
            });

            if(!user) {
                next({
                    name: 'UserCreationError',
                    message: 'Error registering, please try again.'
                });
            } else {
                const token = jwt.sign({id: user.id, email: user.email}, JWT_SECRET, {expiresIn: '1w'})
                res.send({
                    user,
                    message: 'Register Successful',
                    token
                })
            }
        }
 
    } catch ({name, message}) {
        next({name, message})
    }
})

usersRouter.use((error, req, res, next) => { // error handler
    console.log('error occurred')
    res.send({
      name: error.name,
      message: error.message
    });
  });


module.exports = usersRouter;