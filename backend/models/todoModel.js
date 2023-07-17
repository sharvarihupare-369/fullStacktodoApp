// const mongoose = require("mongoose");
// const UserModel = require("./userModel");

// const todoSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     created_at: { type: Date, required: true, default : Date.now },
//     priority: {
//         type: Number,
//         required: true
//     },
//     status: {
//         type: String,
//         required : true
//     },
//     userId:{type : mongoose.Schema.Types.ObjectId,ref:"user",required:true},
//     name:{type:String}
// })

// const TodoModel = mongoose.model("todo",todoSchema)

// module.exports = TodoModel;
const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: { type: String, required: true },
    created_at: { type: Date, required: true, default : Date.now },
    priority: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required : true
    },
    userId : {type : mongoose.Schema.Types.ObjectId, ref : 'user', required : true},
    name : { type : String }
})

const TodoModel = mongoose.model('todo', todoSchema);

module.exports = TodoModel;