const express = require('express')
const instructorModel = require('../../models/instructor')
const verifyInstructor = require('../../middleware/instructor-auth')
const paymentModel = require('../../models/payment')
const app = express()

app.get('/all', (req,res) => {
    instructorModel.getAllInstructors((r) => {
        if(res.length == 0){
            return res.status(200).send([])
        }
        return res.status(200).send(r)

    })
})


app.get('/:id' ,(req,res) => {
    const id = req.params.id
    instructorModel.getUserInstructorbyId(id,(myErr, data) => {
        if(data !== null){
            res.status(200).send(data)
            return
        }   
        res.status(404).send(myErr)
    })
})

app.get('/:id/live', (req,response) => {
    const instructorId = req.params.id;
    instructorModel.getLiveDanceClassesOfInstructor(instructorId,(err, res) => {
        if(err){
            if(err.type == 'no classes'){
                res.status(404).send('no classes found')
                return
            }
            res.status(400).send('somethiung is wrong')
        } 
        if(res.length == 0){
            response.send([])
        }
        classes = []
        for(const index in res){
            
            const singleClassJson = {
                dance_id: `${res[index].dance_class_id}`,
                live_danceclass_id: `${res[index].live_danceclass_id}`,
                dance_name: `${res[index].dance_name}`,
                dance_genre: `${res[index].dance_genre}`,
                dance_song: `${res[index].dance_song}`,
                dance_difficulty: `${res[index].dance_difficulty}`,
                date: `${res[index].date}`,
                location: `${res[index].location}`,
                price: `${res[index].price}`,
                description: `${res[index].description}`,
                student_limit: `${res[index].student_limit}`
            }
            paymentModel.getPaymentDetailsById(res[index].payment_details_id, (payment) => {
                singleClassJson['payment'] = payment
                classes.push(singleClassJson)
                console.log(singleClassJson)
                if(classes.length == res.length){
                    response.status(200).send(classes)
                }
                return
            })
        }
        return
    })
})

app.get('/:id/recorded', (req,response) => {
    const instructorId = req.params.id;
    instructorModel.getRecordedDanceClassesOfInstructor(instructorId, (err,res) => {
        if(err) throw err
        if(res.length == 0){
            response.send([])
        }
        classes = []
        for(const index in res){
            
            const singleClassJson = {
                dance_id: `${res[index].dance_class_id}`,
                youtube_link: `${res[index].youtube_link}`,
                recorded_danceclass_id: `${res[index].recorded_danceclass_id}`,
                dance_name: `${res[index].dance_name}`,
                dance_genre: `${res[index].dance_genre}`,
                dance_song: `${res[index].dance_song}`,
                dance_difficulty: `${res[index].dance_difficulty}`,
                price: `${res[index].price}`,
                description: `${res[index].description}`,
            }
            paymentModel.getPaymentDetailsById(res[index].payment_details_id, (payment) => {
                singleClassJson['payment'] = payment
                classes.push(singleClassJson)
                console.log(singleClassJson)
                if(classes.length == res.length){
                    response.status(200).send(classes)
                }
                return
            })
        }
        return
    })
   
})


//instructor profile

app.get('/profile/me', verifyInstructor ,(req,res) => {
    const id = req.user.user_id
    console.log(`api id ${id}`);
    instructorModel.getUserInstructorbyId(id,(myErr, data) => {
        if(data !== null){
            data[0].instructor_id = `${data[0].instructor_id}`
            data[0].rating = `${data[0].rating}`
            console.log(data.rating);
            return res.status(200).send(data)
        }   
        return res.status(404).send(myErr)
    })
    return
})


module.exports = app
