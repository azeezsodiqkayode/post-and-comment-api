require('dotenv').config()
const { v4: uuidv4 } = require('uuid')
const Joi = require('Joi')
const bcrypt = require('bcrypt')
const { isEmpty, doSomeAsyncMagik } = require('../utils/utils')
const saltRounds = 10
const { readFileAndSendEmail } = require('../services/email.services')
const { newUser , checkUser } = require('../models/users.models')
const msgClass = require('../errors/error')

const hashPassword = (password) => {
    
    return new Promise((resolve, reject) => {

        bcrypt.genSalt(saltRounds,  (err, salt)=> {
            bcrypt.hash(password, salt,  (err, hash)=> {
                if (err) {
                    reject(err)
                }
                resolve([salt, hash])
            });
        });
 

    })
}


const createNewUser = async (req, res) => {
    const { email, firstname, surname, password, phone, age, gender } = req.body
 
    const userSchema = Joi.object({
        firstname: Joi.string().required(),
        surname: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string(), //length(11).pattern(/^[0-9]+$/),
        password: Joi.string().alphanum().required(),
        age: Joi.string().required(),
        gender: Joi.string().required()
    })

    const validateUser = userSchema.validate(req.body)
    if (validateUser.error) { 
        res.status(422).send({
            status: false,
            message: "Bad Request",
            data: []
        })
    }

  
    //
    //const otp = generateOTP()
    const fullname = `${firstname} ${surname}`
    const userID = uuidv4()
    try {
        const [err, checkIfUserExists] =  await doSomeAsyncMagik(checkUser(email, phone))
        if (err){
            throw new Error("Something went wrong")
        } 
        
        if (!isEmpty(checkIfUserExists)) {
             throw new Error(msgClass.CustomerExist)
         } 
        if (age < 18 ){
            throw new Error ("You are underage, Go away")
        }
        
        const passwordHashed = await hashPassword(password)
        await newUser( fullname, email, passwordHashed[1], phone, age, gender, userID) 
        
        const dataReplacement = {
             "fullname": fullname,
         }
 
        readFileAndSendEmail (email, "Welcome", dataReplacement, 'welcome')
         
        res.status(200).send({
             status: true,
             message: msgClass.CustomerCreated,
             data: []
         })
     } 
     catch (err) {
         console.log(`error: ${err.message}`)
         res.status(200).send({
             status: false,
             message:   err.message || msgClass.GeneralError
 
      })
     }
} 


module.exports={
    createNewUser,
hashPassword}