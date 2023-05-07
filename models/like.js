const db_conn = require("../db/db");

const likeModel  = {}

likeModel.addLike = (student_id, dance_class_id, callback) => {
    likeModel.getLike(student_id,dance_class_id, (isLiked) => {
        console.log(isLiked);
        if(isLiked === 0){
            const query = `insert into idancedb.like (student_id, dance_class_id) values (?,?)`
            db_conn.query(query,[student_id,dance_class_id],(err,res)=>{
                if(err) throw err
                callback({message: "added like"})
                return
            })
        }else{
            const query = `delete from idancedb.like where student_id = ${student_id} and dance_class_id = ${dance_class_id}`
            db_conn.query(query,(err,res)=>{
                if(err) throw err
                callback({message: "delete like"})
                return
            })
        }
    })
}

likeModel.getLike = (student_id, dance_class_id, callback) => {
    const query = `select * from idancedb.like where student_id = ${student_id} and dance_class_id = ${dance_class_id}`

    db_conn.query(query, (err,res) => {
        if(err) throw err
        console.log(`length is ${res.length}`);
        callback((res.length == 0)?0:1)
    })
}

likeModel.getLikes = (dance_class_id, callback) => {
    const query = `select * from idancedb.like where dance_class_id = ${dance_class_id}`

    db_conn.query(query, (err,res) => {
        if(err) throw err
        callback(res.length)
    })
}

module.exports = likeModel