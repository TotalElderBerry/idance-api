const express = require('express')
const qr = require('qrcode')
const app = express()

const attendance = require('../../models/attendance')



// app.post('/class/:id', (req,res) => {
//     const {student_id} = req.body
//     qr.toDataURL(`http://192.168.1.10:8000/api/attendance/class/${req.params.id}/student/${student_id}`).then(url => res.send(url))
// })


// app.post('api/attendance/class/', (req,res) => [
//     res.send("okay")
// ])

app.post('/class/:live_class_id',(req,res) => {
    const class_id = req.params.live_class_id
    const {student_id} = req.body     
    const date = new Date().toLocaleString()
    console.log(date);
    console.log(student_id);
    try {
        attendance.recordAttendance(parseInt(student_id), class_id, (message)=>{
            console.log(message);
            if(message == 'Cannot attend you'){
                return res.status(401).send("Unauthorized")
            }
            return res.status(200).send("Success")

        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({"message": "cannot attend u"})
    }
})
module.exports = app