const db_conn = require("../db/db");

const rating  = {}

rating.addRatingToInstructor = (student_id, instructor_id, rating) => {
    const addRatingQuery = `INSERT INTO rating (student_id,instructor_id,rating) VALUES (?,?,?)`
    db_conn.query(addRatingQuery,[student_id,instructor_id,rating], (err,res) => {
        if(err) throw err
        if(res.length > 0){
            let i = 0, sum = 0
            for(;i < res.length;i++){
                sum += res[i].rating
            }
            const rating = sum / res.length
            const updateInstructorRatingQuery = `UPDATE instructor set rating = ${rating} where student.user_id =${instructor_id}`
            db_conn.query(updateInstructorRatingQuery,(err,res) => {
                if(err) throw err
                console.log("successfull added rating");
            })

        }
    })
}

rating.getRatingbyInstructorId = (instructor_id, callback) => {
    const getRatingQuery = `SELECT * from rating where rating.instructor_id = ${instructor_id}`

    db_conn.query(getRatingQuery, (err,res,fields) => {
        if(err){
            callback(err,null)
            return
        } 
        callback(null,res)        
    })
}

module.exports = rating