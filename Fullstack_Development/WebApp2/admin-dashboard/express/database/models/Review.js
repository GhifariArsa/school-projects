module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "REVIEW",
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
      USER_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "USER",
          key: "ID",
        },
      },
      REVIEW_DESC: {
        type: DataTypes.STRING(600),
        defaultValue: null,
      },
      NO_STARS: {
        type: DataTypes.INTEGER,
        defaultValue: null,
        validate: {
          min: 0,
          max: 5,
        },
      },
      DATETIME: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },
    {
      tableName: "REVIEW",
      timestamps: false,
    }
  );
