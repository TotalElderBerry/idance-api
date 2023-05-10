const db_conn = require("../db/db");
const {differenceOfDaysBetweenDates, formatDate} = require("../utils/dateDifference");
const studentModel = require("./student");

const danceClass = {}



danceClass.addLiveDanceClass = (instructorId, newDanceClass, callback) => {
    const {dance_name, dance_genre, dance_song, dance_difficulty, date,location,price,description,student_limit, mode_of_payment,account_name,account_number} = newDanceClass;
    //deconstructor

    const addPaymentDetailsQuery = 'INSERT INTO paymentdetails (mode_of_payment, account_name, account_number) values (?, ?, ?)';
    var paymentId = -1;
    db_conn.query(addPaymentDetailsQuery,[mode_of_payment,account_name,account_number], (err,res) => {
        if(err) throw err
        paymentId = res.insertId;
        if(paymentId > 0){
            // const addDanceClassQuery = `INSERT INTO DanceClass (instructor_id,dance_name, dance_genre, dance_song, dance_difficulty, date,location,price,description,student_limit,image,payment_details_id) values (?,?,?,?,?,?,?,?,?,?,?,?)`;
    
            const addLiveDanceClassQuery = 'INSERT INTO danceclass (instructor_id, dance_name, dance_genre, dance_song, dance_difficulty, price, description, payment_details_id) VALUES (?,?,?,?,?,?,?,?)'

            db_conn.query(addLiveDanceClassQuery,[instructorId, dance_name, dance_genre, dance_song, dance_difficulty,price,description,paymentId], (err,res) => {
                if(err) throw err
                if(res.insertId){
                    const insertLiveDanceClassTableQuery = 'INSERT INTO livedanceclass (dance_class_id, date,location, student_limit) values (?,?,?,?)'

                    db_conn.query(insertLiveDanceClassTableQuery, [res.insertId,date,location,student_limit], (err,res)=>{
                        
                    })
                    callback(res.insertId);
                }
                console.log("Successfully added a live dance class")
            })
    
        }
    })
}

danceClass.addRecordedDanceClass = (instructorId, newDanceClass) => {
    const {dance_name, dance_genre, dance_song, dance_difficulty, youtube_link,description, mode_of_payment,account_name,account_number, price} = newDanceClass;

    const addPaymentDetailsQuery = 'INSERT INTO paymentdetails (mode_of_payment, account_name, account_number) values (?, ?, ?)';
    var paymentId = -1;
    db_conn.query(addPaymentDetailsQuery,[mode_of_payment,account_name,account_number], (err,res) => {
        if(err) throw err
        paymentId = res.insertId;
        if(paymentId > 0){
            
            const addRecordedDanceClassQuery = 'INSERT INTO danceclass (instructor_id, dance_name, dance_genre, dance_song, dance_difficulty, price, description, payment_details_id) VALUES (?,?,?,?,?,?,?,?)'

            db_conn.query(addRecordedDanceClassQuery,[instructorId, dance_name, dance_genre, dance_song, dance_difficulty,price,description,paymentId], (err,res) => {
                if(err) throw err
                if(res.insertId){
                    const insertLiveDanceClassTableQuery = 'INSERT INTO recordeddanceclass (dance_class_id, youtube_link) values (?,?)'

                    db_conn.query(insertLiveDanceClassTableQuery, [res.insertId,youtube_link], (err,res)=>{

                    })
                }
                console.log("Successfully added a recorded dance class")
            })
    
        }
    })
}

danceClass.getAllUpcomingDanceClass = (callback) => {
    const query = 'select * from (danceclass inner join livedanceclass on danceclass.dance_class_id = livedanceclass.dance_class_id inner join instructor on instructor.instructor_id = danceclass.instructor_id) inner join user on user.user_id = instructor.user_id inner join paymentdetails on danceclass.payment_details_id = paymentdetails.payment_details_id'

    db_conn.query(query, (err,res,fields)=>{
        if(err) {
            callback(err,null)
            return
        }
        console.log(res);
        const danceClassJson = {
            upcoming_classes: [
            ],
            happening_today: [
            ],
            classes_done: [],
        }

        for(const index in res){
            const today = new Date()
            const formattedToday = formatDate(today)
            console.log(`Number of days between: ${formattedToday} and ${res[index].date}`);
            console.log(differenceOfDaysBetweenDates(formattedToday,res[index].date));
            let daysBetween = differenceOfDaysBetweenDates(formattedToday,res[index].date);
            
            const singleClassJson = {
                dance_id: `${res[index].dance_class_id}`,
                live_danceclass_id: `${res[index].live_danceclass_id}`,
                dance_name: `${res[index].dance_name}`,
                dance_genre: `${res[index].dance_genre}`,
                dance_song: `${res[index].dance_song}`,
                dance_difficulty: `${res[index].dance_difficulty}`,
                date: `${res[index].date}`,
                location: `${res[index].location}`,
                price: `${res[index].price}`,
                description: `${res[index].description}`,
                student_limit: `${res[index].student_limit}`
            }
            

            const instructorInfoJson = {
                instructor_id: `${res[index].instructor_id}`,
                first_name: `${res[index].first_name}`,
                last_name: `${res[index].last_name}`,
                dance_specialty: `${res[index].dance_specialty}`,
                user_id: `${res[index].user_id}`,
                gender: `${res[index].gender}`,
                contact_number: `${res[index].contact_number}`,
                email_address: `${res[index].email_address}`,
                data_of_birth: `${res[index].data_of_birth}`,
                rating: `${res[index].rating}`,
                description: `${res[index].description}`,
                profile_picture: `${res[index].profile_picture}`

            }    
            
            const paymentDetailsJson = {
                payment_details_id: `${res[index].payment_details_id}`,
                mode_of_payment: `${res[index].mode_of_payment}`,
                account_name: `${res[index].account_name}`,
                account_number: `${res[index].account_number}`,
            }
            singleClassJson['instructor'] = instructorInfoJson
            singleClassJson['payment'] = paymentDetailsJson
            daysBetween = (daysBetween>0)?1:daysBetween
            switch (daysBetween) {
                case 0:
                    danceClassJson.happening_today.push(singleClassJson)
                    break;
                case 1:
                    danceClassJson.upcoming_classes.push(singleClassJson)
                    break;
                default:
                    console.log(singleClassJson);
                    danceClassJson.classes_done.push(singleClassJson)
                    break;
            }

        }
        callback(null,danceClassJson)
    })    
}

danceClass.getAllRecordedDanceClassOffering = (callback) => {
    const query = 'select * from (danceclass inner join recordeddanceclass on danceclass.dance_class_id = recordeddanceclass.dance_class_id inner join instructor on instructor.instructor_id = danceclass.instructor_id) inner join user on user.user_id = instructor.user_id inner join paymentdetails on danceclass.payment_details_id = paymentdetails.payment_details_id'

    db_conn.query(query, (err,res,fields)=>{
        if(err) {
            callback(err,null)
            return
        }
        if(res.length == 0){
            callback(null,[])
            return
        }
        console.log(res);
        const temp = []
        for(const index in res){
            const today = new Date()
            const formattedToday = formatDate(today)
            console.log(`Number of days between: ${formattedToday} and ${res[index].date}`);
            console.log(differenceOfDaysBetweenDates(formattedToday,res[index].date));
            const daysBetween = differenceOfDaysBetweenDates(formattedToday,res[index].date);
            
            const singleClassJson = {
                recorded_class_id: `${res[index].recorded_danceclass_id}`,
                dance_id: `${res[index].dance_class_id}`,
                dance_name: `${res[index].dance_name}`,
                dance_genre: `${res[index].dance_genre}`,
                dance_song: `${res[index].dance_song}`,
                dance_difficulty: `${res[index].dance_difficulty}`,
                price: `${res[index].price}`,
                description: `${res[index].description}`,
                youtube_link: `${res[index].youtube_link}`,
            }
            

            const instructorInfoJson = {
                instructor_id: `${res[index].instructor_id}`,
                first_name: `${res[index].first_name}`,
                last_name: `${res[index].last_name}`,
                dance_specialty: `${res[index].dance_specialty}`,
                user_id: `${res[index].user_id}`,
                gender: `${res[index].gender}`,
                contact_number: `${res[index].contact_number}`,
                email_address: `${res[index].email_address}`,
                data_of_birth: `${res[index].data_of_birth}`,
                rating: `${res[index].rating}`,
                description: `${res[index].description}`,
                profile_picture: `${res[index].profile_picture}`

            }    
            
            const paymentDetailsJson = {
                payment_details_id: `${res[index].payment_details_id}`,
                mode_of_payment: `${res[index].mode_of_payment}`,
                account_name: `${res[index].account_name}`,
                account_number: `${res[index].account_number}`,
            }
            singleClassJson['instructor'] = instructorInfoJson
            singleClassJson['payment'] = paymentDetailsJson

            temp.push(singleClassJson)

            if(temp.length == res.length){
                callback(null,temp)
            }

        }
    })     
}

danceClass.getDanceClassBookingStudents = (dance_class_id , callback) => {
    const query = `select * from dancebooking where dance_class_id = ${dance_class_id}`

    db_conn.query(query,(err,res)=>{
        if(err) throw err

        if(res.length ==0){
            callback([])
            return
        }
        
        const returnResult = []
        res.forEach(element => {
            console.log(element.student_id);
            studentModel.getStudentbyStudentId(element.student_id,(err,student)=>{
                element.student = student[0];
                // console.log(element);
                returnResult.push(element)
                if(returnResult.length == res.length){
                    callback(res)
                    return
                }
            })
        });
    })
}


danceClass.getStudentsAttended = (live_dance_class_id, callback) => {
    const query = `select * from attendance where live_danceclass_id = ${live_dance_class_id}`

    db_conn.query(query,(err,res) => {
        if(res.length == 0){
            callback([])
            return
        }
        let temp = []
        for(let i = 0; i < res.length; i++){
            let obj = {}
            studentModel.getStudentbyStudentId(res[i].student_id,(err,student)=>{
                if(err) throw err
                obj = res[i]
                obj.student = student[0]
                temp.push(obj)
                // console.log(res[r]);
                if(temp.length == res.length){
                    callback(res)
                }
                console.log(JSON.stringify((temp)))
            })
        }
        
    })

}
module.exports = danceClass