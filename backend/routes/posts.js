var express = require('express');
var router = express.Router();
var PostController = require('../src/controllers/PostController');

router.get('/', PostController.getAll);
router.post('/', PostController.insert)
router.put('/:id', PostController.update);
router.delete('/:id', PostController.delete);


module.exports = router;
