const { client } = require('./');

async function createProduct({title, description, price, category, inventory, image}) {
  try {
    const { rows: [product]} = await client.query(`
      INSERT INTO products (title, description, price, category, inventory, image)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `, [title, description, price, category, inventory, image])
    
    return product;
  }
  catch(error) {
    console.log('error in createProduct adapter function')
    console.log(error)
  }
}

async function getAllProducts() {
  try {
      const { rows: products } = await client.query(`
        SELECT *
        FROM products
      `);

      return products;

  } catch(error) {
      throw error;
  }  
}

module.exports = {
  createProduct,
  getAllProducts
}
