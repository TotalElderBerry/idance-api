const express = require('express')
const app = express()

app.delete('/:id', (req,res)=>{
    res.send('deleting student with id '+req.params.id)
})



module.exports = app