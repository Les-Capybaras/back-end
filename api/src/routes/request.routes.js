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
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the trip to request a seat in.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               segmentIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: List of segment IDs for the trip.
 *           example:
 *             segmentIds: [1, 2]
 *     responses:
 *       '200':
 *         description: Successfully requested a seat in the trip.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request.
 *                 id:
 *                   type: integer
 *                   description: ID of the request.
 *                 userId:
 *                   type: integer
 *                   description: ID of the user making the request.
 *                 tripId:
 *                   type: string
 *                   description: ID of the trip the request is for.
 *               example:
 *                 status: pending
 *                 id: 1
 *                 userId: 2
 *                 tripId: "1"
 *
 * /request/:id/accept:
 *   get:
 *     tags: [Requests]
 *     summary: Accept a request to join a trip.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the trip to request a seat in.
 *         required: true
 *         schema:
 *           type: integer
 * /request/:id/reject:
 *   get:
 *     tags: [Requests]
 *     summary: Reject a request to join a trip.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the trip to request a seat in.
 *         required: true
 *         schema:
 *           type: integer
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