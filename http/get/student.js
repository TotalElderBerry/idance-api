const express = require('express')
const app = express()

app.get('/', (req,res) => {
    res.send('getting all students')
})

app.get('/:id', (req,res)=>{
    res.send('getting student with id '+req.params.id)
})



module.exports = app