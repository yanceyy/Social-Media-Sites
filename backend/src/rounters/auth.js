const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')

// register
router.post("/register", async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hassedPassword = await bcrypt.hash(password, salt)
        const user = new User({username, email, password: hassedPassword});
        const userRes = await user.save();
        res.status(200).json(userRes);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
})

// login
router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (! user) {
            return res.status(400).json({error: "not exist that user"})
        }
        const validPassword = await bcrypt.compare(password,user.password)
        console.log(password,user.password)
        if (! validPassword) {
            return res.status(400).json({error: "wrong password"})
        }
    } catch (err) {
        return res.status(400).send(err);
    }
    res.status(200).json({success: "login success"})
})

module.exports = router;
