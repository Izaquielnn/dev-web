var express = require('express');
var router = express.Router();
var PostController = require('../src/controllers/PostController');
var UserMiddleware = require('../src/middleware/UserMiddleware');

router.get('/', PostController.getAll);
router.post('/', UserMiddleware.authorize, PostController.insert)
router.put('/:id', UserMiddleware.authorize, PostController.update);
router.delete('/:id', UserMiddleware.authorize, PostController.delete);


module.exports = router;
