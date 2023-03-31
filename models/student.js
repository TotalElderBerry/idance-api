const db_conn = require("../db/db");

const studentModel = {}


studentModel.addStudent = (newStudent) => {
    const {id, level} = newStudent;
    const query = 'INSERT INTO Student (user_id, level) VALUES (?, ?)'
    db_conn.query(query, [id,level],(err, result) => {
        if(err) throw err
        console.log('Successfully inserted user data');
    })
    return id;
}

studentModel.getUserStudentbyId = (id, cbResult) => {
    const query = `SELECT * from User INNER JOIN Student on Student.user_id = ${id}`
    db_conn.query(query, (err,res,fields)=>{
        if(err) throw err
        if(res.length){
            cbResult('',res)
            return
        }
        cbResult({type: 'no data'},null)
    })
}

module.exports = studentModel