const { client } = require('./');

async function getUsersCart(userId) {
    try {
        const {rows: cart} = await client.query(`
        SELECT * FROM users_carts
        WHERE "userId"=$1;
        `, [userId])

        return cart
    } catch(err) {
        console.log('error getting users cart', err)
    }
}

async function addCartItem({itemId, userId, qty}) {
    try {
        const { rows: item} = await client.query(`
        INSERT INTO users_carts("itemId", "userId", qty)
        VALUES($1, $2, $3)
        RETURNING *;
        `, [itemId, userId, qty])
    } catch(ex) {
        console.log('error adding cart item')
    }
}

async function editCartItem({itemId, userId, qty}) {
    try {
          const { rows: [item] } = await client.query(`
          UPDATE users_carts
          SET "qty"=$1,
          WHERE "userId"=${userId}
          AND
          "itemId"=${itemId}
          RETURNING *;
        `, [qty]);
        
          return item;
    } catch(ex) {
        console.log('error editing cart item')
    }
}

async function deleteCartItem({itemId, userId}) {
    try {
        const {rows: cart } = await client.query(`
          DELETE
          FROM users_carts
          WHERE "itemId" = $1
          AND "userId" = $2
          RETURNING *
        `, [itemId, userId])

        return cart
    } catch(ex) {
        console.log('error deleting cart item')
    }
}



module.exports = {
    getUsersCart,
    addCartItem,
    editCartItem,
    deleteCartItem
}