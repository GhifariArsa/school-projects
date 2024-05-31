const db = require("../database");

// Select all users from the database.
exports.all = async (req, res) => {
  const movies = await db.Movie.findAll({
    order: [['AVG_RATING', 'DESC']]
  });

  res.json(movies);
};

exports.incrementView = async (req, res) => {
  const { movieId } = req.params;

  const movie = await db.Movie.findOne({
    where:{
      ID: movieId
    }
  })

  const currentViewCount = movie.VIEW_COUNT;
  movie.VIEW_COUNT = currentViewCount + 0.5;

  await movie.save();
  res.status(200).json({ message: "Incremented", MOVIE: movie });
}