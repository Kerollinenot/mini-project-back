const express = require('express')
const router = express.Router()

const groupsController = require('../controllers/groups');
const { authenticateUser } = require('../middlewares/authenticateUser');

router.get('/', authenticateUser, groupsController.getGroups);

module.exports = router