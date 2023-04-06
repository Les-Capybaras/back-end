const { checkSchema } = require('express-validator');
const { tripSchema, searchSchema } = require('../schemas/trip-schema');

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
 *         id:
 *           type: integer
 *           description: The Trip ID
 *         state:
 *           type: string
 *           description: The state of the Trip
 *           enum: [En attente, En cours, Terminé]
 *           default: En attente
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: The start dateTime of the Trip
 *         seats:
 *           type: integer
 *           description: The number of seats available for the Trip
 *         price:
 *           type: float
 *           description: The price of the trip
 *         driverId:
 *           type: integer
 *           description: The id of the driver
 *         steps:
 *           type: array
 *           description: An array that contains the steps of the Trip 
 *           items:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 required: true
 *               name:
 *                 type: string
 *                 required: true
 *               order:
 *                 type: integer
 *                 required: true
 *       example:
 *         id: 1
 *         state: "En attente"
 *         startDate: 2023-04-09 12:24:03
 *         seats: 4
 *         price: 13
 *         driver: {
 *           id: 1,
 *           userName: "John",
 *           email: "john@doe.com",
 *         }
 *         segments: [
 *           {
 *             id: 1,
 *             start: {
 *               id: 1,
 *               name: "Paris",
 *               address: "11 impasse de la gare",
 *             },
 *             end: {
 *               id: 2,
 *               name: "Lille",
 *               address: "11 impasse de la gare",
 *             },
 *           }
 *         ]
 *    
 */

/**
 * @swagger
 * tags:
 *   name: Trips
 *   description: Trip management
 * /trips/search:
 *   post:
 *     tags: [Trips]
 *     summary: Search for a trip.
 *     description: Search for a trip in database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startLocation:
 *                 type: string
 *               endLocation:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *           example:
 *             startLocation: "Paris"
 *             endLocation: "Lyon"
 *             startDate: "2021-04-09 12:30:00"
 *     responses:
 *       200:
 *         description: Trips that corresponds to the search parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trip'
 *       500:
 *         description: Server error
 * /trips/{id}:
 *   get:
 *     tags: [Trips]
 *     summary: Retrieve a trip.
 *     description: Retrieve a trip from database.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Trip id.
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: The created Trip.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       500:
 *         description: Server error
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
    router.get("/:id", trips.findOne);
  
    // Update a Trip with id
    // router.put("/:id", trips.update);
  
    // Delete a Trip with id
    // router.delete("/:id", trips.delete);

    // Retreive a trip with start location, end location and date
    router.post("/search", checkSchema(searchSchema), trips.search);

    // Request to join a trip as a passenger
    router.post("/:id/request", trips.request);

    // Accept a passenger request
    router.post("/response", trips.accept);


    app.use('/api/trips', router);
  };