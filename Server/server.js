//react form data puts an object{ke1y:data1,key2::data2,...} in the request body
const express = require("express");
const PORT = 8080;
const app = express();

//middlewear to parse json from body
app.use(express.json());

require('./Database/Models/user');

app.use(require('./Routes/auth'));

app.listen(PORT,()=>{
    console.log("Listening to " + PORT + ".....");
})