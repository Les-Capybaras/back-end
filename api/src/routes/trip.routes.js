const { checkSchema } = require('express-validator');
const { tripSchema } = require('../schemas/trip-schema');

/**
 * @swagger
 * tags:
 *   name: Trips
 *   description: Trip management
 * /trips:
 *   get:
 *     tags: [Trips]
 *     summary: Retrieve all trips.
 *     description: Retrieve all trips from database.
 *   post:
 *     tags: [Trips]
 *     summary: Create a trip.
 *     description: Create a trip in database.
 */

module.exports = app => {
    const trips = require("../controllers/trip.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Trip
    router.post("/", checkSchema(tripSchema), trips.create);
  
    // Retrieve all Trip
    router.get("/", trips.findAll);
  
    // // Retrieve a single Trip with id
    // router.get("/:id", trips.findOne);
  
    // // Update a Trip with id
    // router.put("/:id", trips.update);
  
    // // Delete a Trip with id
    // router.delete("/:id", trips.delete);
  
    app.use('/api/trips', router);
  };