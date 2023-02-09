const { Sequelize } = require("sequelize");

// Database connection
const user = process.env.MARIADB_USER;
const pwd = process.env.MARIADB_PASSWORD;
const db = process.env.MARIADB_DATABASE;

module.exports = () => {
  const sequelize = new Sequelize(db, user, pwd, {
    host: "database", // Docker Service Name
    dialect: "mariadb",
  });
  return sequelize;
};
