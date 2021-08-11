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
    console.log(post._doc)
    console.log(id, post.userId, userId)
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
    console.log(post._doc)
    console.log(id, post.userId, userId)
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
    console.log(post._doc)
    console.log(id, post.userId, userId)
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
// get timeline posts
router.post('/timeline', async (req, res) => {
    const {userId} = req.body
    try {
        const currentUser = await User.findById(userId);
        const userPosts = await Post.find({userId:currentUser.id})
        const firendPosts = await Promise.all(
            currentUser.followings.map(friendId=>{
               return Post.find({userId:friendId})
            }
        ))
        return res.status(RESPONSESTATUS.Success).json(userPosts.concat(...firendPosts))
    } catch (err) {
        console.log(err)
        return res.status(RESPONSESTATUS.BadRequest).json({error: "Bad request"})
    }
});
module.exports = router;
 