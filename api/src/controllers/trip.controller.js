const sequelize = require("../database");
const jwt = require('jsonwebtoken');
const Trip = require("../models/Trip");
const User = require("../models/User");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Get the creator
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
  const driver = jwt.verify(token, process.env.JWT_SECRET).id;


  // Create a Trip
  const trip = {
    startDate: req.body.startDate,
    seats: req.body.seats,
    driver: driver
  };

  // Save User in the database
  Trip.create(trip)
    .then((data) => {
      res.send(data);

      // Here insert Segment dependecies 
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  Trip.findAll({ include: User })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// // Find a single Tutorial with an id
// exports.findOne = (req, res) => {};

// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {};

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {};
