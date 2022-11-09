const { client } = require('./')

const { createProduct, getAllProducts } = require('./products')
const { createUser, getAllUsers, getUserById, getUserByEmail } = require('./users')
const { createReview, getAllReviews } = require('./reviews')
const { createOrder, getAllOrders, getOrdersByUserId } = require('./orders')
const { createOrderItem, getAllOrderItems, getOrderItemsByOrder } = require('./orderItems')

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

    // added category and image to products table
    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        description VARCHAR(255),
        price INTEGER,
        category VARCHAR(255) NOT NULL,
        inventory INTEGER,
        image TEXT
      );
    `)
        // products needs, categories with 1 required, and photo with placeholder

    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
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
        "Description for the first most amazing product ever....",
      price:
        1,
      category:
        "Example category",
      inventory:
        2,
      image:
        "Example image"
    });
    
    await createProduct({
      title:
        "The second most amazing product",
      description:
        "Description for the second most amazing product ever....",
      price:
        1,
      category:
        "Example category",
      inventory:
        2,
      image:
        "Example image"
    });
    
    await createProduct({
      title:
        "The third most amazing product",
      description:
        "Description for the third most amazing product ever....",
      price:
        1,
      category:
        "Example category",
      inventory:
        2,
      image:
        "Example image"
    });

    console.log('Finished creating Products')
  } 
  catch(ex) {
    console.log('error creating Products')
  }
}

async function createInitialUsers() {
  try {
    console.log('Creating Users')
    await createUser({
      email:
        "First User",
      password:
        "Password1"
    });
    
    await createUser({
      email:
        "Second user",
      password:
        "Password2"
    });
    
    await createUser({
      email:
        "Third user",
      password:
        "Password3"
    });
    
    console.log('Finished creating Users')
  } 
  catch(ex) {
    console.log('error creating Users')
    console.log(ex)
  }
}

async function createInitialReviews() {
  try {
    console.log('Creating Reviews')
    await createReview({
      productId: 
        1,
      userId:
        1,
      content: 
        "This is the first review"
    });
    
    await createReview({
      productId: 
        2,
      userId:
        2,
      content: 
        "This is the second review"
    });
    
    await createReview({
      productId: 
        3,
      userId:
        3,
      content: 
        "This is the third review"
    });

    console.log('Finished creating Reviews')
  } 
  catch(ex) {
    console.log('error creating Reviews')
    console.log(ex)
  }
}

async function createInitialOrders() {
  try {
    console.log('Creating Orders')
    await createOrder({
      isGuest: 
        true,
      customerId:
        null,
      date: 
        20221102
    });
    
    await createOrder({
      isGuest: 
        false,
      customerId:
        2,
      date: 
        20221103
    });
    
    await createOrder({
      isGuest: 
        true,
      customerId:
        null,
      date: 
        20221104
    });

    console.log('Finished creating Orders')
  } 
  catch(ex) {
    console.log('error creating Orders')
    console.log(ex)
  }
}

async function createInitialOrderItems() {
  try {
    console.log('Creating Orders')
    await createOrderItem({
      orderId: 
        1,
      productId:
        1,
      quantity: 
        1,
      price:
        1
    });
    
    await createOrderItem({
      orderId: 
        2,
      productId:
        2,
      quantity: 
        2,
      price:
        2
    });
    
    await createOrderItem({
      orderId: 
        3,
      productId:
        3,
      quantity: 
        3,
      price:
        3
    });

    console.log('Finished creating orderItems')
  } 
  catch(ex) {
    console.log('error creating orderItems')
    console.log(ex)
  }
}

async function buildDB() {
  try {
    // need to add something here
    client.connect();
    await dropTables();
    await createTables();
    await createInitialProducts();
    await createInitialUsers();
    await createInitialReviews();
    await createInitialOrders();
    await createInitialOrderItems();
    await getAllOrderItems();
    await getAllOrders()
    await getOrdersByUserId(2)
  }
  catch(ex) {
    console.log('Error building the DB')
  }
}


buildDB()
  .catch(console.error)
  .finally(() => client.end())
