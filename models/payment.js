const db_conn = require("../db/db");
const { formatDate } = require("../utils/dateDifference");

const paymentModel  = {}

paymentModel.addPayment = (fields, callback) => {
    const {sender_name,amount,reference_number} = fields
    const dateNow = formatDate(new Date())
    const query = `insert into payment (sender_name,date,amount,reference_number) values (?,?,?,?)`

    db_conn.query(query,[sender_name,dateNow,amount,reference_number],(err,res)=>{
        if(err) throw err
        callback(res.insertId)
    })

}

paymentModel.getPaymentById = (payment_id, callback) => {
    const query = `select * from payment where payment_id = ${payment_id}`

    db_conn.query(query, (err,res) => {
        if(err) throw err
        if(res.length > 0){
            callback(res[0])
            return
        }
        callback(res)

    })
}

module.exports = paymentModel