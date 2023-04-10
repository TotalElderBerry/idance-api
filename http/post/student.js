const express = require('express')
const userModel = require('../../models/user')
const studentModel = require('../../models/student')
const app = express()

app.post('/add', (req,res) => {
    userModel.addUser(req.body)
    const student_id = studentModel.addStudent(req.body)
    res.send({"studentIdCreated": student_id})
})

app.post('/book/class/:id', (req,res) => {
    const dance_class_id = req.params.id
    const {student_id} = req.body
    studentModel.joinDanceClass(dance_class_id,student_id)

})

module.exports = app