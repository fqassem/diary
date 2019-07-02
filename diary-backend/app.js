const dotenv = require('dotenv').config();
const fbAdmin = require('./firebase');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var postsRouter = require('./routes/posts');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const verifyToken = async (req, res, next) => {
    const {authorization}= req.headers;
    try {
        const decodedIdToken = await fbAdmin.auth().verifyIdToken(authorization);
        if(decodedIdToken) {
            req.body.uid = decodedIdToken.uid;
            return next();
        } else {
            return res.status(401).send("You are unauthorized");
        }
    } catch(error) {
        res.status(401).send("You are unauthorized");
    }
};

app.use('/', verifyToken);
app.use('/posts', postsRouter);

module.exports = app;
