const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    
    title:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        default:'Public'
    },
    allow:{
        type: Boolean,
        required: true,
    },
    desc:{
        type: String,
        required: true,
    },
    file:{
        type: String
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category'
    },
});
const Post = mongoose.model('Post',PostSchema);
module.exports =  Post;