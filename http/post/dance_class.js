const express = require('express')
const danceClass = require('../../models/dance-class')
const verifyInstructor = require('../../middleware/instructor-auth')
const app = express()

app.post('/add/live',  verifyInstructor, (req,res) => {
    console.log('dance class add');
    const newDanceClass = req.body
    const {instructor_id} = newDanceClass
    // const instructor_id = newDanceClass.instructor_id
    console.log(req.user.user_id);
    danceClass.addLiveDanceClass(instructor_id, newDanceClass, id => {
        console.log(id);
        res.status(200).send({"insertId": id})
    })
})

app.post('/add/recorded', verifyInstructor, (req,res) => {
    console.log('dance class add');
    const newDanceClass = req.body
    const {instructor_id} = newDanceClass
    danceClass.addRecordedDanceClass(instructor_id, newDanceClass)
})

module.exports = app