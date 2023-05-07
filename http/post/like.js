const express = require('express')
const app = express()

const like = require('../../models/like')



app.post('/class/:dance_class_id',(req,res) => {
    const {student_id} = req.body     
    const date = new Date().toLocaleString()
    try {
        like.addLike(student_id,req.params.dance_class_id,(message)=>{
            res.status(200).send(message);
        })
        // attendance.recordAttendance(parseInt(student_id), class_id, (message)=>{
        //     console.log(message + "dsa");
        //     if(message == 'Cannot attend you'){
        //         return res.status(401).send("Unauthorized")
        //     }
        //     return res.status(200).send("Success")

        // })
    } catch (error) {
        console.log(error +" cardh");
        return res.status(401).send({"message": "cannot attend u"})
    }
})
module.exports = app