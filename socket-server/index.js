const {Server} = require('socket.io');
const notificationModel = require('../models/notification');
const io = new Server()

io.on("connection", (socket) => {
    console.log(`Connected with ${socket.id}`);
    socket.on("add_dance_booking", (notif) => {
        socket.broadcast.emit("send-notification", notif);
        notificationModel.addNotification(notif,(msg) => {
            console.log("will emit");
        })
    })
    
    socket.on('msg', (data) => {
        console.log(data);
    })

})

io.listen(8002);