const sequelize = require("../database");
const { DataTypes } = require("sequelize");
const Location = require("./Location");
const Trip = require("./Trip");

const Segment = sequelize.define(
  "Segment",
  {
    // Model attributes are defined here
    startLocation: {
      type: DataTypes.INTEGER,
      references: {
        model: Location,
        key: "id",
      },
      allowNull: false,
    },
    endLocation: {
      type: DataTypes.INTEGER,
      references: {
        model: Location,
        key: "id",
      },
      allowNull: false,
    },
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Trip,
        key: "id",
      }
    }
  },
  {
    // Other model options go here
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Segment;
