const db_conn = require("../db/db");
const { formatDate } = require("../utils/dateDifference");

const studentModel = {}


studentModel.addStudent = (newStudent) => {
    const {id, level} = newStudent;
    const query = 'INSERT INTO student (user_id, level, isInstructor) VALUES (?, ?, 0)'
    db_conn.query(query, [id,level],(err, result) => {
        if(err) throw err
        console.log(result);
        return result.insertId;
    })
}

studentModel.getUserStudentbyId = (id, cbResult) => {
    const query = `SELECT * from user INNER JOIN student on student.user_id = '${id}'`
    db_conn.query(query, (err,res,fields)=>{
        if(err) {
            cbResult(err,null)
            return
        }
        if(res){
            cbResult(null,res)
            return
        }
        cbResult({type: 'no data'},null)
    })
}

studentModel.joinDanceClass = (dance_class_id, student_id) => {
    const query = `INSERT INTO dancebooking (student_id, dance_class_id, date_approved) values (?, ?, ?)`
    const dateNow = formatDate(new Date())
    db_conn.query(query, [student_id,dance_class_id, dateNow],(err, res)=>{
        if(err) throw err
        console.log('successfully inserted a dancebooking data');
    }) 
}

studentModel.getStudentDanceClassbyId = (student_id) => {
    const query =  `select * from danceclass inner join dancebooking on danceclass.dance_class_id = dancebooking.dance_class_id inner join Student on ${student_id} = dancebooking.student_id`

    db_conn.query(query,(err,res, fields) => {
        if(err) throw err
        return res
    })
}

module.exports = studentModel