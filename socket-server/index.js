const {Server} = require('socket.io');
const notificationModel = require('../models/notification');
const io = new Server()

io.on("connection", (socket) => {
    console.log(`Connected with ${socket.id}`);
    socket.broadcast.on("add_dance_booking", (notif) => {
        console.log("new notif: "+JSON.stringify(notif)+" "+socket.id);
        io.emit("send-notification", notif);
        console.log("will notif emit");
        notificationModel.addNotification(notif,(msg) => {
            console.log(msg);
        })
    })

    socket.on("accept_pending_student", (notif) => {
        socket.broadcast.emit("send-student-notification", notif);
        notificationModel.addNotification(notif,(msg) => {
            console.log("will accept emit");
        })
    })

    socket.on("request_cancel_booking", (notif) => {
        socket.broadcast.emit("send-cancelbooking-notification", notif);
        notificationModel.addNotification(notif,(msg) => {
            console.log("will accept emit");
        })
    })
    
    socket.on("accept_cancellation_request", (notif) => {
        socket.broadcast.emit("send-acceptcancel-notification", notif)
        notificationModel.addNotification(notif,(msg) => {
            console.log(msg);
        })
        notificationModel.addNotification(notif,(msg) => {
            console.log(msg);
        })
    })

    socket.on("reject_cancellation_request", (notif) => {
        socket.broadcast.emit("send-rejectcancel-notification", notif)
        notificationModel.addNotification(notif,(msg) => {
            console.log(msg);
        })
        notificationModel.addNotification(notif,(msg) => {
            console.log(msg);
        })
    })


    socket.on('msg', (data) => {
        console.log(data);
    })

})

io.listen(8002);