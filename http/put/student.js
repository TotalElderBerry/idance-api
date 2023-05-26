const express = require('express')
const studentModel = require('../../models/student')
const app = express()

app.put('/:studentId', (req,res) => {
    const studentId = req.params.studentId
    studentModel.updateStudent(studentId, req.body, (message) => {
        res.send(message)
    })
})

app.put('/:studentId/live/:danceClassId', (req,res) => {
    try {
        studentModel.cancelBooking(req.params.studentId, req.params.danceClassId, (msg) => {
            res.send(msg)
        })
    } catch (error) {
        
    }
})




module.exports = app