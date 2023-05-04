const express = require('express')
const danceClass = require('../../models/dance-class')
const studentModel = require('../../models/student')
const app = express()

app.get('/live/all', (req,res) => {
    danceClass.getAllUpcomingDanceClass((myErr,data) => {
        if(myErr){
            return res.status(400).send(err)
        }
        res.status(200).send(data)
    })
})

app.get('/live/:id', (req,res) => {
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

app.get('/live/:id/students', (req,res) => {
    const dance_class_id = req.params.id

    danceClass.getDanceClassBookingStudents(dance_class_id,(students)=>{
        res.send(students)
    })
})


app.get('/:id/attendance', (req,res) => {
    danceClass.getStudentsAttended(req.params.id,(result) => {
        res.status(200).send(result)
    })
})

module.exports = app