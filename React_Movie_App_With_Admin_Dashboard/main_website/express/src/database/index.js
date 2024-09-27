const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
    Op: Sequelize.Op
};

db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DIALECT
  });
  
// Include models.
db.Movie = require("./models/Movie.js")(db.sequelize, DataTypes);
db.User = require("./models/User.js")(db.sequelize, DataTypes);
db.Booking = require('./models/Booking.js')(db.sequelize, DataTypes);
db.Review = require('./models/Review.js')(db.sequelize, DataTypes);

db.Movie_Session = require('./models/Movie_Session.js')(db.sequelize, DataTypes);
db.Movie_Session.belongsTo(db.Movie, { foreignKey: { name: "MOVIE_ID", allowNull: false } });

db.Review.belongsTo(db.User, { foreignKey: 'USER_ID', as: 'user' });
db.Review.belongsTo(db.Movie, { foreignKey: 'MOVIE_ID', as: 'movie' });

db.Booking.belongsTo(db.User, {
  foreignKey: 'USER_ID', // Foreign key to USER table
  targetKey: 'ID',       // Target key in USER table (assuming it's 'ID')
  allowNull: false       // Whether the association is required
});

db.Booking.belongsTo(db.Movie_Session, {
  foreignKey: 'MOVIE_SESSION_ID', // Foreign key to MOVIE_SESSION table
  targetKey: 'ID',               // Target key in MOVIE_SESSION table (assuming it's 'ID')
  allowNull: false               // Whether the association is required
});


db.sync = async () => {
    // Sync schema.
    await db.sequelize.sync({ alter: false });
  };

module.exports = db;