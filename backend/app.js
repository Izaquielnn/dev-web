var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var mongoose = require('mongoose');

var db = "mongodb+srv://plantinhas:ztcPC4BS3Io5nOoG@cluster0.0hzwx.mongodb.net/plantinhas?retryWrites=true&w=majority";

mongoose.connect(db)
    .then(() => console.log(`Connected to ${db}`))
    .catch(err =>
        console.log(`Error to connect on ${db}`, err)
    );

var indexRouter = require('./routes/index');

var app = express();

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

module.exports = app;
