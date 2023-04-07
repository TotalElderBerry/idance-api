const express = require('express')
const qr = require('qrcode')
const app = express()

app.post('/class/:id', (req,res) => {
    const {student_id} = req.body
    qr.toDataURL(`http://192.168.1.13:8000/api/attendance/class/13/student/${student_id}`).then(url => res.send(url))
})

module.exports = app