const notification = require("../../models/notification")

const express = require('express')
const app = express()

app.get('/:userId', (req,res) => {
    notification.getNotificationsOfUser(req.params.userId, (notifs) => {
        res.send(notifs);
    })
})

module.exports = app