const express = require('express')
const studentModel = require('../../models/student')
const app = express()

app.put('/:studentId', (req,res) => {
    const studentId = req.params.studentId
    studentModel.updateStudent(studentId, req.body, (message) => {
        res.send(message)
    })
})




module.exports = app