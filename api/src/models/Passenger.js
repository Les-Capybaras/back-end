const { DataTypes } = require('sequelize');
const sequelize = require('../database')

const Passenger = sequelize.define('Passenger', {
    state: {
        type: DataTypes.ENUM,
        values: ['En attente', 'Accepté'],
        allowNull: false,
        defaultValue: 'En attente'
    }
}, { freezeTableName: true });

module.exports = Passenger





