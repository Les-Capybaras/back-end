const { DataTypes } = require('sequelize');
const sequelize = require('../database')

const Passenger = sequelize.define('Passenger', {
    state: {
        type: DataTypes.ENUM,
        values: ['pending', 'validated', 'rejected'],
        allowNull: false,
        defaultValue: 'pending'
    }
}, { freezeTableName: true });

module.exports = Passenger





