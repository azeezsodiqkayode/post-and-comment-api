require('dotenv').config()
const { v4: uuidv4 } = require('uuid')
const Joi = require('Joi')
const bcrypt = require('bcrypt')
const { isEmpty, doSomeAsyncMagik } = require('../utils/utils')
const { readFileAndSendEmail } = require('../services/email.services')
const { newComment } = require('../models/comment.models')
const msgClass = require('../errors/error')


const addComment = (req, res)=>{
    const { userID, postID, comment } = req.body
    const badWord

    try {
        const [err, addCommenttoPost] = await doSomeAsyncMagik(newComment(userID, PostID, comment))
        if (err){
            throw new Error("Internal Error")
        }
        if(isEmpty(addCommenttoPost)){
            throw new Error ("Can't make an empty post")
        }
    
        res.status(200).send({
            status: true,
            message: "Post successfully created"
        })
    
    
    } catch(e){
        res.status(200).send({
            status: false,
            message: "Error! Post not created, please try again"
        })
    }
}



module.exports = {
    addComment
}