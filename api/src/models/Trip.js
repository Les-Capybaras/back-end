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
    },
    driver: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
    }, {
        freezeTableName: true
    });

    Trip.belongsTo(User, {
        foreignKey: 'driver',
    })
    User.hasMany(Trip, {
        foreignKey: 'driver',
        allowNull: true
    });

    Trip.sync({ force: true })
    .then(() => {
        console.log("Synced Trip.");
    })
    .catch((err) => {
        console.log("Failed to sync Trip: " + err.message);
    });

module.exports = Trip;

