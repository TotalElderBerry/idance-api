const express = require('express')

const app = express()

app.get('/', (req,res) => {
    res.send('ilove cock')
})

app.listen(8000, ()=>{
    console.log('Listening in port 3000');
})