const { checkSchema } = require('express-validator');
const { tripSchema } = require('../schemas/trip-schema');

/**
 * @swagger
 * components:
 *   schemas:
 *     Trip:
 *       type: object
 *       required:
 *         - startDate
 *         - seats
 *         - price
 *         - steps
 *       properties:
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the Trip
 *         seats:
 *           type: integer
 *           description: The number of seats avalaible for the Trip
 *         price:
 *           type: integer
 *           description: The price of the trip
 *         steps:
 *           type: array
 *           description: An array that contains the steps of the Trip 
 *       example:
 *         startDate: 2023-04-09 12:24:03
 *         seats: 4
 *         price: 13
 *         steps: []
 *    
 */

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
 *     responses:
 *       200:
 *         description: All of the trips.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *   post:
 *     tags: [Trips]
 *     summary: Create a trip.
 *     description: Create a trip in database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trip'
 *     responses:
 *       200:
 *         description: The created Trip.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       500:
 *         description: Server error
 */

module.exports = app => {
    const trips = require("../controllers/trip.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Trip
    router.post("/", checkSchema(tripSchema), trips.create);
  
    // Retrieve all Trip
    router.get("/", trips.findAll);
  
    // Retrieve a single Trip with id
    // router.get("/:id", trips.findOne);
  
    // Update a Trip with id
    // router.put("/:id", trips.update);
  
    // Delete a Trip with id
    // router.delete("/:id", trips.delete);
  
    app.use('/api/trips', router);
  };