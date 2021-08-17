const router = require('express').Router();
const RESPONSESTATUS = require('../utils/responseStatus');
const Post = require('../models/Post');
const User = require('../models/User')

// create a post
router.post('/', async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        return res.status(RESPONSESTATUS.Success).json(savedPost)
    } catch (err) {
        return res.status(RESPONSESTATUS.BadRequest).json({error: "Bad request"})
    }
})

// update a post
router.put('/:id', async (req, res) => {
    const {id} = req.params
    const {userId} = req.body
    const post = await Post.findById(id)
    if (post.userId === userId) {
        await post.updateOne({$set: req.body})
        return res.status(RESPONSESTATUS.Success).json("Your post has been updated")
    } else {
        return res.status(RESPONSESTATUS.BadRequest).json({error: "You cann't edit others' posts"})
    }
})
// delete a post
router.delete('/:id', async (req, res) => {
    const {id} = req.params
    const {userId} = req.body
    const post = await Post.findById(id)
    if (post.userId === userId) {
        await post.deleteOne()
        return res.status(RESPONSESTATUS.Success).json("Your post has been deleted")
    } else {
        return res.status(RESPONSESTATUS.BadRequest).json({error: "You cann't edit others' posts"})
    }
})
// like a post
router.put('/like/:id', async (req, res) => {
    const {id} = req.params
    const {userId} = req.body
    const post = await Post.findById(id)
    if (! post.likes.includes(userId)) {
        await post.updateOne({
            $push: {
                likes: userId
            }
        })
        return res.status(RESPONSESTATUS.Success).json("Successfully like")
    } else {
        await post.updateOne({
            $pull: {
                likes: userId
            }
        })
        return res.status(RESPONSESTATUS.Success).json("Successfully dislike")
    }
})
// get a post
router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const post = await Post.findById(id)
        return res.status(RESPONSESTATUS.Success).json(post)
    } catch (err) {
        return res.status(RESPONSESTATUS.BadRequest).json({error: "Bad request"})
    }
});

// get timeline posts for a user
router.get('/timeline/:userId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId: currentUser.id})
        return res.status(RESPONSESTATUS.Success).json(userPosts)
    } catch (err) {
        console.log(err)
        return res.status(RESPONSESTATUS.BadRequest).json({error: "Bad request"})
    }
});
module.exports = router;
