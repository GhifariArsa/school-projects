module.exports = (express, app) => {
  const controller = require("../controller/review.controller.js");
  const router = express.Router();

  router.get("/", controller.all);

  //Get revies based on ID
  router.get("/:movieId", controller.getReviewById);

  //Post reviews
  router.post("/post", controller.postReview);

  //Delete Reviews
  router.delete("/delete/:movieId", controller.deleteReview);

  //Update Review
  router.post("/update/:movieId", controller.updateReview);

  // Add routes to server.
  app.use("/v1/reviews", router);
};
