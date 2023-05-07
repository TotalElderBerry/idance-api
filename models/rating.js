const db_conn = require("../db/db");

const rating  = {}

rating.addRatingToInstructor = (student_id, instructor_id, ratingVal) => {

    rating.getStudentInstructorRating(instructor_id,student_id,(res)=>{
        if(res.length == 0){
            const addRatingQuery = `INSERT INTO rating (student_id,instructor_id,rating) VALUES (?,?,?)`
            db_conn.query(addRatingQuery,[student_id,instructor_id,ratingVal], (err,res) => {
                if(err) throw err
                if(res){
                    rating.updateRating(instructor_id,(err,res) => {
                        console.log("okay");
                    })
                }
                return 0
            })
        }else{
            const query = `update rating set rating = '${ratingVal}' where student_id = ${student_id} and instructor_id = ${instructor_id}`
            db_conn.query(query, (err,res) => {
                if(err) throw err
                if(res){
                    rating.updateRating(instructor_id,(err,res) => {
                        console.log("okay");
                    })
                }
                return 0
            })
        }
    })



}

rating.getStudentInstructorRating = (instructor_id, student_id,callback) => {
    const query = `select * from rating where instructor_id = ${instructor_id} and student_id = ${student_id}`

    db_conn.query(query,(err,res) => {
        if(err) throw err
        callback(res)
    })
}

rating.updateRating = (instructor_id,callback) => {
    rating.getRatingbyInstructorId(instructor_id,(err,ratingVal) => {
        const query = `update instructor set rating = ${ratingVal} where instructor_id = ${instructor_id}`
        db_conn.query(query,(err,res)=>{
            if(err) throw err
            console.log("success");
        })
    })
}

rating.getRatingbyInstructorId = (instructor_id, callback) => {
    const getRatingQuery = `SELECT * from rating where rating.instructor_id = ${instructor_id}`

    db_conn.query(getRatingQuery, (err,res,fields) => {
        if(err){
            callback(err,null)
            return
        } 
        let sum = 0
        for(i = 0; i < res.length; i++){
            sum += res[i].rating
        }
        const average = Math.round(sum / res.length)
        callback(null,average)        
    })
}

module.exports = rating