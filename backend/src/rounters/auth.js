const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const RESPONSESTATUS = require('../utils/responseStatus');
const {GenerateToken, GenerateRefreshToken, ValidaToken} = require('../utils/jwt')
const dotenv = require('dotenv');
dotenv.config();
function removeItem(arr, value) {
    const index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}
// register
router.post("/register", async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            city,
            from,
            relationship
        } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hassedPassword = await bcrypt.hash(password, salt)
        const user = new User({
            username,
            email,
            password: hassedPassword,
            city,
            from,
            relationship
        });
        const userRes = await user.save();
        res.status(RESPONSESTATUS.Success).json(userRes);
    } catch (err) {
        res.status(RESPONSESTATUS.BadRequest).send(err);
    }
})
let reFreshTokens = []
// login
router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (! user) {
            return res.status(RESPONSESTATUS.BadRequest).json({error: "not exist that user"})
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (! validPassword) {
            return res.status(RESPONSESTATUS.BadRequest).json({error: "wrong password"})
        }

        let {
            password: p,
            isAdmin,
            __v,
            ...others
        } = user._doc
        const accessToken = GenerateToken(others);
        const refreshToken = GenerateRefreshToken(others);

        reFreshTokens.push(refreshToken)
        others = {
            ...others,
            accessToken,
            refreshToken
        }

        return res.status(RESPONSESTATUS.Success).json({success: "login success", userInfo: others})
    } catch (err) {
        return res.status(RESPONSESTATUS.BadRequest).json(err);
    }

})

// Logout
router.post("/logout", async (req, res) => {
    try {
        const refreshToken = req.body.token
        reFreshTokens = removeItem(reFreshTokens, refreshToken)
        return res.status(RESPONSESTATUS.Success).json({success: "logout success"})
    } catch (err) {
        return res.status(RESPONSESTATUS.BadRequest).json(err);
    }

})

// refresh token from the user
// send error if there is no token or it is invalid
// otherwise create new acess token
router.post("/refresh", async (req, res) => {
    const refreshToken = req.body.token
    if (! refreshToken) {
        console.log("You are no authorizated1")
        return res.status(401).json("You are no authorizated")
    }

    if (! reFreshTokens.includes(refreshToken)) {
        console.log("Refresh token is not valid")
        return res.status(401).json("Refresh token is not valid")
    }
    try {
        const decodedN = jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH)

        const {
            iat,
            ...decoded
        } = decodedN
        // remove iat which indicates the create time
        // or the exipred date will be same from the create time
        const authorization = GenerateToken(decoded)
        const refreshtoken = GenerateRefreshToken(decoded)
        reFreshTokens = removeItem(reFreshTokens, refreshToken)
        reFreshTokens.push(refreshtoken)
        res.status(200).json({accessToken: authorization, refreshToken: refreshtoken})
    } catch (err) {
        console.log(err)
        return res.status(RESPONSESTATUS.Unauthorized).json({error: "Invalid User"})
    }
})
module.exports = router;
