const express = require('express')
const instructorModel = require('../../models/instructor')
const app = express()

//instructor post

app.post('/add', (req,res) => {
    instructorModel.addInstructor(req.body)
})



module.exports = app
