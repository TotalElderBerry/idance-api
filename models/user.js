const db_conn = require("../db/db");

const userModel = {}

userModel.addUser = (newUser) => {
    const {id, firstName, lastName} = newUser;
    const query = 'INSERT INTO User (user_id, first_name, last_name) VALUES (?, ?, ?)'
    db_conn.query(query, [id,firstName,lastName],(err, result) => {
        if(err) throw err
        console.log('Successfully inserted user data');
    })
    return id;
}



module.exports = userModel