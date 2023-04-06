const db_conn = require("../db/db");

const instructorModel = {}

instructorModel.addInstructor = (newInstructor) => {
    const {user_id,rating,description,dance_specialty} = newInstructor
    const query = 'INSERT INTO Instructor (user_id, rating, description, dance_specialty) VALUES (?, ?, ?, ?)'

    db_conn.query(query, [user_id,rating,description,dance_specialty], (err,result) => {
        if(err) throw err
        console.log(result);
        console.log('Successfully inserted new instructor data');
    })

    const updateStudentQuery = `UPDATE Student set isInstructor = 1 where Student.user_id = ${user_id}`
    db_conn.query(updateStudentQuery, (err, result) => {
        if(err) throw err
    })
}


instructorModel.getUserInstructorbyId = (id, cbResult) => {
    const query = `SELECT * from User INNER JOIN Instructor on Instructor.user_id = ${id}`

    db_conn.query(query,(err,res, fields) => {
        if(err) cbResult(err,null)
        if(res.length) {
            cbResult(null,res)
            return
        }
        cbResult({type: 'No instructor found'}, null)
    })
}

instructorModel.getDanceClassesOfInstructor = (id, callback) => {
    const query = `SELECT * from DanceClass where DanceClass.instructor_id = ${id}`

    db_conn.query(query,(err,res,fields) => {
        if(err){
            callback(err,null)
            return
        }
        if(res){
            callback(null,res)
            return
        }
        callback({type: 'no classes'},null)

    })
}

module.exports = instructorModel