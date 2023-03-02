const sequelize = require("../database");

const BookedSegments = sequelize.define('BookedSegments', {},
 { timestamps: false }
 );

module.exports = BookedSegments;
