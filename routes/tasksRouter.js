const express = require('express')
const router = express.Router()
const tasksController = require('../controllers/tasks');
const { authenticateUser } = require('../middlewares/authenticateUser');
const errorLogger = require('../middlewares/errorLogger'); 

router.use(errorLogger)
router.get('/:groupID', authenticateUser, tasksController.getTasks)

module.exports = router