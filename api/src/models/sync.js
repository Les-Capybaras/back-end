module.exports = (sequelize) => {
  const User = require("../models/User");
  const Car = require("../models/Car");

  User.hasOne(Car);
  Car.belongsTo(User, {
    allowNull: true,
  })

  const syncDatabase = async () => {
    try {
      // await sequelize.sync({ force: true, alter: true });
      await User.sync({ alter: true });
      await Car.sync({ alter: true });
      console.log("[DATABASE] - Synced database.");
    } catch (error) {
      console.error("[DATABASE] - Unable to sync database:", error);
    }
  };
  syncDatabase();
};
