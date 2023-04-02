const express = require('express')
const danceClass = require('../../models/dance-class')
const app = express()

app.get('/all', (req,res) => {
    danceClass.getAllUpcomingDanceClass((myErr,data) => {
        if(myErr){
            res.status(400).send(err)
        }
        res.status(200).send(data)
    })
})

app.get('/:id', (req,res) => {
    res.send('getting dance class id')
})


module.exports = app