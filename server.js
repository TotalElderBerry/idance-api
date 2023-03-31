const express = require('express');
const { isAPIExist } = require("./network");

//student
const studentGet = require('./http/get/student');
const studentPost = require('./http/post/student');
const studentPut = require('./http/put/student');
const studentDelete = require('./http/delete/student');

//instructor
const instructorGet = require('./http/get/instructor')
const instructorPost = require('./http/post/instructor')
const instructorPut = require('./http/put/instructor')
const instructorDelete = require('./http/delete/instructor')

const app = express()
app.use(express.json())


app.use("/api/student",studentGet,studentPost,studentPut,studentDelete)
app.use('/api/instructor', instructorGet,instructorPost,instructorDelete,instructorPut)

app.listen(8000, ()=>{
    console.log('Listening sa port 3000');
})