const { client } = require('./');

async function createOrderItem({orderId, productId, quantity, price}) {
    try {
      const { rows: [orderItem]} = await client.query(`
        INSERT INTO "orderItems" ("orderId", "productId", quantity, price)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `, [orderId, productId, quantity, price])
      
      return orderItem;
    }
    catch(error) {
      console.log('error in createOrderItem adapter function')
      console.log(error)
    }
  }
  
  async function getAllOrderItems() {
    try {
        const { rows: orderItems } = await client.query(`
          SELECT *
          FROM "orderItems"
        `);
        return orderItems;
  
    } catch(error) {
        throw error;
    }  
  }

  async function getOrderItemsByOrder(id) {
    const { rows } = await client.query(`
    SELECT *
    FROM "orderItems"
    where "orderId"=${id};
    `);
    return rows;
  }

//   CREATE TABLE "orderItems" (
//     id SERIAL PRIMARY KEY,
//     "orderId" INTEGER REFERENCES orders ( id ),
//     "productId" INTEGER REFERENCES products ( id ),
//     quantity INTEGER,
//     price INTEGER
//   );

  module.exports = {
    createOrderItem,
    getAllOrderItems,
    getOrderItemsByOrder
  }