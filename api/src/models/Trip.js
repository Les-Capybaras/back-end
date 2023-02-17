const { DataTypes } = require('sequelize');
const User = require('./User');
const sequelize = require('../database')

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

module.exports = Trip;

