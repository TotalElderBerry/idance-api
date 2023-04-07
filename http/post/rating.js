const express = requires('express')
const app = express()

app.post('/instructor/:id', (req,res) => {
    const instructor_id = req.params.id
    const {rating, student_id} = req.body

    

})