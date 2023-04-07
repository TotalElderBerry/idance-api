const express = require('express')
const userModel = require('../../models/user')
const studentModel = require('../../models/student')
const app = express()

app.post('/add', (req,res) => {
    userModel.addUser(req.body)
    studentModel.addStudent(req.body)
})

app.post('/book/class/:id', (req,res) => {
    const dance_class_id = req.params.id
    const {student_id} = req.body
    studentModel.joinDanceClass(dance_class_id,student_id)

})

module.exports = app