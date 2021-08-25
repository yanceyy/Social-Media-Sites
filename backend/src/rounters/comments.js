const router = require('express').Router();
const RESPONSESTATUS = require('../utils/responseStatus');
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment')
const {ValidaToken} = require('../utils/jwt');

// create a comments
router.post('/', ValidaToken, async (req, res) => {

    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        return res.status(RESPONSESTATUS.Success).json(savedPost)
    } catch (err) {
        return res.status(RESPONSESTATUS.BadRequest).json({error: "Bad request"})
    }
})

module.exports = router;
