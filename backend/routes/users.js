var express = require('express');
var router = express.Router();
var UserController = require('../src/controllers/UserController');
var UserMiddleware = require('../src/middleware/UserMiddleware');

router.get('/', UserController.getAll);
router.post('/', UserController.createUser);
router.put('/:id', UserMiddleware.authorize, UserController.update);

router.post('/auth', UserController.authenticate);


module.exports = router;
