const express = require("express");
const router = express.Router();
const verifyUser = require("../Middlewears/verifyUser");
const menu = require("../Database/Assets/MenuItems.json");

//supply the menu : menu is not pretected resource but booking is
router.get("/menu",(req,res)=>{
    res.status(200).json({menu:menu});
})

//accept the order(with take away time from front end),generate the bill and send the bill to front end
//front end upon recieving the bill should be able to give payment mode for the bill
router.post("/book",verifyUser,(req,res)=>{
    
})

module.exports = router;