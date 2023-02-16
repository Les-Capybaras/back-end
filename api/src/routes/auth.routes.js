module.exports = app => {
    const users = require("../controllers/user.controller.js");

    const { isAuth } = require("../middlewares/auth");
  
    var router = require("express").Router();

    // Login
    router.post("/login", users.login);

    // Create a new User
    router.post("/register", users.create);

    // Retrieve a user
    router.get('/me', isAuth, users.findOne);
  
    app.use('/api/auth', router);
  };