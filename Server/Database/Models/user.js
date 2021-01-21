const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    orgName:{
        type:String,
        required:true
    },
    empID:{
        type:String,
        required:true
    },
    mobNo:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    imgURL:{
        type:String,
        required:true
    },
    regID:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    regDate:{
        type:String,
        required:true
    }
});

//user collection in database
mongoose.model("User",userSchema);

