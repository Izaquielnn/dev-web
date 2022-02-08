var express = require('express');
var router = express.Router();

var postsRouter = require('./posts');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("This API is running, baby!");
});

router.use('/posts', postsRouter);

module.exports = router;
