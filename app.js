const express = require("express");
const app = express();

const cors = require("cors");
const logger = require('morgan');
const config = require('./config/config');

var corsOptions = {
    origin: "http://localhost:4001"
};

app.use(logger('dev'));

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true, parameterLimit: 5000 }));

const routers = require("./routers");

app.use(routers);

app.listen(config.port, function(){
    console.log(`Server is running on port ${config.port}`);
})