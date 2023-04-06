const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require("../env");

const verifyInstructor = (req,res, next) => {
    const authToken = req.headers["authorization"];
    if (!authToken) {
        return res.status(403).send("A token is required for authentication");
    }
    
    try {
        const token = authToken.split(" ")[1]
        console.log(token);
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}

module.exports = verifyInstructor