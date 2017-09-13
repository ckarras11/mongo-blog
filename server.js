const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT, DATABASE_URL } = require('./config')
const { Post } = require('./models');

mongoose.Promise = global.Promise;

const app = express();
app.use(bodyParser.json());

//get

//get/:id

//post

//put

//delete

let server;

//run server

//close server

//if (require.main === module) {


//}

//module.exports = {app, runServer, closeServer}
