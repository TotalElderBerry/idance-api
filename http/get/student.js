const express = require('express')
const studentModel = require('../../models/student')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../../env')
const paymentModel = require('../../models/payment')
const app = express()

app.get('/', (req,res) => {
    res.send({"name": "brian"})
})

app.get('/:id', (req,res)=>{
    const id = req.params.id
    const val = studentModel.getUserStudentbyId(id, (myErr, data) => {
        if(myErr != null){
            res.status(400).send(myErr)
            return
        }
        
        res.status(200).send(data)
    })
})



//fix heree!!!
app.get('/:id/classes', (req,res) => {
    console.log("hi");
    studentModel.getStudentDanceClassbyId(req.params.id,(error,result,danceRes) => {
        console.log(error);
        if(error) throw error
        
        if(result.length == danceRes.length){
            return res.status(200).send(result)
        }
    })
    // res.send("ok")
})

/**
 * 
 */
app.get('/me/:id', (req,res)=>{
    const id = req.params.id
    console.log(id);
    const val = studentModel.getUserStudentbyId(id, (myErr, data) => {
        
        if(myErr != null){
            res.status(400).send(myErr)
            return
        }
        if(data.length == 0){ 
            return
        }


        if(data && data[0].isInstructor === 1){
            const token = jwt.sign(
                {user_id: data[0].user_id},
                SECRET_KEY,
                {
                    expiresIn: "1d"
                }
                )
            data[0].token = token
        }
        
        res.status(200).send(data)
    })
        return
})



module.exports = app