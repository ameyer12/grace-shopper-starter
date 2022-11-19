const { client } = require('./');

async function createProduct({title, description, price, inventory, image}) {
  try {
    const { rows: [product]} = await client.query(`
      INSERT INTO products (title, description, price, inventory, image)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `, [title, description, price, inventory, image])
    
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

async function getProductById(id) {
  try {
    const { rows: product } = await client.query(`
      SELECT * 
      FROM products
      WHERE id = $1
    `, [id])

    return product

  } catch (error) {
    throw error
  }
}

async function getProductByTitle(id) {
  try {
    const { rows: product } = await client.query(`
      SELECT * 
      FROM products
      WHERE title = $1
    `, [id])

    return product

  } catch (error) {
    throw error
  }
}



async function deleteProduct(id) {
    try {
        const {rows: products } = await client.query(`
          DELETE
          FROM products
          WHERE "id" = $1
          RETURNING products
        `, [id])
    
        return products
    
    } catch (error) {
        throw error
    }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByTitle,
  deleteProduct
}
