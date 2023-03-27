const express = require('express');
const { checkAPI, isAPIExist } = require("./network");

const app = express()

app.all("/api/:id", (req, res, next) => {
    const id = req.params.id;

    if (!isAPIExist(id)) {
        return;
    }
    
    next();
});

app.listen(8000, ()=>{
    console.log('Listening in port 3000');
})