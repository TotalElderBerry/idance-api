const express = require('express')
const qr = require('qrcode')
const attendance = require('../../models/attendance')
const app = express()

// app.get('/class/:class_id/student/:student_id', (req,res) => {
    // })
    
app.get('/class/:class_id/generate', (req,res) => {
    // qr.toDataURL(`http://192.168.1.10:8000/api/attendance/class/${req.params.id}/student/${student_id}`).then(url => res.send(url))
    qr.toDataURL(`${req.params.class_id}`).then(url => res.send({url}))
})

app.get('/class/:live_class_id/student/:student_id',(req,res) => {
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
            return res.send({"message": "cannot attend u"})
        }
        return res.send(`student id ${student_id} in class: ${class_id}`)
})
module.exports = app