const app = require('express')()

app.put('/update/live/:dance_class_id',(req,res)=>{
    const danceClassId = req.params.dance_class_id
})

module.exports = app