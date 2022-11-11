const express = require('express');
const { getProductById } = require('../db/products');
const {
    getAllReviews,
    getReviewById,
    createReview,
    deleteReview
} = require('../db/reviews')

const reviewsRouter = express.Router();

reviewsRouter.get('/', async (req, res, next) => {
  const reviews = await getAllReviews();

  try {
      console.log("attempting function")
        res.send({
            reviews
          });

    } catch ({name, message}) {
        res.send({name, message})
    }
})

reviewsRouter.post('/', async (req, res, next) => {

    const { productId, userId, content} = req.body;

    try {
        console.log("attempting function")
        
        const review = await createReview(req.body)

          res.send({
              review
            });
  
      } catch ({name, message}) {
          res.send({name, message})
      }
  })

reviewsRouter.delete('/:reviewId', async (req, res, next) => {
    try {
        const review = await getReviewById(req.params.reviewId);

        await deleteReview(req.params.reviewId)
  
    } catch ({ name, message }) {
        res.send({name, message})
    }
});



module.exports = reviewsRouter;