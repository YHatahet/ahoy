const express = require("express");
const { verifyLoggedIn, verifyReviewOwner } = require("../utils/verification");
const router = express.Router();
const {
  createReview,
  getReview,
  getReviews,
  getHotelReviews,
  updateReview,
  deleteReview,
} = require("../controllers/review");

router
  //create review, id is hotel id
  .post("/:id", verifyLoggedIn, createReview)
  //list all reviews, paginated, sorted
  .get("/all/:page/:limit/:sortAsc", getReviews)
  //read/lookup review, id is review id
  .get("/:id", getReview)
  //get reviews for given hotel, id is hotel id
  .get("/hotel/:id", getHotelReviews)
  //update review, id is review id
  .put("/:id", verifyReviewOwner, updateReview)
  //delete review, id is review id
  .delete("/:id", verifyReviewOwner, deleteReview);

module.exports = router;
