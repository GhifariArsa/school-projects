module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "USER",
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      EMAIL: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      USERNAME: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      PASSWORD: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      JOIN_DATE: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      BLOCKED: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
          defaultValue: 0
      },
    },
    {
      tableName: "USER",
      timestamps: false,
    }
  );
