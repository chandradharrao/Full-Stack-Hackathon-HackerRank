const express = require("express");
const router = express.Router();
const verifyUser = require("../Middlewears/verifyUser");
//const menu = require("../Database/Assets/MenuItems.json");
const menu = require("../Database/Assets/NewMenuItems.json");

//supply the menu : menu is not protected resource but booking is
router.get("/",(req,res)=>{
    res.status(200).json({menu:menu});
})

//accept the order(with take away time from front end),generate the bill and send the bill to front end
//front end upon recieving the bill should be able to give payment mode for the bill
router.post("/book",verifyUser,(req,res)=>{
    //logic to calculate bill using req.body
    console.log(req.body);
    res.json({success:true})
})

module.exports = router;