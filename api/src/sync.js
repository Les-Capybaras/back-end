module.exports = () => {
  const User = require("./models/User");
  const Car = require("./models/Car");
  const Trip = require("./models/Trip");
  const Passenger = require("./models/Passenger");
  const Location = require("./models/Location");
  const Segment = require("./models/Segment");
  const BookedSegments = require("./models/BookedSegments");

  User.hasOne(Car);
  Car.belongsTo(User, {
    allowNull: true,
  });
  Trip.belongsTo(User, {
    foreignKey: "driver",
  });
  User.hasMany(Trip, {
    foreignKey: "driver",
    allowNull: true,
  });
  Location.hasMany(Segment, {
    foreignKey: "startLocation",
    allowNull: true,
    as: "start",
  });
  Location.hasMany(Segment, {
    foreignKey: "endLocation",
    allowNull: true,
    as: "end",
  });
  Segment.belongsTo(Location, {
    foreignKey: "startLocation",
    as: "start",
  });
  Segment.belongsTo(Location, {
    foreignKey: "endLocation",
    as: "end",
  });
  Segment.belongsTo(Trip, {
    foreignKey: "tripId",
  });
  Passenger.belongsToMany(Segment, { through: BookedSegments });
  Segment.belongsToMany(Passenger, { through: BookedSegments });
  Trip.hasMany(Segment, {
    foreignKey: "tripId",
  });
  User.hasMany(Passenger);
  Passenger.belongsTo(User);

  const syncDatabase = async () => {
    try {
      // await sequelize.sync({ force: true, alter: true });
      await User.sync({ alter: true });
      await Car.sync({ alter: true });
      await Trip.sync({ alter: true });
      await Passenger.sync({ alter: true });
      await Location.sync({ alter: true });
      await Segment.sync({ alter: true });
      await BookedSegments.sync({ alter: true})
      console.log("[DATABASE] - Synced database.");
    } catch (error) {
      console.error("[DATABASE] - Unable to sync database:", error);
    }
  };
  syncDatabase();
};
