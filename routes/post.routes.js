const express = require('express')
const router = express.Router()
const postController  = require('../controllers/post.controllers')


router.post('/post/create', postController.createPost)
router.post('/posts', postController.dashboard)

module.exports = router