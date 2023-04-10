const db_conn = require("../db/db");

const userModel = {}

userModel.addUser = (newUser) => {
    const {id, firstName, lastName, gender, contactNumber, emailAddress, dateOfBirth, profilePicture} = newUser;
    const query = 'INSERT INTO User (user_id, first_name, last_name,gender,contact_number,email_address,data_of_birth,profile_picture) VALUES (?, ?, ?,?,?,?,?,?)'
    db_conn.query(query, [id,firstName,lastName,gender, contactNumber, emailAddress, dateOfBirth,profilePicture],(err, result) => {
        if(err) throw err
        console.log('Successfully inserted user data');
    })
    return id;
}



module.exports = userModel