const db_conn = require("../db/db");

const studentModel = {}


studentModel.addStudent = (newStudent) => {
    const {id, level} = newStudent;
    const query = 'INSERT INTO Student (user_id, level, isInstructor) VALUES (?, ?, 0)'
    db_conn.query(query, [id,level],(err, result) => {
        if(err) throw err
        console.log('Successfully inserted user data');
    })
    return id;
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

module.exports = studentModel