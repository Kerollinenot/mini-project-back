const express = require('express')
const router = express.Router()
const groupsController = require('../controllers/groups')
const { authenticateUser } = require('../middlewares/authenticateUser');
const errorLogger = require('../middlewares/errorLogger');

router.use(errorLogger)
router.get('/', authenticateUser, groupsController.getGroups)

module.exports = router