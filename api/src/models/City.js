const sequelize = require("../database");
const { DataTypes } = require("sequelize");

const City = sequelize.define(
  "City",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  },
  {
    // Other model options go here
    freezeTableName: true,
    timestamps: false 
  }
);



module.exports = City;
