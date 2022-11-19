const { client } = require('./');


async function createCategory(cat) {
    try {
        const { rows: category} = await client.query(`
        INSERT INTO categories(category)
        VALUES ($1)
        RETURNING *
    `[cat])
        return category
    } catch(err) {
        console.log(`error creating category ${cat}`)
    }
    
}

async function getAllCategories() {
    const {rows: categories} = await client.query(`
    SELECT *
    FROM categories
    `)
    return categories
}

async function getCategoryByCategoryName(cat) {
    const {rows: [category]} = await client.query(`
    SELECT *
    FROM categories
    WHERE category=$1;
    `,[cat])

    return category
}

async function addCategoryToProduct(category) {
    const {rows: categories} = await client.query(`
    INSERT INTO product_categories("categoryId", "productId")
    VALUES($1, $2)
    RETURNING *;
    `)

    return category
}





module.exports = {
    createCategory,
    getAllCategories
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