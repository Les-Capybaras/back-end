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
    }
}, { freezeTableName: true });

User.hasMany(Passenger); 
Passenger.belongsTo(User);
Trip.hasMany(Passenger);
Passenger.belongsTo(Trip);

Passenger.sync({ force: true })
.then(() => {
    console.log("Synced Passenger.");
})
.catch((err) => {
    console.log("Failed to sync Passenger: " + err.message);
});

module.exports = Passenger





