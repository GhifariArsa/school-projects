const db = require("../database");

// Select all sessions from the database.
exports.all = async (req, res) => {
  const sessions = await db.Movie_Session.findAll();

  res.json(sessions);
};



exports.getSessionsByMovieId = async (req, res) => {
  const { movieId } = req.params;

  const sessions = await db.Movie_Session.findAll({
      where: { MOVIE_ID: movieId },
    });

  res.json(sessions);
};