const { client } = require('./');
const {addCategoryToProduct} = require('./categories')


async function createProduct({title, description, price, inventory, image, categories = []}) {
  try {
    const { rows: [product]} = await client.query(`
      INSERT INTO products (title, description, price, inventory, image)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `, [title, description, price, inventory, image])
    
    categories.map(async (cat) => {
      const categoryFields = {
        productId: product.id,
        categoryId: cat
      }
      return await addCategoryToProduct(categoryFields)
    })
    product.categories = categories

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
async function updateProduct(id, fields = {}) {

  try {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(", ");

    if (setString.length > 0) {
      await client.query(
        `
         UPDATE products
         SET ${setString}
         WHERE id=${id}
         RETURNING *;
       `,
        Object.values(fields)
      );
      
      return await getProductById(id);

    }
  } catch (error) {
    throw error;
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
  updateProduct,
  getAllProducts,
  getProductById,
  getProductByTitle,
  deleteProduct
}
