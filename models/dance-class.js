const db_conn = require("../db/db");
const {differenceOfDaysBetweenDates, formatDate} = require("../utils/dateDifference");

const danceClass = {}

danceClass.addLiveDanceClass = (instructorId, newDanceClass) => {
    const {dance_name, dance_genre, dance_song, dance_difficulty, date,location,price,description,student_limit, mode_of_payment,account_name,account_number} = newDanceClass;

    const addPaymentDetailsQuery = 'INSERT INTO PaymentDetails (mode_of_payment, account_name, account_number) values (?, ?, ?)';
    var paymentId = -1;
    db_conn.query(addPaymentDetailsQuery,[mode_of_payment,account_name,account_number], (err,res) => {
        if(err) throw err
        paymentId = res.insertId;
        if(paymentId > 0){
            // const addDanceClassQuery = `INSERT INTO DanceClass (instructor_id,dance_name, dance_genre, dance_song, dance_difficulty, date,location,price,description,student_limit,image,payment_details_id) values (?,?,?,?,?,?,?,?,?,?,?,?)`;
    
            const addLiveDanceClassQuery = 'INSERT INTO DanceClass (instructor_id, dance_name, dance_genre, dance_song, dance_difficulty, price, description, payment_details_id) VALUES (?,?,?,?,?,?,?,?)'

            db_conn.query(addLiveDanceClassQuery,[instructorId, dance_name, dance_genre, dance_song, dance_difficulty,price,description,paymentId], (err,res) => {
                if(err) throw err
                if(res.insertId){
                    const insertLiveDanceClassTableQuery = 'INSERT INTO LiveDanceClass (dance_class_id, date,location, student_limit) values (?,?,?,?)'

                    db_conn.query(insertLiveDanceClassTableQuery, [res.insertId,date,location,student_limit], (err,res)=>{

                    })
                }
                console.log("Successfully added a live dance class")
            })
    
        }
    })
}

danceClass.addRecordedDanceClass = (instructorId, newDanceClass) => {
    const {dance_name, dance_genre, dance_song, dance_difficulty, youtube_link,description,student_limit, mode_of_payment,account_name,account_number, price} = newDanceClass;

    const addPaymentDetailsQuery = 'INSERT INTO PaymentDetails (mode_of_payment, account_name, account_number) values (?, ?, ?)';
    var paymentId = -1;
    db_conn.query(addPaymentDetailsQuery,[mode_of_payment,account_name,account_number], (err,res) => {
        if(err) throw err
        paymentId = res.insertId;
        if(paymentId > 0){
            
            const addRecordedDanceClassQuery = 'INSERT INTO DanceClass (instructor_id, dance_name, dance_genre, dance_song, dance_difficulty, price, description, payment_details_id) VALUES (?,?,?,?,?,?,?,?)'

            db_conn.query(addRecordedDanceClassQuery,[instructorId, dance_name, dance_genre, dance_song, dance_difficulty,price,description,paymentId], (err,res) => {
                if(err) throw err
                if(res.insertId){
                    const insertLiveDanceClassTableQuery = 'INSERT INTO RecordedDanceClass (dance_class_id, youtube_link) values (?,?)'

                    db_conn.query(insertLiveDanceClassTableQuery, [res.insertId,youtube_link], (err,res)=>{

                    })
                }
                console.log("Successfully added a recorded dance class")
            })
    
        }
    })
}

danceClass.getAllUpcomingDanceClass = (callback) => {
    const query = 'select * from (DanceClass inner join LiveDanceClass on DanceClass.dance_class_id = LiveDanceClass.dance_class_id inner join Instructor on Instructor.instructor_id = DanceClass.instructor_id) inner join User on User.user_id = Instructor.user_id inner join PaymentDetails on DanceClass.payment_details_id = PaymentDetails.payment_details_id'

    db_conn.query(query, (err,res,fields)=>{
        if(err) {
            callback(err,null)
            return
        }
        console.log(res);
        const danceClassJson = {
            classes: [
            ],
        }

        for(const index in res){
            const today = new Date()
            const formattedToday = formatDate(today)
            console.log(`Number of days between: ${formattedToday} and ${res[index].date}`);
            console.log(differenceOfDaysBetweenDates(formattedToday,res[index].date));
            const daysBetween = differenceOfDaysBetweenDates(formattedToday,res[index].date);
            if(daysBetween >= 0){
                const singleClassJson = {
                    dance_id: `${res[index].dance_class_id}`,
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
                }    
                
    
                const paymentDetailsJson = {
                    payment_details_id: `${res[index].payment_details_id}`,
                    mode_of_payment: `${res[index].mode_of_payment}`,
                    account_name: `${res[index].account_name}`,
                    account_number: `${res[index].account_number}`,
                }
                singleClassJson['instructor'] = instructorInfoJson
                singleClassJson['payment'] = paymentDetailsJson
                danceClassJson.classes.push(singleClassJson)
            }
        }
        callback(null,danceClassJson)
    })    
}

module.exports = danceClass