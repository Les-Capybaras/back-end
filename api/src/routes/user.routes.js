module.exports = app => {
    const users = require("../controllers/user.controller.js");
    
    const { isAuth } = require("../middlewares/auth");
  
    var router = require("express").Router();

    // Retrieve all Users
    router.get("/", isAuth, users.findAll);
  
    // Update a User with id
    router.put("/:id", isAuth, users.update);
  
    // Delete a User with id
    router.delete("/:id", isAuth, users.delete);
  
    app.use('/api/users', router);
  };