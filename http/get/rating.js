const rating = require("../../models/rating")

const express = requires('express')
const app = express()

app.get('/instructor/:id', (req,res) => {
    const instructor_id = req.params.id
    
    rating.getRatingbyInstructorId(instructor_id,(err,res) => {
        if(err){
            res.send(err)
            return
        }
        if(res.length == 0){
            res.send({"message": "no ratings given"})
            return
        }
        let sum = 0
        for(i = 0; i < res.length; i++){
            sum += res[i].rating
        }
        const average = Math.round(sum / res.length)
        res.send({"rating": average})
    })

})