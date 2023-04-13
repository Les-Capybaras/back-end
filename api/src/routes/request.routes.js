// const { checkSchema } = require('express-validator');
// const { tripSchema, searchSchema } = require('../schemas/trip-schema');

/**
 * @swagger
 * tags:
 *  name: Requests
 *  description: Requests management
 * /request/:id:
 *   post:
 *     tags: [Requests]
 *     summary: Request a seat in a trip (n segments).
 *     description: Request a seat in a trip (n segments).
 * /request/:id/accept:
 *   get:
 *     tags: [Requests]
 *     summary: Accept a request to join a trip.
 * /request/:id/reject:
 *   get:
 *     tags: [Requests]
 *     summary: Reject a request to join a trip.
 *   
 */

module.exports = app => {
    const requests = require("../controllers/request.controller.js");
  
    var router = require("express").Router();

    // TODO : add the schema for the request
    
    // Request to join a trip as a passenger
    router.post("/:id", requests.request);

    // Accept a passenger request
    router.get("/:id/accept", requests.accept);

    // Reject a passenger request
    router.get("/:id/reject", requests.reject);

    app.use('/api/request', router);
};