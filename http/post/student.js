const express = require('express')
const app = express()

app.post('/add', (req,res) => {
    const {id,name} = req.body
    res.send(`post a student ${id} with name ${name}`)
})

module.exports = app