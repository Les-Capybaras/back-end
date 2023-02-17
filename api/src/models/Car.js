const sequelize = require("../database");
const { DataTypes } = require("sequelize");

const Car = sequelize.define(
  "Car",
  {
    // Model attributes are defined here
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxSeatAvailable: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    // Other model options go here
    freezeTableName: true
  }
);



module.exports = Car;
