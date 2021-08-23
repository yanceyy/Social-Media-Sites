const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const RESPONSESTATUS = require('./responseStatus');
dotenv.config();

const ValidaToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded._id !== req.body.userId) 
                return res.status(RESPONSESTATUS.Unauthorized).json({error: "Invalid User"})

            

            next()
        } catch (err) {
            console.log(err)
            return res.status(RESPONSESTATUS.Unauthorized).json({error: "Invalid User"})
        }
    } else {
        return res.status(RESPONSESTATUS.Unauthorized).json({error: "Invalid User"})
    }
}

const GenerateToken = (data) => {
    return jwt.sign(data, process.env.SECRET_KEY, {expiresIn: "15m"})
}

const GenerateRefreshToken = (data) => {
    return jwt.sign(data, process.env.SECRET_KEY_REFRESH)
}

module.exports = {
    ValidaToken,
    GenerateToken,
    GenerateRefreshToken
}
