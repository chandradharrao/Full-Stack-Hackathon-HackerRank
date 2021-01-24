//react form data puts an object{ke1y:data1,key2::data2,...} in the request body
const express = require("express");
const cors = require("cors");
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors())
//middlewear to parse json from body
app.use(express.json());

//const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}

//connect to db
mongoose.connect(process.env.MONGO,{useNewUrlParser: true ,useUnifiedTopology: true, useCreateIndex: true})
  .then(() => console.log('Database mongodb connected'))
  .catch(err => console.log(err));

//cookie parser middle wear
//app.use(cookieParser)

require('./Database/Models/user');

const auth = require('./Routes/auth');
const menu = require("./Routes/menu")

app.use(auth);
app.use(menu);

app.listen(PORT,()=>{
    console.log("Listening to " + PORT + ".....");
})