module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "MOVIE_SESSION",
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      MOVIE_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "MOVIE",
          key: "ID",
        },
      },
      SEATS_TAKEN: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      SEATS_AVAILABLE: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10
      },
      DATE: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      TIME: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {
      tableName: "MOVIE_SESSION",
      timestamps: false,
    }
  );
