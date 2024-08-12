const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const errorLogger = require('../middlewares/errorLogger'); 

router.use(errorLogger)
router.get('/', usersController.getUsers);
router.post('/authorization', usersController.authorization);
router.post('/registration', usersController.registration);

module.exports = router