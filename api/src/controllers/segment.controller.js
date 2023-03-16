const sequelize = require("../database");
const Trip = require("../models/Trip");
const User = require("../models/User");
const Location = require("../models/Location");
const Segment = require("../models/Segment");


// Retrieve all Segments from the database.
exports.findAll = (req, res) => {
  Segment.findAll({ include: [{ all: true, nested: true }]  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving trips.",
      });
    });
};

// // Find a single Tutorial with an id
// exports.findOne = (req, res) => {};

// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {};

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {};
