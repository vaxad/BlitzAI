const mongoose = require('mongoose');

const { Schema } = mongoose;
const noteSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        required:true
    },
    updatedAt:{
        type:Date,
        default:Date.now,
        required:true
    }
  });
  module.exports=mongoose.model('testnote',noteSchema);