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

  async function attachItemsToOrders(orders) {
    await Promise.all(orders.map(async (order) => {
      const { rows: orders } = await client.query(`
      SELECT DISTINCT "orderItems".*, products.image
      FROM "orderItems"
      JOIN products
      ON "orderItems"."productId"=products.id
      WHERE "orderItems"."orderId"=$1;
      `, [order.id])
      order.items = orders
    }))

    return orders
  }


  module.exports = {
    createOrder,
    getAllOrders
  }