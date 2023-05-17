const express = require('express')
const userModel = require('../../models/user')
const studentModel = require('../../models/student')
const app = express()

app.post('/add', (req,res) => {
    userModel.addUser(req.body)
    console.log(req.body.id)
    const student_id = studentModel.addStudent(req.body)
    res.send({"studentIdCreated": student_id})
})

app.post('/book/class/:id', (req,res) => {
    const dance_class_id = req.params.id
    // const {student_id} = req.body
    try {
        studentModel.joinDanceClass(dance_class_id,req.body)
        res.status(200).send({"message":"success"})
    } catch (error) {
        res.status(401).send({"message":"unauthorized"})
    }
})

module.exports = app