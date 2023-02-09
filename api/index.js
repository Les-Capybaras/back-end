// Vars
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const amqplib = require("amqplib/callback_api");

// Express App
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Select the env file
dotenv.config();
const PORT = process.env.API_PORT || 5000;

const sequelize = require("./src/database")();

// Test connection to database
async function testAuthenticate() {
  try {
    await sequelize.authenticate();
    console.log("[DATABASE] - Connection has been established successfully.");
  } catch (error) {
    console.error("[DATABASE] - Unable to connect to the database:", error);
  }
}

testAuthenticate();

require("./src/model/trip")();

// Routes
require("./src/routes")(app);

// Test connection to RabbitMQ
// amqplib.connect("amqp://host.docker.internal:5672", (err, conn) => {
//   if (err) throw err;
//   if (conn) console.log("Success connection to Amqp");
// });

// Start server
app.listen(PORT, () => {
  console.log(`[EXPRESS] - Server listening on port ${PORT}`);
});
