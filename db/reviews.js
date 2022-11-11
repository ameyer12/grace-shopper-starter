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

  async function getReviewById(id) {
    try {
      const {rows: reviews } = await client.query(`
        SELECT *
        FROM reviews
        WHERE id = $1
      `, [id])

      return reviews

    } catch (error) {
      throw error
    }
  }

async function getReviewByUser(id) {
  try {
    const {rows: reviews } = await client.query(`
      SELECT *
      FROM reviews
      WHERE "userId" = $1
    `, [id])

    return reviews

  } catch (error) {
    throw error
  }
}

async function getReviewByProduct(id) {
  try {
    const {rows: reviews } = await client.query(`
      SELECT *
      FROM reviews
      WHERE "productId" = $1
    `, [id])

    return reviews

  } catch (error) {
    throw error
  }
}



async function deleteReview(id) {
  try {
    const {rows: reviews } = await client.query(`
      DELETE
      FROM reviews
      WHERE "id" = $1
      RETURNING reviews
    `, [id])

    return reviews

  } catch (error) {
    throw error
  }
}

  module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    getReviewByUser,
    getReviewByProduct,
    deleteReview
  }