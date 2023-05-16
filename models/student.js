const db_conn = require("../db/db");
const { formatDate } = require("../utils/dateDifference");
const paymentModel = require("./payment");

const studentModel = {}


studentModel.addStudent = (newStudent) => {
    const {id, level} = newStudent;
    const query = 'INSERT INTO student (user_id, level, isInstructor) VALUES (?, ?, 0)'
    db_conn.query(query, [id,level],(err, result) => {
        if(err) throw err
        console.log(result);
        return result.insertId;
    })
}

studentModel.getUserStudentbyId = (id, cbResult) => {
    const query = `SELECT * from user INNER JOIN student on student.user_id = '${id}' where user.user_id = '${id}'`
    db_conn.query(query, (err,res,fields)=>{
        if(err) {
            cbResult(err,null)
            return
        }
        if(res){
            console.log(res);
            cbResult(null,res)
            return
        }
        cbResult({type: 'no data'},null)
    })
}


studentModel.getStudentbyStudentId = (id, cbResult) => {
    const query = `select * from student inner join user on user.user_id = student.user_id where student.student_id = ${id}`

    db_conn.query(query, (err,res,fields)=>{
        if(err) {
            cbResult(err,null)
            return
        }
        if(res){
            cbResult(null,res)
            return
        }
    })
}

studentModel.joinDanceClass = (dance_class_id, fields) => {
    const {student_id} = fields
    const query = `INSERT INTO dancebooking (student_id, dance_class_id, date_approved,payment_id) values (?, ?, ?, ?)`
    const mesg = "PENDING"

    paymentModel.addPayment(fields,(insertId) => {
        db_conn.query(query, [student_id,dance_class_id, mesg, insertId],(err, res)=>{
            if(err) throw err
            console.log('successfully inserted a dancebooking data');
            return "successful"
        }) 
    })

}

studentModel.getStudentDanceClassbyId = (student_id, callback) => {
    const query =  `select * from dancebooking where dancebooking.student_id = ${student_id}`

    db_conn.query(query,(err,result) => {
        if(err) throw err
        const danceRes = []
        if(result.length == 0){
            callback(err,result,[])
        }
        for(const r in result){
            paymentModel.getPaymentById(result[r].payment_id,(paymentres)=>{
                result[r].payment = paymentres
                console.log(JSON.stringify(result[r]))

                danceRes.push(result[r])
                callback(err,result,danceRes)
            })
        }
    })
}

studentModel.updateStudent = (studentId, fields, callback) => {
    const {user_id, firstName, lastName, gender, contactNumber, emailAddress, dateOfBirth, profilePicture, level} = fields;
    const query = `UPDATE student set level = ? where student_id = ${studentId}`

    db_conn.query(query,[level],(err,res) => {
        if(err) throw err
        const query = `UPDATE user set first_name = ?, last_name = ?, gender = ?, contact_number = ?, data_of_birth = ? where user_id = "${user_id}"`
        db_conn.query(query, [firstName, lastName, gender, contactNumber, dateOfBirth], (err,anotherRes) => {
            if(err) throw err
            callback({message: "okay"})
        })
    })
}

module.exports = studentModel