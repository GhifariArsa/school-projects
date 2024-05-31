const db = require("../database");

// Get all reviews
exports.all = async (req, res) => {
  const reviews = await db.Review.findAll();

  res.json(reviews);
};

//Getting review from movie ID
exports.getReviewById = async (req, res) => {
  const { movieId } = req.params;

  const reviews = await db.Review.findAll({
    where: { MOVIE_ID: movieId },
  });

  res.json(reviews);
};

exports.postReview = async (req, res) => {
  // Setting the date as now
  const now = new Date();

  try {
    // Creating the review object
    const review = await db.Review.create({
      USER_ID: req.body.USER_ID,
      MOVIE_ID: req.body.MOVIE_ID,
      REVIEW_DESC: req.body.REVIEW_DESC,
      NO_STARS: req.body.NO_STARS,
      DATETIME: now,
    });

    res.json(review);
  } catch (error) {
    console.error("SQL Error:", error.message);
    res.status(500).json({ error: "Failed to post Review" });
  }
};

exports.deleteReview = async (req, res) => {
  const { movieId } = req.params;

  try {
    const review = await db.Review.findOne({
      where: {
        ID: movieId,
      },
    });

    await review.destroy();

    res.status(200).json({ message: "Review Deleted Successfully" });
  } catch (e) {
    console.error("SQL ERROR", e.message);
    res.status(500).json({ message: e.message });
  }
};

exports.updateReview = async (req, res) => {
  const { movieId } = req.params;

  try {
    const review = await db.Review.findOne({
      where: {
        ID: movieId,
      },
    });

    await review.update({ REVIEW_DESC: req.body.REVIEW_DESC });
    res
      .status(200)
      .json({ message: "Review Update to: " + req.body.REVIEW_DESC });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Failed Updating Review" });
  }
};
