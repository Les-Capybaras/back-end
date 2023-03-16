/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         password2:
 *           type: string
 *       example:
 *         username: Test
 *         email: test@test.com
 *         password: changeme
 */

/**
 * @swagger
 * tags: 
 *  name: Users
 *  description: User management and login
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve all users.
 *     description: Retrieve all users from database.
 *     responses:
 *       200:
 *         description: All of the users.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 * /:id:
 *   put:
 *     tags: [Users]
 *     summary: Update a user.
 *     description: Update a user from database.
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user.
 *     description: Delete a user from database.
 */

module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  const { isAuth } = require("../middlewares/auth");

  var router = require("express").Router();

  router.get("/", isAuth, users.findAll);
  
  router.put("/:id", isAuth, users.update);

  router.delete("/:id", isAuth, users.delete);

  app.use("/api/users", router);
};
