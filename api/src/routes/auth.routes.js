const { checkSchema } = require('express-validator');
const { createSchema, loginSchema } = require('../schemas/user-schema');


/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: User authentication
 * /auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Retreive connected user data
 *     description: Retreive connected user data from database.
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login a user. 
 *     description: Login a user.
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a user.
 *     description: Register a user.
 */

module.exports = app => {
    const users = require("../controllers/user.controller.js");

    const { isAuth } = require("../middlewares/auth");
  
    var router = require("express").Router();

    // Login
    router.post("/login", checkSchema(loginSchema), users.login);

    // Create a new User
    router.post("/register", checkSchema(createSchema), users.create);

    // Retrieve a user
    router.get('/me', isAuth, users.findOne);
  
    app.use('/api/auth', router);
  };