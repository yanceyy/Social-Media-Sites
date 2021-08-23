const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User')
const mongoose = require('mongoose')
const RESPONSESTATUS = require('../utils/responseStatus')
const {ValidaToken} = require('../utils/jwt')
// update user info
router.put("/", ValidaToken, async (req, res) => {
    try {
        ValidaToken(req)
    } catch (err) {
        return res.status(RESPONSESTATUS.BadRequest).json({error: "Invalid User"})
    }
    let {userId, password} = req.body
    try {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
    } catch (error) {
        return res.status(RESPONSESTATUS.BadRequest).json({error: "illeage request"})
    }

    try {
        const user = await User.findByIdAndUpdate(userId, {password})
        return res.status(RESPONSESTATUS.Success).json({success: "update successfully", data: user})
    } catch (err) {
        return res.status(RESPONSESTATUS.BadRequest).json({error: "illeage request"})
    }
})
// delete user
router.delete("/", async (req, res) => {
    let {userId} = req.body
    try {
        const user = await User.findByIdAndDelete(userId)
        if (user) {
            return res.status(RESPONSESTATUS.Success).json({success: "delete the acount successfully", data: user})
        } else {
            return res.status(RESPONSESTATUS.BadRequest).json({error: "couldn't find the user"})
        }
    } catch (err) {
        return res.status(RESPONSESTATUS.BadRequest).json({error: "illeage request"})
    }
})
// get a user
router.get("/", async (req, res) => {
    let {id} = req.query
    try {
        const user = await User.findById(id)
        const {
            isAdmin,
            password,
            updatedAt,
            __v,
            ...other
        } = user._doc
        console.dir(user)
        return res.status(RESPONSESTATUS.Success).json(other)
    } catch (err) {
        return res.status(403).json({error: "illeage request"})
    }
})


// follow a user
// unfollow a user

router.patch("/", async (req, res) => {
    let {selfId, userId, action} = req.body
    if (selfId === userId) {
        return res.status(RESPONSESTATUS.BadRequest).json({error: "You cannot follow and unfollow youself"})
    }
    try {
        if (action === "follow") {
            const user = await User.findById(userId)
            if (! user) {
                return res.status(RESPONSESTATUS.BadRequest).json({error: "fouldn't found that user"})
            }
            if (user.followers.includes(selfId)) {
                return res.status(RESPONSESTATUS.Forbidden).json({error: "You already follow"})
            } else {

                const self = await User.findById(selfId)
                if (self) {
                    await user.updateOne({
                        $push: {
                            followers: selfId
                        }
                    })
                    await self.updateOne({
                        $push: {
                            followings: userId
                        }
                    })
                    return res.status(RESPONSESTATUS.Success).json({success: "follow successfully"})
                }
            }
        } else if (action === "unfollow") {
            const user = await User.findById(userId)
            if (! user) {
                return res.status(RESPONSESTATUS.BadRequest).json({error: "fouldn't found that user"})
            }
            if (! user.followers.includes(selfId)) {
                return res.status(RESPONSESTATUS.Forbidden).json({error: "You hasn't follow"})
            } else {

                const self = await User.findById(selfId)
                if (self) {
                    await user.updateOne({
                        $pull: {
                            followers: selfId
                        }
                    })
                    await self.updateOne({
                        $pull: {
                            followings: userId
                        }
                    })
                    return res.status(RESPONSESTATUS.Success).json({success: "Unfollow successfully"})
                }
            }

        } else {
            return res.status(RESPONSESTATUS.BadRequest).json({error: "wrong action"})
        }
    } catch (err) {
        return res.status(RESPONSESTATUS.BadRequest).json({error: "Bad request"})
    }
})


module.exports = router;
