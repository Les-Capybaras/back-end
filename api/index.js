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

// Models
require("./src/sync")();

// Swagger
require("./src/swagger")(app);


// Routes
//require("./src/routes")(app);
require("./src/routes/user.routes")(app);
require("./src/routes/trip.routes")(app);
require("./src/routes/auth.routes")(app);
require("./src/routes/car.routes")(app);



// Test connection to RabbitMQ
// amqplib.connect("amqp://host.docker.internal:5672", (err, conn) => {
//   if (err) throw err;
//   if (conn) console.log("Success connection to Amqp");
// });

// Start server
app.listen(PORT, () => {
  console.log(`[EXPRESS] - Server listening on port ${PORT}`);
});
