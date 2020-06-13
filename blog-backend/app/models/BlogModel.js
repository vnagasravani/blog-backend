const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

let  BlogModel = new Schema({
    blogId :{
        type:String,
        unique:true
    },
    title:{
        type:String,
        default:''
    },
    body:{
        type:String,
        default:''
    },
    author:{
        type:String,
        default:''
    },
     createdOn:{
        type:Date,
        default:Date.now()
    }
});

mongoose.model('BlogModel',BlogModel);




