const express = require("express");
const router = express.Router();
const verifyUser = require("../Middlewears/verifyUser");
//const menu = require("../Data/Assets/MenuItems.json");
const menu = [
    {
        "category":"South Indian",
        "items": [
            {"name":"Masala Dosa" ,"price": "10", "description": "This is a place for describing the food"},
            {"name":"Puri Sagu","price":"20", "description":"This is a place for describing the food"},
            {"name":"Masala Idly" ,"price": "10", "description": "This is a place for describing the food"},
            {"name":"Masala Vada" ,"price": "10", "description": "This is a place for describing the food"},
            {"name":"Idly" ,"price": "10", "description": "This is a place for describing the food"},
            {"name":"Vada" ,"price": "10", "description": "This is a place for describing the food"}
        ]
    },
    {
        "category":"Others",
        "items": [
            {"name":"Pav Bhaji","price":"30",  "description":"This is a place for describing the food"},
            {"name":"Pasta","price":"100",  "description":"This is a place for describing the food"},
            {"name":"Tea","price":"10",  "description":"This is a place for describing the food"}
        ] 
    }
]

//supply the menu : menu is not protected resource but booking is
router.get("/menu",(req,res)=>{
    console.log(req);
    res.status(200).json({menu:menu});
})

//accept the order(with take away time from front end),generate the bill and send the bill to front end
//front end upon recieving the bill should be able to give payment mode for the bill
router.post("/book",verifyUser,(req,res)=>{
    //logic to calculate bill using req.body
    //console.log(req.body);
    res.json({success:true})
})

module.exports = router;