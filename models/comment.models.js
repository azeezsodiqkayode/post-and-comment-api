const mysqlConnection = require('../config/mysql')

const newComment =   async (postID, userID, comment) => {
    return new Promise( (resolve, reject) => {
        mysqlConnection.query({
            sql: `Insert into comments(postID, userID, comment)values(?,?,?,?,?,?)`,
            values: [postID, userID, comment]
        }
         ,  (err, results, fields) => {
             if (err) {
               reject(err);
             }
             resolve(results);
         })
      })
 
 

 
}

module.exports={
    newComment
}