const { client } = require('./');

async function createReview({productId, userId, content}) {
    try {
      const { rows: [review]} = await client.query(`
        INSERT INTO reviews ("productId", "userId", content)
        VALUES ($1, $2, $3)
        RETURNING *;
      `, [productId, userId, content])
      
      return review;
    }
    catch(error) {
      console.log('error in createReview adapter function')
      console.log(error)
    }
  }
  
  async function getAllReviews() {
    try {
        const { rows: reviews } = await client.query(`
          SELECT *
          FROM reviews
        `);

        return reviews;
  
    } catch(error) {
        throw error;
    }  
  }

  module.exports = {
    createReview,
    getAllReviews
  }