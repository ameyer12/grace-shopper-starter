const { client } = require('./');
const bcrypt = require('bcrypt');

async function createUser({email, password}) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
  try {
      const { rows: [user]} = await client.query(`
        INSERT INTO users (email, password)
        VALUES ($1, $2)
        RETURNING *;
      `, [email, hashedPassword])
      if(hashedPassword) {
        console.log('hashedPassword is here')
        delete user.password
        return user;
      }

      return user;
    }
    catch(error) {
      console.log('error in createUser adapter function')
      console.log(error)
    }
  }

  async function getUser({email, password}) {
    if (!email || !password) {
      console.log('error3')
      return;
    }

    try {
      const user = await getUserByEmail(email);
      if(!user) {
        return;
      }
      console.log(user)
      const hashedPassword = user.password;
      const passwordsMatch = await bcrypt.compare(password, hashedPassword)

      if (passwordsMatch) {
        console.log('working')
        const { rows: [user] } = await client.query(`
        SELECT id, email
        FROM users
        WHERE email = "${email} AND password = ${hashedPassword}";
        `)

        return user;
      } else {
        console.log(passwordsMatch)
        console.log('hashedPassword:', hashedPassword)
        console.log('password:', password)
        return null;
      }
    } catch(error) {
      console.log('error1')
      throw error;
    }
  }

  async function getUserByEmail(email) {
    try {
      const { rows: [user] } = await client.query(`
      SELECT *
      FROM users
      WHERE email = $1
      `, [email]);
      
      return user;
    } catch(error) {
      throw error;
    }
  }

  async function getUserById(id) {
    try {
        const { rows: [ user ] } = await client.query(`
        SELECT *
        FROM users
        WHERE id = $1;
        `, [id]);

        if (!user) {
          return null
        }

        console.log(user)

        return user;
    } catch (error) {
        throw error;
    }
}
  
  async function getAllUsers() {
    try {
        const { rows: users } = await client.query(`
          SELECT *
          FROM users
        `);

        return users;
  
    } catch(error) {
        throw error;
    }  
  }

  module.exports = {
    createUser,
    getAllUsers,
    getUser,
    getUserByEmail,
    getUserById
  }