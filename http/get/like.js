const like = require("../../models/like")

const express = require('express')
const app = express()

app.get('/class/:dance_class_id/student/:student_id', (req,res) => {
    
    like.getLike(req.params.student_id, req.params.dance_class_id, (val) => {
        res.status(200).send({val})
    })

})

app.get('/class/:dance_class_id', (req,res) => {
    like.getLikes(req.params.dance_class_id, (result) => {
        res.status(200).send({result})
    })
})

module.exports = app