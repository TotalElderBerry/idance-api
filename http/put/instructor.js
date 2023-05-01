const express = require('express')
const instructorModel = require('../../models/instructor')
const app = express()

app.put('/live/:dance_class_id/accept-student', (req,res) => {
    const {student_id} = req.body
    try {
        const success = instructorModel.acceptStudentDanceBooking(student_id, req.params.dance_class_id)

        res.status(200).send(success)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = app
