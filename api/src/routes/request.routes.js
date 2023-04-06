// const { checkSchema } = require('express-validator');
// const { tripSchema, searchSchema } = require('../schemas/trip-schema');

/**
 * @swagger
 * tags:
 *  name: Requests
 *  description: Requests management
 * /requests:
 *   post:
 *     tags: [Requests]
 *     summary: Request a seat in a trip (n segments).
 *     description: Request a seat in a trip (n segments).
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