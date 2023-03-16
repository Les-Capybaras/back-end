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
