const { DataTypes } = require('sequelize');
const User = require('./User');
const sequelize = require('../database')()

const Trip = sequelize.define('Trip', {
    state: {
        type: DataTypes.ENUM,
        values: ['En attente', 'En cours', 'Terminé'],
        allowNull: false,
        defaultValue: 'En attente'
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    seats: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    }, {
        freezeTableName: true
    });

    Trip.driver = Trip.hasOne(User)

    Trip.sync({ force: true })
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

module.exports = Trip;

