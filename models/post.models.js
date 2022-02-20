const mysqlConnection = require('../config/mysql')

const newPost =   async (userID, postID, post) => {
    return new Promise( (resolve, reject) => {
        mysqlConnection.query({
            sql: `Insert into posts(userID, postID, post_content)values(?,?,?,?,?,?)`,
            values: [userID, postID, post]
        }
         ,  (err, results, fields) => {
             if (err) {
               reject(err);
             }
             resolve(results);
         })
      })
 
 
}

const fetchPost = async ()



module.exports ={
    newPost
}