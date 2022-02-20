const mysqlConnection = require('../config/mysql')





const newUser =   async (fullname, email, password, phone, age, gender) => {
       return new Promise( (resolve, reject) => {
           mysqlConnection.query({
               sql: `Insert into users(fullname, email, password, phone, age, gender)values(?,?,?,?,?,?)`,
               values: [fullname, email, password, phone, age, gender]
           }
            ,  (err, results, fields) => {
                if (err) {
                  reject(err);
                }
                resolve(results);
            })
         })
    
    

    
}


const checkUser = async (email, phone) => {
   
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql: `select * from users where email=? or phone=?`,
            values: [email, phone]
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                resolve(results)
          })
    })
}

const getUserDetailsByEmail =  async ( email) => {
   
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql: `select * from users where email=?`,
            values: [email]
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                resolve(results)
          })
    })
}

const forgetPasswordModel = async(email, hash) => {
    return new Promise( (resolve, reject) => {
        mysqlConnection.query(
            {
                sql: `Insert into _forget_password(email,hash)values(?,?)`,
                values: [email,hash]
            },
            (err, results, fields) => {
             if (err) {
               reject(err);
             }
             resolve(results);
         })
      })
 
 
 
 
}

const validateHash = async (hash) => {
   
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql: `select * from _forget_password where hash=?`,
            values: [hash]
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                resolve(results)
          })
    })
}

const updatePassword = async (password, email) => {
   
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql: `update Customer set password=? where email=?`,
            values: [password, email]
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                resolve(results)
          })
    })
}

const deleteResetPasswordRecord = async (hash) => {
   
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql: `delete from _forget_password where hash=?`,
            values: [hash]
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                resolve(results)
          })
    })
}









module.exports = {
    newUser,
    checkUser,
    getUserDetailsByEmail,
    forgetPasswordModel,
    validateHash,
    updatePassword,
    deleteResetPasswordRecord




}