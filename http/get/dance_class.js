const express = require('express')
const danceClass = require('../../models/dance-class')
const studentModel = require('../../models/student')
const app = express()

app.get('/all', (req,res) => {
    danceClass.getAllUpcomingDanceClass((myErr,data) => {
        if(myErr){
            return res.status(400).send(err)
        }
        res.status(200).send(data)
    })
})

app.get('/:id', (req,res) => {
    const dance_class_id = req.params.id
    const {student_id} = req.body

    try {
        const studentClasses = studentModel.getStudentDanceClassbyId(student_id)
        const classById = studentClasses.filter((danceclass) => danceclass.dance_class_id == dance_class_id)

        if(!classById){
            return res.send(
                {"isBooked": false}
            )
        }
    } catch (error) {
        
    }

    return res.send({"isBooked": true})
})


module.exports = app