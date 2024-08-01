const express = require('express')
const router = express.Router()
const tasksController = require('../controllers/tasks')

router.get('/', tasksController.getTasks)

module.exports = router