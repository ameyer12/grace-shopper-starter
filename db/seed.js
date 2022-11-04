const { client } = require('./')

const { createProduct } = require('./products')

async function dropTables() {
  try {
    console.log('Dropping Tables')
    // add code here
    await client.query(`
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS "orderItems";
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `)
    
    console.log('Finished Dropping Tables')
  } 
  catch(ex) {
    console.log('error dropping tables')
  }
}

async function createTables() {
  try {
    console.log('Creating Tables')
    // add code here 

    
    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        description VARCHAR(255),
        price INTEGER,
        inventory INTEGER
      );
    `)
        // products needs, categories with 1 required, and photo with placeholder

    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password varchar(255) NOT NULL
    );  
    `)
    // users needs, check for valid email

    await client.query(`
      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "userId" INTEGER REFERENCES users(id),
        content VARCHAR(255) NOT NULL
      );
    `)
    // should be ok
    await client.query(`
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        "isGuest" BOOLEAN DEFAULT false,
        "customerId" INTEGER REFERENCES users( id ),
        date DATE NOT NULL
      );
    `)
  // should be ok
    await client.query(`
      CREATE TABLE "orderItems" (
        id SERIAL PRIMARY KEY,
        "orderId" INTEGER REFERENCES orders ( id ),
        "productId" INTEGER REFERENCES products ( id ),
        quantity INTEGER,
        price INTEGER
      );
    `)
    // should be ok
    console.log('Finished Creating Tables')
  } 
  catch(ex) {
    console.log('error creating tables')
  }
}

async function createInitialProducts() {
  try {
    console.log('Creating Products')
    await createProduct({
      title:
        "The first most amazing product",
      description:
        "Description for the first most amazing product ever...."
    });
    
    await createProduct({
      title:
        "The second most amazing product",
      description:
        "Description for the second most amazing product ever...."
    });
    
    await createProduct({
      title:
        "The third most amazing product",
      description:
        "Description for the third most amazing product ever...."
    });
    
    console.log('Finished creating Products')
  } 
  catch(ex) {
    console.log('error creating Products')
  }
}

async function buildDB() {
  try {
    // need to add something here
    client.connect();
    await dropTables();
    await createTables();
    await createInitialProducts();
  }
  catch(ex) {
    console.log('Error building the DB')
  }
}


buildDB()
  .catch(console.error)
  .finally(() => client.end())
