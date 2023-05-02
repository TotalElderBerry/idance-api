const db_conn = require("../db/db");
const {formatDate} = require("../utils/dateDifference")
const instructorModel = {}

instructorModel.addInstructor = (newInstructor) => {
    const {user_id,description,dance_specialty} = newInstructor
    const query = 'INSERT INTO instructor (user_id, rating, description, dance_specialty) VALUES (?, 0, ?, ?)'

    db_conn.query(query, [user_id,description,dance_specialty], (err,result) => {
        if(err) throw err
        console.log(result);
        console.log('Successfully inserted new instructor data');
        const updateStudentQuery = `UPDATE student set isInstructor = 1 where student.user_id ='${user_id}'`
        db_conn.query(updateStudentQuery, (err, result) => {
            if(err) throw err
            return
        })
    })

}


instructorModel.getUserInstructorbyId = (id, cbResult) => {
    const query = `select * from user left join instructor on instructor.user_id = user.user_id and instructor.user_id = '${id}' where instructor.user_id = '${id}'`

    db_conn.query(query,(err,res, fields) => {
        console.log(err);
        if(err) {
            cbResult(err,null)
            return
        }
        else if(res.length > 0) {
            cbResult(null,res)
            return
        }else{
            cbResult({type: 'No instructor found'}, null)
        }
    })
    return
}

instructorModel.getLiveDanceClassesOfInstructor = (id, callback) => {
    const query = `select * from livedanceclass inner join danceclass on livedanceclass.dance_class_id = danceclass.dance_class_id where danceclass.instructor_id = ${id}`

    db_conn.query(query,(err,res) => {
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

instructorModel.acceptStudentDanceBooking = (student_id, dance_class_id) => {
    const dateNow = formatDate("");
    const query = `update dancebooking set date_approved = '${dateNow}' where student_id = ${student_id} and dance_class_id = ${dance_class_id}`

    db_conn.query(query,(err,res) => {
        if(err) throw err
        return "success"
    })
}


module.exports = instructorModel