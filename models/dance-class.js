const db_conn = require("../db/db");
const {differenceOfDaysBetweenDates, formatDate} = require("../utils/dateDifference");

const danceClass = {}

danceClass.addDanceClass = (instructorId, newDanceClass) => {
    const {dance_name, dance_genre, dance_song, dance_difficulty, date,location,price,description,student_limit, mode_of_payment,account_name,account_number, image} = newDanceClass;

    const addPaymentDetailsQuery = 'INSERT INTO PaymentDetails (mode_of_payment, account_name, account_number) values (?, ?, ?)';
    var paymentId = -1;
    db_conn.query(addPaymentDetailsQuery,[mode_of_payment,account_name,account_number], (err,res) => {
        if(err) throw err
        paymentId = res.insertId;
        if(paymentId > 0){
            const addDanceClassQuery = `INSERT INTO DanceClass (instructor_id,dance_name, dance_genre, dance_song, dance_difficulty, date,location,price,description,student_limit,image,payment_details_id) values (?,?,?,?,?,?,?,?,?,?,?,?)`;
    
            db_conn.query(addDanceClassQuery,[instructorId, dance_name, dance_genre, dance_song, dance_difficulty, date,location,price,description,student_limit,image,paymentId], (err,res) => {
                if(err) throw err
                console.log("Successfully added a dance class")
            })
    
        }
    })

}

danceClass.getAllUpcomingDanceClass = (callback) => {
    const query = 'select * from (DanceClass inner join Instructor on Instructor.instructor_id = DanceClass.instructor_id) inner join User on User.user_id = Instructor.user_id inner join PaymentDetails on DanceClass.payment_details_id = PaymentDetails.payment_details_id'

    db_conn.query(query, (err,res,fields)=>{
        if(err) {
            callback(err,null)
            return
        }
        const danceClassJson = {
            classes: [
            ],
        }

        for(const dance_class in res){
            const today = new Date()
            const formattedToday = formatDate(today)
            console.log(`Number of days between: ${formattedToday} and ${res[dance_class].date}`);
            console.log(differenceOfDaysBetweenDates(formattedToday,res[dance_class].date));
            const daysBetween = differenceOfDaysBetweenDates(formattedToday,res[dance_class].date);
            if(daysBetween >= 0){
                const singleClassJson = {
                    dance_id: `${res[dance_class].dance_id}`,
                    dance_name: `${res[dance_class].dance_name}`,
                    dance_genre: `${res[dance_class].dance_genre}`,
                    dance_song: `${res[dance_class].dance_song}`,
                    dance_difficulty: `${res[dance_class].dance_difficulty}`,
                    date: `${res[dance_class].date}`,
                    location: `${res[dance_class].location}`,
                    price: `${res[dance_class].price}`,
                    description: `${res[dance_class].description}`,
                    image: `${res[dance_class].image}`
                }
                
    
                const instructorInfoJson = {
                    instructor_id: `${res[dance_class].instructor_id}`,
                    first_name: `${res[dance_class].first_name}`,
                    last_name: `${res[dance_class].last_name}`,
                    dance_specialty: `${res[dance_class].dance_specialty}`,
                }    
                
    
                const paymentDetailsJson = {
                    payment_details_id: `${res[dance_class].payment_details_id}`,
                    mode_of_payment: `${res[dance_class].mode_of_payment}`,
                    account_name: `${res[dance_class].account_name}`,
                    account_number: `${res[dance_class].account_number}`,
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