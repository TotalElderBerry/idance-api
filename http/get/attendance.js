const express = require('express')
const qr = require('qrcode')
const attendance = require('../../models/attendance')
const app = express()

app.get('/class/:class_id/student/:student_id', (req,res) => {
    const {student_id, class_id} = req.params    
    const date = new Date().toLocaleString()
    console.log(date);
    try {
        attendance.recordAttendance(parseInt(student_id), class_id, (message)=>{
            if(message == 'Cannot attend you'){

                return res.status(401).send("Unauthorized")
            }
            return res.status(200).send("Success")

        })
    } catch (error) {
        res.send({"message": "cannot attend u"})
    }
    // res.send(`student id ${student_id} in class: ${class_id}`)
})

module.exports = app