var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var postsRouter = require('./routes/posts');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/posts', postsRouter);

module.exports = app;
