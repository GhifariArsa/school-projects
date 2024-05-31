module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "MOVIE",
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      TITLE: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      POSTER: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      RUNTIME: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      RATING_CLASS: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      HOVER_BG: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      HOVER_TXT: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      SLIDE_SHOW: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      AVG_RATING: {
        type: DataTypes.DECIMAL(3, 1),
        allowNull: false,
      },
      COMING_SOON: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      VIEW_COUNT: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      tableName: "MOVIE",
      timestamps: false, 
    }
  );
