const db_conn = require("../db/db");

const rating  = {}

rating.addRatingToInstructor = (student_id, instructor_id, rating) => {
    const addRatingQuery = `INSERT INTO Rating (student_id,instructor_id,rating) VALUES (?,?,?)`

    db_conn.query(addRatingQuery,[student_id,instructor_id,rating], (err,res) => {
        if(err) throw err
        return "Success"
    })
}

rating.getRatingbyInstructorId = (instructor_id, callback) => {
    const getRatingQuery = `SELECT * from Rating where Rating.instructor_id = ${instructor_id}`

    db_conn.query(getRatingQuery, (err,res,fields) => {
        if(err){
            callback(err,null)
            return
        } 
        callback(null,res)        
    })
}

module.exports = rating