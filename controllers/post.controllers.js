require('dotenv').config()
const { v4: uuidv4 } = require('uuid')
const Joi = require('Joi')
const bcrypt = require('bcrypt')
const { isEmpty, doSomeAsyncMagik } = require('../utils/utils')
const { readFileAndSendEmail } = require('../services/email.services')
const { newPost } = require('../models/post.models')
const msgClass = require('../errors/error')


const createPost = async (req, res)=>{
    const {userID, postContent } = req.body
    const postID = uuidv4()

try {
    const [err, creatingPost] = await doSomeAsyncMagik(newPost(userID, PostID, postContent))
    if (err){
        throw new Error("Internal Error")
    }
    if(isEmpty(creatingPost)){
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

const dashboard = async (req, res) =>{
    
    const perPage = req.query.perPage || 50
    const page = req.query.page || 1
     
    




}




module.exports ={
    createPost,
}