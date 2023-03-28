const express = require('express')
const app = express()

app.get('/', (req,res) => {
    const comscistudent = {
        id: '1',
        name: 'gian carlo'
    }
    res.send(comscistudent)
})

app.get('/:id', (req,res)=>{
    res.send('getting student with id '+req.params.id)
})



module.exports = app