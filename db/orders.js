const { client } = require('./');

async function createOrder({customerId = null, date }) {
  try {
    const { rows: [order] } = await client.query(`
        INSERT INTO orders ("customerId", date)
        VALUES ($1, $2)
        RETURNING *;
      `, [customerId, date])
    console.log(order)
    return order;
  }
  catch (error) {
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

  } catch (error) {
    throw error;
  }
}


async function getOrdersByUserId(id) {
  try {
    const { rows: orders } = await client.query(`
        SELECT *
        FROM orders
        WHERE "customerId"=$1;
      `, [id]);
    const attachedOrders = await attachItemsToOrders(orders)
    console.log(attachedOrders)
    return attachedOrders

  } catch (error) {
    console.log('failed')
  }
}


async function attachItemsToOrders(orders) {
  await Promise.all(orders.map(async (order) => {
    const { rows: orders } = await client.query(`
      SELECT DISTINCT "orderItems".*, products.image, products.title
      FROM "orderItems"
      JOIN products
      ON "orderItems"."productId"=products.id
      WHERE "orderItems"."orderId"=$1;
      `, [order.id])
    order.items = orders
  }))

  return orders
}

async function getOrderByOrderId(id) {
  try {
    const { rows: order } = await client.query(`
    SELECT *
    FROM orders
    WHERE id=$1;
    `, [id])
    
    return await attachItemsToOrders(order)
  } catch(err) {
    console.log('error getting order by id')
  }
}

async function deleteOrder(id) {
  try {
    const { rows: items } = await client.query(`
      DELETE FROM "orderItems"
      WHERE "orderId"=$1
      RETURNING *;
      `, [id])

    const { rows: deletedOrder } = await client.query(`
      DELETE FROM orders
      WHERE id=$1
      RETURNING *;
      `, [id])
    deletedOrder.items = items;
    
    return deletedOrder
  } catch (err) {
    console.log('error deleting order')
  }
}


module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByUserId,
  deleteOrder,
  getOrderByOrderId
}