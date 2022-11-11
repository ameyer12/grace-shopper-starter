const { client } = require('./');

async function createOrder({isGuest, customerId, date}) {
    try {
      const { rows: [order]} = await client.query(`
        INSERT INTO orders ("isGuest", "customerId", date)
        VALUES ($1, $2, $3)
        RETURNING *;
      `, [isGuest, customerId, date])
      console.log(order)
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
        const attachedOrders = await attachItemsToOrders(orders)
        return attachedOrders
  
    } catch(error) {
        throw error;
    }  
  }


  async function getOrdersByUserId(id) {
    try {
      const { rows: orders } = await client.query(`
        SELECT *
        FROM orders
        WHERE "customerId"=$1;
      `,[id]);
      const attachedOrders = await attachItemsToOrders(orders)
      console.log(attachedOrders)
      return attachedOrders

  } catch(error) {
      console.log('failed')
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
    getAllOrders,
    getOrdersByUserId
  }