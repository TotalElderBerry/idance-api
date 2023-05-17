const db_conn = require("../db/db")

const notificationModel = {}

notificationModel.addNotification = (fields,callback) => {
    let {name, user_id, dance_class_name} = fields
    const query = `INSERT into notifications (user_id,msg,notif_type) VALUES (?,?,?)`
    const msg = `${name} booked class ${dance_class_name}`
    db_conn.query(query,[user_id,msg,1],(err,res) => {
        if(err) throw err
        callback({message: "okay"})
    })
}

module.exports = notificationModel