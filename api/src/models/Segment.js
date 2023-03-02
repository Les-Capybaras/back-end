const sequelize = require("../database");
const { DataTypes } = require("sequelize");
const City = require("./City");

const Segment = sequelize.define(
  "Segment",
  {
    // Model attributes are defined here
    startLocation: {
        type: DataTypes.INTEGER,
        references: {
            model: City,
            key: 'id'
        }
    },
    endLocation: {
        type: DataTypes.INTEGER,
        references: {
            model: City,
            key: 'id'
        }
    },
  },
  {
    // Other model options go here
    freezeTableName: true,
    timestamps: false 
  }
);



module.exports = Segment;
