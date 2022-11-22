require('dotenv').config()
const jwt = require('jsonwebtoken')
const { getUserDetailsByEmail } = require('../models/users.models')

const authorization = async(req, res, next) =>{

    const email = req.params.userEmail
    if(!email){
        res.status(401).send({
            status: false,
            message: 'Unauthorized Access'
        })
    }else {

    await getUserDetailsByEmail(email)
    .then(resultFromLogin => {
        if (isEmpty(resultFromLogin)) {
            // email does not exist
            throw new Error("Unauthorized Access")
        }

        
    })
    .catch(err => {
        
        res.status(400).send({
            status: false,
            message: err.message || "Something went wrong"
        })
    })
}
    next()
}

module.exports = authorization