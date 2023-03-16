const sequelize = require("../database");
const jwt = require("jsonwebtoken");
const Trip = require("../models/Trip");
const User = require("../models/User");
const Location = require("../models/Location");
const Segment = require("../models/Segment");
let dbTrip, dbSegments, dbLocations = {}

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
// TODO Check for errors 
  // Get the creator
  const token =
    req.header("Authorization") && req.header("Authorization").split(" ")[1];
  const driver = jwt.verify(token, process.env.JWT_SECRET).id;

  // Create a Trip
  const trip = {
    startDate: req.body.startDate,
    seats: req.body.seats,
    price: req.body.price,
    driver: driver,
  };

  // Save Trip in the database
  try {
      dbTrip = await Trip.create(trip)
  } catch (error) {
    console.error("Can't create the trip :" + error);
  }

  // Create all Location from Req steps
  const steps = req.body.steps;
  steps.sort((a, b) => a.order - b.order);

  const locations = steps.map((step) => {
    return {
      name: step.name,
      address: step.address,
    };
  });

  try {
    dbLocations = await Location.bulkCreate(locations);
  } catch (error) {
    console.error("Can't create the locations :" + error);
  }

  // Create All Segments From Locations
  // segment = between 2 locations
  const segments = dbLocations.map((step, index) => {
    if (index === 0) return null;

    return {
      startLocation: dbLocations[index - 1].id,
      endLocation: dbLocations[index].id,
      tripId: dbTrip.id,
    };
  });
  // Remove null values
  const newSegments = segments.filter((segment) => segment !== null);
  try {
    dbSegments = await Segment.bulkCreate(newSegments);
  } catch (error) {
    console.error("Can't create the segments :" + error);
  }

};

// Retrieve all Trips from the database.
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
