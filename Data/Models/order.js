const mongoose = require("mongoose");
const itemSchema =  require("./item");

//scheme for placing order
const orderSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mobNo:{
        type:String,
        required:true
    },
    regID:{
        type:String,
        required:true
    },
    items:{
        type:[itemSchema]
    }
});

//user collection in database
mongoose.model("Order",orderSchema);