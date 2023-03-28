const express = require('express');
const { isAPIExist } = require("./network");
const studentGet = require('./http/get/student');
const studentPost = require('./http/post/student');
const studentPut = require('./http/put/student');
const studentDelete = require('./http/delete/student');

const app = express()
app.use(express.json())

app.use("/api/student",studentGet,studentPost,studentPut,studentDelete)

app.listen(8000, ()=>{
    console.log('Listening in port 3000');
})