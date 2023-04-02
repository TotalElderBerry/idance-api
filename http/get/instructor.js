const express = require('express')
const instructorModel = require('../../models/instructor')
const app = express()

app.get('/', (req,res) => {

})

app.get('/:id', (req,res) => {
    const id = req.params.id
    instructorModel.getUserInstructorbyId(id,(myErr, data) => {
        if(data !== null){
            res.status(200).send(data)
        }   
        res.status(404).send(myErr)
    })
})

app.get('/:id/classes', (req,res) => {
    const instructorId = req.params.id;
    instructorModel.getDanceClassesOfInstructor(instructorId,(err, result) => {
        if(err){
            if(err.type == 'no classes'){
                res.status(404).send('no classes found')
                return
            }
            res.status(400).send('somethiung is wrong')
        } 
        
        if(result) res.status(200).send(result)
    })
})

module.exports = app
