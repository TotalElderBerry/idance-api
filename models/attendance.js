const db_conn = require("../db/db");

const attendance = {}

attendance.recordAttendance = (student_id, class_id) => {
    const recordAttendanceQuery = `(insert into Attendance (student_id, live_danceclass_id, time) values (?,?,?)`
    const date = new Date().toLocaleTimeString()

    db_conn.query(recordAttendanceQuery, [student_id,class_id, time], (err,res) => {
        if(err) throw err
        return res
    })
}

module.exports = attendance