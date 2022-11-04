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
    getAllUsers
  }