const express = require('express')
const studentModel = require('../../models/student')
const app = express()

app.get('/', (req,res) => {
})

// error here, needs to be fixed
app.get('/:id', (req,res)=>{
    const id = req.params.id
    const val = studentModel.getUserStudentbyId(id, (myErr, data) => {
        if(myErr){
            throw myErr
        }
        res.status(200).send(data)
    })
})



module.exports = app