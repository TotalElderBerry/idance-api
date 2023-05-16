const danceClass = require('../../models/dance-class')

const app = require('express')()

app.put('/live/:dance_class_id',(req,res)=>{
    const liveClassId = req.params.dance_class_id
    danceClass.updateLiveDanceClass(liveClassId,req.body,(msg) => {
        res.send("okay")
    })
})


app.put('/recorded/:dance_class_id',(req,res)=>{
    const recordedClassId = req.params.dance_class_id
    danceClass.updateRecordedDanceClass(recordedClassId,req.body,(msg) => {
        res.send("okay")
    })
})
module.exports = app