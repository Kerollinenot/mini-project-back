const express = require('express')
const router = express.Router()
const groupsController = require('../controllers/groups')

router.get('/', groupsController.getGroups)

module.exports = router