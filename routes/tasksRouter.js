const express = require('express')
const router = express.Router()
const tasksController = require('../controllers/tasks');
const { authenticateUser } = require('../middlewares/authenticateUser');

router.get('/:groupID', authenticateUser, tasksController.getTasks)

module.exports = router