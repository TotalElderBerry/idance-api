const db_conn = require("../db/db")

const notificationModel = {}

notificationModel.addNotification = (fields,callback) => {
    let {name, user_id, dance_class_name,msg,type} = fields
    const query = `INSERT into notifications (user_id,msg,notif_type) VALUES (?,?,?)`
    db_conn.query(query,[user_id,msg,type],(err,res) => {
        if(err) throw err
        callback({message: "okay"})
    })
}

notificationModel.getNotificationsOfUser = (userId, callback) => {
    const query = `SELECT * from notifications where user_id = '${userId}'`

    db_conn.query(query,(err,res) => {
        if(err) throw err
        if(res.length == 0){
            callback([])
        }else{
            callback(res)
        }
    })
}

module.exports = notificationModel