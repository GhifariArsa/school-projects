module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "BOOKING ",
    {
      USER_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "USER",
          key: "ID",
        },
      },
      MOVIE_SESSION_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "MOVIE_SESSION",
          key: "ID",
        },
      },
      SEATS_BOOKED: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "BOOKING",
      timestamps: false,
    }
  );
