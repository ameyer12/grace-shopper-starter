const { client } = require('./');


async function createCategory(cat) {
    try {
        const { rows: category} = await client.query(`
        INSERT INTO categories(category)
        VALUES ($1)
    `,[cat])
        return category
    } catch(err) {
        console.log(`error creating category ${cat}`)
        console.log(err)
    }
    
}

async function getAllCategories() {
    try {
        const {rows: categories} = await client.query(`
        SELECT *
        FROM categories
        `)
        return categories
    } catch(err) {
        console.log('error getting all categories')
    }
}

async function getCategoryByCategoryName(cat) {
    try {
        const {rows: [category]} = await client.query(`
        SELECT *
        FROM categories
        WHERE category=$1;
        `,[cat])
    
        return category
    } catch(err) {
        console.log('getCategoryByCategoryName')
    }
}

async function addCategoryToProduct({categoryId, productId}) {
    try{
        console.log(categoryId, productId)
        const {rows: category} = await client.query(`
        INSERT INTO product_categories ("categoryId", "productId")
        VALUES ($1, $2)
        RETURNING *;
        `, [categoryId, productId])
    
        return category
    } catch(err) {
        console.log('error adding category to product')
    }
}

async function getProductsByCategoryId(categoryId) {
    try {
     const {rows: products} = await client.query(`
     SELECT DISTINCT products.*
     FROM products
     JOIN product_categories AS pc
     ON products.id = pc."productId"
     WHERE pc."categoryId"=$1;
     `,[categoryId])

     return products
    } catch(err) {
        console.log('error occurred getting products by categoryId')
    }
}




module.exports = {
    createCategory,
    getAllCategories,
    getCategoryByCategoryName,
    addCategoryToProduct,
    getProductsByCategoryId
}




// await client.query(`
//     CREATE TABLE categories (
//       id SERIAL PRIMARY KEY,
//       category VARCHAR(255) NOT NULL
//       );
//       `)

// await client.query(`
//       CREATE TABLE product_categories (
//           id SERIAL PRIMARY KEY,
//           "categoryId" INTEGER REFERENCES categories(id),
//           "productId" INTEGER REFERENCES products(id)
//               );
//             `)