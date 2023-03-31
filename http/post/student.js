const express = require('express')
const userModel = require('../../models/user')
const studentModel = require('../../models/student')
const app = express()

app.post('/add', (req,res) => {
    userModel.addUser(req.body)
    studentModel.addStudent(req.body)
})

module.exports = app