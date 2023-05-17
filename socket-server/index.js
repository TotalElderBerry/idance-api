const {Server} = require('socket.io')
const io = new Server()

io.on("connection", (socket) => {

    socket.on("add_dance_booking", (name) => {
        socket.emit("send-notification", name);
    })
    
    socket.on('msg', (data) => {
        console.log(data);
    })

})

io.listen(8002);