module.exports = (express, app) => {
  const controller = require("../controller/session.controller.js");
  const router = express.Router();

  // get all sessions.
  router.get("/", controller.all);

  // Route to get sessions by a specific movie ID
  router.get("/:movieId", controller.getSessionsByMovieId);

  // Add routes to server.
  app.use("/v1/sessions", router);
};
