
const sequelize = require("../database");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Car = require("../models/Car");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);
  return encryptedPassword;
}

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ msg: 'User Does not exist' });
      }
      console.log(password, user.password);
      // Validate password
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

          jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: 14400 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  userName: user.userName,
                  email: user.email
                }
              });
            }
          )
        })
    })
}

// Create and Save a new User
exports.create = async (req, res) => {

  // Create a User
  const user = {
    userName: req.body.userName,
    email: req.body.email,
    password: await hashPassword(req.body.password),
  };

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user.",
      });
    });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  User.findAll({ include: Car })
    .then((data) => {
      let users = [];
      data.forEach(user => {
        let { password, ...userWithoutPassword } = user.dataValues;
        users.push(userWithoutPassword);
      });
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users.",
      });
    });
};

// // Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.user.id;

  User.findByPk(id, { include: Car })
    .then((data) => {
      let { password, ...userWithoutPassword } = data.dataValues;
      res.send(userWithoutPassword);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};
