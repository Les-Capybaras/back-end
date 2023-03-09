const sequelize = require("../database");
const { DataTypes } = require("sequelize");
const Location = require("./Location");

const Segment = sequelize.define(
  "Segment",
  {
    // Model attributes are defined here
    startLocation: {
        type: DataTypes.INTEGER,
        references: {
            model: Location,
            key: 'id'
        }
    },
    endLocation: {
        type: DataTypes.INTEGER,
        references: {
            model: Location,
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
