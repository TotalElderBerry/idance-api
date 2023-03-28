const express = require('express')
const app = express()

app.put('/add', (req,res) => {
    res.send('add student')
})




module.exports = app