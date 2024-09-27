module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "BOOKING ",
    {
      ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      USER_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "USER",
          key: "ID",
        },
      },
      MOVIE_SESSION_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
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
