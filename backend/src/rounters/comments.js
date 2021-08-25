const router = require('express').Router();
const RESPONSESTATUS = require('../utils/responseStatus');
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment')
const {ValidaToken} = require('../utils/jwt');

// create a comments
router.post('/', async (req, res) => {
    const {postId} = req.body
    const post = await Post.findById(postId)
    try {
        if (post) {
            const newComment = new Comment(JSON.parse(req.body.comment))
            const savedComments = await newComment.save()
            await post.updateOne({
                $push: {
                    comments: savedComments._id.toString()
                }
            })
            return res.status(RESPONSESTATUS.Success).json(savedComments)
        }
    } catch (error) {
        console.log(err)
        return res.status(RESPONSESTATUS.BadRequest).json({error: "Bad request"})
    }
})

module.exports = router;
