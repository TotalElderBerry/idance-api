const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

const instructorModel = require('../../models/instructor')
const { SECRET_KEY } = require('../../env')

//instructor post

app.post('/add', (req,res) => {
    const {user_id} = req.body  

    instructorModel.getUserInstructorbyId(user_id, (err,result) => {
        if(err){
            if(err.type == 'No instructor found'){
                try{
                    instructorModel.addInstructor(req.body)
                    const token = jwt.sign(
                        user_id,
                        SECRET_KEY,
                        {
                            expiresIn: "5h"
                        }
                    )
                    req.body = {token: token}
                        
                    }catch(e){
                        res.status(400).send(e)
                    }
            }
        }else{
            res.status(400).send({msg: 'account already exist'})
        }
    })
   

})



module.exports = app
