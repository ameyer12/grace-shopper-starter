const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET = 'neverTell' } = process.env;
const bcrypt = require('bcrypt');
const {
    createUser,
    getUserByEmail,
    getUser,
    getAllUsers
} = require('../db/users');

usersRouter.get('/', async (req, res, next) => {

    const users = await getAllUsers();

    console.log(users)

    try {
        res.send(users)

    } catch ({name, message}) {
        res.send({name, message})
    }
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
        }
        
        else {
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
        console.log('error!!!!')
    }
})

usersRouter.post('/login', async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) {
        next({
            name: 'MissingCredentialsError',
            message: 'Please supply both an email and a password'
        });
    }
    async function comparePasswords(plainTextPassword, hash) {
        const results = await bcrypt.compare(plainTextPassword, hash)
        return results;
    }

    try {
        const user = await getUserByEmail(email);

        if (user && comparePasswords(password, '10')) {

            const token = jwt.sign({id: user.id, email: user.email}, JWT_SECRET, { expiresIn: '1w' });
            res.send({
                user,
                message: 'Login successful',
                token
            });
        } else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Email or Password is incorrect',
            });
        }
    } catch(error) {
        next(error);
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