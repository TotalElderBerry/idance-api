const express = require('express')
const app = express()

const ratingModel = require('../../models/rating')

app.post('/instructor/:id', (req,res) => {
    const instructor_id = req.params.id
    const {rating, student_id} = req.body
    try {
        const i = ratingModel.addRatingToInstructor(student_id,instructor_id,rating);
        res.status(200).send({message: "okay"});
        
    } catch (error) {
        
    }

})

module.exports = app