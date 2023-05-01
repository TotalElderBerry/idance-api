const db_conn = require("../db/db");

const attendance = {}

attendance.recordAttendance = (student_id, class_id, callback) => {
    const recordAttendanceQuery = `insert into attendance (student_id, live_danceclass_id, time) values (?,?,?)`
    const date = new Date().toLocaleTimeString()

    const checkIsValidStudentQuery = `select * from dancebooking where student_id = ${student_id} and dance_class_id = ${class_id}`

    db_conn.query(checkIsValidStudentQuery,(err,res) => {
        if(err) throw err
        if(res.length == 0){
            callback("Cannot attend you")
            return
        }else{
            if(res[0].date_approved == 'PENDING'){
                callback("Cannot attend you")
                return
            }
            const searchQuery = `select live_danceclass_id from livedanceclass where dance_class_id = ${class_id}`
            db_conn.query(searchQuery,(err,res)=>{
                if(err) throw err
                db_conn.query(recordAttendanceQuery, [student_id,res[0].live_danceclass_id, date], (err,res) => {
                    if(err) throw err
                    callback("Succes")
                })
            })
        }
    })

}

module.exports = attendance