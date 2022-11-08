const { client } = require('./');

async function createUser({email, password}) {
    try {
      const { rows: [user]} = await client.query(`
        INSERT INTO users (email, password)
        VALUES ($1, $2)
        RETURNING *;
      `, [email, password])
      
      return user;
    }
    catch(error) {
      console.log('error in createUser adapter function')
      console.log(error)
    }
  }

  async function getUserByEmail(email) {
    try {
      const { rows: [user] } = await client.query(`
      SELECT *
      FROM users
      WHERE email = $1
      `, [email]);

      if (!user) {
        throw {
          name: 'UserNotFoundError',
          message: 'No user found with that email'
        }
      }

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
    getUserByEmail,
    getUserById
  }