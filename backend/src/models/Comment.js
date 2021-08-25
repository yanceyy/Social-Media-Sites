const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        max: 500
    }

}, {timestamps: true});

module.exports = mongoose.model("Comment", CommentSchema);
