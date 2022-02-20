const express = require('express')
const router = express.Router()
const usersController  = require('../controllers/users.controllers')


router.post('/user/create', usersController.createNewUser)


module.exports = router