const jwt = require('jsonwebtoken');

const dotenv = require("dotenv");
dotenv.config();
const TOKEN_String = process.env.TOKEN_KEY


module.exports = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${TOKEN_String}`);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
     next();
    } catch(error) {
        res.status(401).json({ error });
    }
};