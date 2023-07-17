const jwt = require("jsonwebtoken");
const BlackListModel = require("../models/blackListModel");
require("dotenv").config()
const mykey = process.env.JWT_SECRET

const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
        return res.status(400).send({ message: 'Access token not found' });
    }

    const blackListToken = await BlackListModel.findOne({ token })
    if (blackListToken) {
       return res.status(400).send({ message: 'Token revoked' });
    }

    jwt.verify(token, mykey, async (err, decoded) => {
        if (err) {
            res.status(400).send({ message: 'Invalid token' });
        }
        else {
          // console.log(decoded)
            req.userId = decoded.userId;
            req.name = decoded.name;
            next();
        }

    })

}


module.exports = auth;