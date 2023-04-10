const db_conn = require("../db/db");
const { formatDate } = require("../utils/dateDifference");

const studentModel = {}


studentModel.addStudent = (newStudent) => {
    const {id, level} = newStudent;
    const query = 'INSERT INTO Student (user_id, level, isInstructor) VALUES (?, ?, 0)'
    db_conn.query(query, [id,level],(err, result) => {
        if(err) throw err
        console.log(result);
        return result.insertId;
    })
}

studentModel.getUserStudentbyId = (id, cbResult) => {
    const query = `SELECT * from User INNER JOIN Student on Student.user_id = ${id}`
    db_conn.query(query, (err,res,fields)=>{
        if(err) {
            cbResult(err,null)
        }
        if(res.length){
            cbResult(null,res)
            return
        }
        cbResult({type: 'no data'},null)
        return
    })
}

studentModel.joinDanceClass = (dance_class_id, student_id) => {
    const query = `INSERT INTO DanceBooking (student_id, dance_class_id, date_approved) values (?, ?, ?)`
    const dateNow = formatDate(new Date())
    db_conn.query(query, [student_id,dance_class_id, dateNow],(err, res)=>{
        if(err) throw err
        console.log('successfully inserted a dancebooking data');
    }) 
}

studentModel.getStudentDanceClassbyId = (student_id) => {
    const query =  `select * from DanceClass inner join DanceBooking on DanceClass.dance_class_id = DanceBooking.dance_class_id inner join Student on ${student_id} = DanceBooking.student_id`

    db_conn.query(query,(err,res, fields) => {
        if(err) throw err
        return res
    })
}

module.exports = studentModel