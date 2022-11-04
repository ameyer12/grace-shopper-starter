const { client } = require('./');

async function createOrder({isGuest, customerId, date}) {
    try {
      const { rows: [order]} = await client.query(`
        INSERT INTO orders ("isGuest", "customerId", date)
        VALUES ($1, $2, $3)
        RETURNING *;
      `, [isGuest, customerId, date])
      
      return order;
    }
    catch(error) {
      console.log('error in createOrder adapter function')
      console.log(error)
    }
  }
  
  async function getAllOrders() {
    try {
        const { rows: orders } = await client.query(`
          SELECT *
          FROM orders
        `);

        return orders;
  
    } catch(error) {
        throw error;
    }  
  }

  module.exports = {
    createOrder,
    getAllOrders
  }