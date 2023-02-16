const { DataTypes } = require('sequelize');
const Trip = require('./Trip');
const User = require('./User');
const sequelize = require('../database')()

const Passenger = sequelize.define('Passenger', {
    state: {
        type: DataTypes.ENUM,
        values: ['En attente', 'Accepté'],
        allowNull: false,
        defaultValue: 'En attente'
    },
    userId: {
      type: DataTypes.INTEGER
    },
    tripId: {
      type: DataTypes.INTEGER
    }
}, { timestamps: false });

User.hasMany(Passenger, {
    foreignKey: "userId",
});
Passenger.belongsTo(User, {
    foreignKey: "userId",
});
Trip.hasMany(Passenger, {
    foreignKey: "tripId",
});
Passenger.belongsTo(Trip, {
    foreignKey: "tripId",
});

Passenger.sync({ force: true })
.then(() => {
    console.log("Synced Passenger.");
})
.catch((err) => {
    console.log("Failed to sync Passenger: " + err.message);
});

module.exports = Passenger





