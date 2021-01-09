const mongoose = require("mongoose");

//scheme for an item
const itemSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    cost:{
        type:String,
        required : true
    },
    quantity:{
        type:String,
        required:true,
        default:0
    }
})

module.exports =  itemSchema