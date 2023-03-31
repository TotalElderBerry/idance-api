const db_conn = require("../db/db");

const instructorModel = {}

instructorModel.addInstructor = (newInstructor) => {
    const {user_id,rating,description,dance_specialty} = newInstructor
    const query = 'INSERT INTO Instructor (user_id, rating, description, dance_specialty) VALUES (?, ?, ?, ?)'

    db_conn.query(query, [user_id,rating,description,dance_specialty], (err,result) => {
        if(err) throw err
        console.log('Successfully inserted new instructor data');
    })
}

instructorModel.getUserInstructorbyId = (id, cbResult) => {
   
}

module.exports = instructorModel