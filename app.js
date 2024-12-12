const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyparser = require('body-parser');
const app = express();
const bodyParser = require('body-parser');
const { home, country } = require('./src/routes');

//CONFIGURACIONES PRIMERO
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//RUTAS
app.use('/home', home);
app.use(`/${process.env.API_VER}/country`, country);

module.exports = app;