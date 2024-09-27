module.exports = (express, app) => {
  const controller = require("../controller/movie.controller.js");
  const router = express.Router();

  // Select all users.
  router.get("/", controller.all);

  router.get("/increment/:movieId", controller.incrementView);

  // Add routes to server.
  app.use("/v1/movies", router);
};
