const express = require('express')
const studentModel = require('../../models/student')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../../env')
const app = express()

app.get('/', (req,res) => {
})

// error here, needs to be fixed
app.get('/:id', (req,res)=>{
    const id = req.params.id
    const val = studentModel.getUserStudentbyId(id, (myErr, data) => {
        if(myErr != null){
            res.status(400).send(myErr)
            return
        }

        if(data[0].isInstructor == 1){
            const token = jwt.sign(
                {user_id: data[0].user_id},
                SECRET_KEY,
                {
                    expiresIn: "1d"
                }
            )
            console.log(token);
            data[0].token = token
        }
        
        res.status(200).send(data)
    })
})



module.exports = app