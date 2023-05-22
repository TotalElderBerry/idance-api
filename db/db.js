const sql = require('mysql')

const db_conn = sql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "idancedb"
    }
)

db_conn.connect((err)=>{
    if(err){
        console.log("db connection failed");
        throw err
    }
    console.log("db connected");
})



module.exports = db_conn