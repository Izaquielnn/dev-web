var express = require('express');
var router = express.Router();

var usersRouter = require('./users');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("This API is running, baby!");
});

router.use('/users', usersRouter);

module.exports = router;
