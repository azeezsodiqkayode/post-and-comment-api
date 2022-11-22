require('dotenv').config()
const jwt = require('jsonwebtoken')

const authentication = async(req, res, next) =>{

    const {token} = req.headers
    if(!token) {
        res.status(401).send({
            status: false,
            message: "Unauthorized Access"
        })
    }else{
        const tokenSplit = token.split(" ")
        jwt.verify(tokenSplit[1],process.env.JWT_SECRET, (err, decoded) =>{

            if(err){
                res.status(401).send({
                    status: false,
                    message: "Unauthorized Access"
                })
            }
            req.params.userEmail = decoded.email
            req.params.fakeId = decoded._id
            next()
        })
    }


}

module.exports = {
    authentication
}