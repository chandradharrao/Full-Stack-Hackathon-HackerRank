//react form data puts an object{ke1y:data1,key2::data2,...} in the request body
const express = require("express");
const PORT = 8080;
const app = express();
//const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const MONGOURI = "PLACE_YOUR_URI";

//connect to db
mongoose.connect(MONGOURI,{ useUnifiedTopology: true ,useNewUrlParser: true ,useCreateIndex:true}).then(()=>{
    console.log("Successfull connection with mongodb...")
}).catch(err=>{
    console.log("Mongodb connection failed " + err);
});

//middlewear to parse json from body
app.use(express.json());

//cookie parser middle wear
//app.use(cookieParser)

require('./Database/Models/user');

app.use(require('./Routes/auth'));
app.use(require("./Routes/menu"));

app.listen(PORT,()=>{
    console.log("Listening to " + PORT + ".....");
})