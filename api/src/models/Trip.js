const { DataTypes } = require('sequelize');
const sequelize = require('../database')()

module.exports = () => {
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

    sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

    return Trip
};


