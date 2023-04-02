const express = require('express')
const danceClass = require('../../models/dance-class')
const app = express()

app.post('/add', (req,res) => {
    console.log('dance class add');
    const newDanceClass = req.body
    const {instructor_id} = newDanceClass
    danceClass.addDanceClass(instructor_id, newDanceClass)
})


module.exports = app