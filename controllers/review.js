const Review = require("../models/Review");
const Hotel = require("../models/Hotel");
const { createError } = require("../utils/error");

const createReview = async (req, res, next) => {
  try {
    // Get previous
    const hotelId = req.params.id;
    const fetchedHotel = await Hotel.findById(hotelId);
    if (!fetchedHotel)
      return next(createError(404, "Hotel with given ID is not found"));

    const numOfRatings = parseInt(fetchedHotel.numOfRatings);
    const rating = parseFloat(fetchedHotel.rating);
    const insertedRating = parseFloat(req?.body?.rating);

    const newRating =
      (numOfRatings * rating + insertedRating) / (numOfRatings + 1);

    // body: { rating , review }
    // req.user : user id
    // req.param: hotel id
    const reviewParams = {
      rating: insertedRating,
      review: req.body.review,
      _user: req.user.id,
      _hotel: req.params.id,
    };
    const newReview = new Review(reviewParams);
    const savedReview = await newReview.save();
    // update only after making sure the review is valid
    await Hotel.findByIdAndUpdate(hotelId, {
      $set: { rating: newRating, numOfRatings: numOfRatings + 1 },
    });
    res.status(200).json(savedReview);
  } catch (err) {
    next(err);
  }
};

const getReviews = async (req, res, next) => {
  try {
    // defaults as page 0, limit of 10 per page
    const page = parseInt(req.params.page) || 0;
    const limit = parseInt(req.params.limit) || 10;

    const foundReviews = await Review.find()
      .skip(page * limit)
      .limit(limit);

    res.status(200).json(foundReviews);
  } catch (err) {
    next(err);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const originalReview = await Review.findById(reviewId);
    if (!originalReview) return next(createError(404, "Review not found"));

    const insertedRating = parseFloat(req?.body?.rating);

    // if we have a rating do the math and update the hotel
    if (insertedRating !== NaN) {
      const reviewedHotel = await Hotel.findById(originalReview._hotel);
      const currentHotelRating = parseFloat(reviewedHotel.rating);
      const numOfRatings = parseInt(reviewedHotel.numOfRatings);

      const newHotelRating =
        (currentHotelRating * numOfRatings -
          originalReview.rating +
          insertedRating) /
        numOfRatings;

      reviewedHotel.$set({ rating: newHotelRating }).save();
    }

    originalReview.$set(req.body).save();

    res.status(200).json(originalReview);
  } catch (err) {
    next(err);
  }
};

const getReview = async (req, res, next) => {
  try {
    const foundReview = await Review.findById(req.params.id);
    res.status(200).json(foundReview);
  } catch (err) {
    next(err);
  }
};

const getHotelReviews = async (req, res, next) => {
  try {
    const foundReviews = await Review.find({
      $match: { _hotel: req?.params?.id },
    });
    res.status(200).json(foundReviews);
  } catch (err) {
    next(err);
  }
};

const getReviewsByUser = async (req, res, next) => {
  try {
    const foundReviews = await Review.find({
      $match: { _user: req?.params?.id },
    });
    res.status(200).json(foundReviews);
  } catch (err) {
    next(err);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview)
      return next(createError(404, "Review with given ID not found"));

    const affectedHotel = await Hotel.findById(deletedReview._hotel);
    if (!affectedHotel)
      return next(createError(404, "Hotel attached to review is not found"));

    const currentHotelRating = parseFloat(affectedHotel.rating);
    const numOfRatings = parseInt(affectedHotel.numOfRatings);
    const newHotelRating =
      (currentHotelRating * numOfRatings - deletedReview.rating) /
      (numOfRatings - 1);

    // update hotel rating after removing review
    affectedHotel
      .$set({
        numOfRatings: numOfRatings - 1,
        rating: newHotelRating,
      })
      .save();

    res
      .status(200)
      .json(`Review with id ${deletedReview._id} has been deleted`);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createReview,
  deleteReview,
  getReview,
  getReviews,
  getHotelReviews,
  getReviewsByUser,
  updateReview,
};
