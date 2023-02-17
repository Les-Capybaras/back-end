module.exports = () => {
  const User = require("./models/User");
  const Car = require("./models/Car");
  const Trip = require("./models/Trip");
  const Passenger = require("./models/Passenger");

  User.hasOne(Car);
  Car.belongsTo(User, {
    allowNull: true,
  })
  Trip.belongsTo(User, {
    foreignKey: 'driver',
  })
  User.hasMany(Trip, {
      foreignKey: 'driver',
      allowNull: true
  });
  User.hasMany(Passenger); 
  Passenger.belongsTo(User);
  Trip.hasMany(Passenger);
  Passenger.belongsTo(Trip);

  const syncDatabase = async () => {
    try {
      // await sequelize.sync({ force: true, alter: true });
      await User.sync({ alter: true });
      await Car.sync({ alter: true });
      await Trip.sync({ alter: true });
      await Passenger.sync({ alter: true });
      console.log("[DATABASE] - Synced database.");
    } catch (error) {
      console.error("[DATABASE] - Unable to sync database:", error);
    }
  };
  syncDatabase();
};
