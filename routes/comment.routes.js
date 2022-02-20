const express = require('express')
const router = express.Router()
const commentController  = require('../controllers/comments.controllers')


router.post('/post/comment/create', commentController.addComment)


module.exports = router