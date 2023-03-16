const { Op } = require("sequelize");
const moment = require('moment');
const jwt = require("jsonwebtoken");
const Trip = require("../models/Trip");
const User = require("../models/User");
const Location = require("../models/Location");
const Segment = require("../models/Segment");
const { validationResult } = require("express-validator");

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  let { dbTrip, dbLocations, dbSegments } = [];

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Get the creator
  const token =
    req.header("Authorization") && req.header("Authorization").split(" ")[1];
  const driver = jwt.verify(token, process.env.JWT_SECRET).id;

  // Check if user has already a trip in the same date
  const userHasTripInSameDate = await Trip.findOne({
    where: {
      driver: driver,
      startDate: {
        [Op.between]: [
          moment(req.body.startDate).startOf("day").toDate(),
          moment(req.body.startDate).endOf("day").toDate(),
        ],
      },
    },
  });
  
  if (userHasTripInSameDate) {
    return res.status(400).json({ message: "User already has a trip at the same date" });
  }

  // Create a Trip
  const trip = {
    startDate: req.body.startDate,
    seats: req.body.seats,
    price: req.body.price,
    driver: driver,
  };

  // Save Trip in the database
  try {
    dbTrip = await Trip.create(trip);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Trip.",
    });
  }

  // Sort steps by order
  const locations = req.body.steps
  .sort((a, b) => a.order - b.order)
  .map(({ name, address }) => ({ name, address }));

  // Create all Location from Req steps
  try {
    dbLocations = await Location.bulkCreate(locations);
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        "Some error occurred while creating Locations of the trip.",
    });
  }

  // Filter out the first location
  // segment = between 2 locations
  const newSegments = dbLocations.reduce((segments, step, index) => {
    if (index === 0) return segments;

    segments.push({
      startLocation: dbLocations[index - 1].id,
      endLocation: dbLocations[index].id,
      tripId: dbTrip.id,
    });

    return segments;
  }, []);

  // Create All Segments From Locations
  try {
    dbSegments = await Segment.bulkCreate(newSegments);
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        "Some error occurred while creating Segments of the trip.",
    });
  }

  res.send({ dbTrip, dbLocations, dbSegments });
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
          err.message || "Some error occurred while retrieving Trips.",
      });
    });
};

// // Find a single Tutorial with an id
// exports.findOne = (req, res) => {};

// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {};

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {};
