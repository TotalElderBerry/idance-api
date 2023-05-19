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

//dance class
const danceClassGet = require('./http/get/dance_class')
const danceClassPost = require('./http/post/dance_class')
const danceClassPut = require('./http/put/danceclass');


//attendance
const attendanceGet = require('./http/get/attendance')
const attendancePost = require('./http/post/attendance')

//rating
const ratingPost = require('./http/post/rating')


//like

//attendance
const likeGet = require('./http/get/like')
const likePost = require('./http/post/like')

//notifs
const notificationGet = require('./http/get/notifications')
const app = express()
app.use(express.json())


app.use("/api/student",studentGet,studentPost,studentPut,studentDelete)
app.use('/api/instructor', instructorGet,instructorPost,instructorDelete,instructorPut)
app.use('/api/dance-class',danceClassGet, danceClassPost, danceClassPut)
app.use('/api/attendance', attendanceGet,attendancePost)
app.use('/api/rating', ratingPost)
app.use('/api/like', likeGet,likePost)
app.use('/api/notification', notificationGet)

app.listen(8000, ()=>{
    console.log('Listening sa port 8000');
})