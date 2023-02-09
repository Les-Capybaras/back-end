// Vars
const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { Sequelize } = require('sequelize')
const amqplib = require('amqplib/callback_api');

// Express App
const app = express()
app.use(cors())
app.use(bodyParser.json())

// Select the env file

dotenv.config()
const PORT = process.env.API_PORT || 5000

app.listen(PORT, () => {
  console.log(`server listen on port ${PORT}`)
})

// Database connection
const user = process.env.MARIADB_USER
const pwd = process.env.MARIADB_PASSWORD
const db = process.env.MARIADB_DATABASE

const sequelize = new Sequelize(db, user, pwd, {
  host: 'database', // Docker Service Name
  dialect: 'mariadb'
});

async function testAuthenticate () {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testAuthenticate()

app.use('/', (req, res)=>{
  res.status(200);
  res.send("Hello World");
});

amqplib.connect('amqp://host.docker.internal:5672', (err, conn) => {
  if (err) throw err;
  if (conn) console.log('Success connection to Amqp');
});

