const express = require("express");
const router = express.Router()
const mongoose = require("mongoose");
//ref to the collection
const User = mongoose.model("User");
//password hashing
const bcrypt = require('bcryptjs');
//token
const jwt = require("jsonwebtoken");
const signature = process.env.JWT_SECRET;

router.post("/signup",(req,res)=>{
    console.log("Signup route...");

    //destructure from body
    const {name,orgName,empID,mobNo,email,password,imgURL} = req.body;
    console.log("this is the req.body " + req.body);

    console.log("Searching in db....");
    //search in db collection
    User.findOne({empID:empID}).then((dbUser)=>{
        //if found
        if(dbUser){
            console.log("user already in db :(");
            res.json({error:"User already exists in db",message:"User with this details already exists"})
        }
        else{
            console.log("Creating user.....")
            //gen uid => username
            const regID = new Date().valueOf().toString();
            console.log("regid created is " + regID);

            //hash password
            bcrypt.hash(password,12).then((hashedPassword)=>{
                //generate the date in dd/mm/yyyy
                let currDate = new Date().toLocaleDateString('en-GB');
                console.log("reg date : " + currDate)
                
                //save data to db
                const newUser = new User({
                    name,
                    orgName,
                    empID,
                    mobNo,
                    email,
                    imgURL,
                    regID,
                    imgURL,
                    password:hashedPassword,
                    regDate:currDate
                });
                newUser.save().then((x)=>{
                    console.log("New user created!")
                    //create json web token for auth the user
                    jwt.sign({signedRegID:x.regID},signature,(err,temp)=>{
                        if(err){
                            console.og(err);
                            res.json({error:"Server is busy at the moment...",user:null})
                        }
                        else{
                            req.user = x;
                            res.json({message:"Successful Registration",note:"redirecting to login page...",regID:regID,success:true,user:x,token:temp})
                        }
                    })
                }).catch(err=>{
                    console.log("unable to create new user : " + "because of the error " + err);
                    res.json({success:false,error:"Unable to register",message:"try again..",user:null})
                })
            }).catch(err=>{
                //dev error
                console.log(err);
                res.json({error:"Server is busy at the moment...",user:null})
            })
        }
    })
})

router.post('/login',(req,res)=>{
    console.log("Signing in route...");
    //const {username,password,rememberMe} = req.body;
    const {username,password} = req.body;
    //console.log(req.body);

    if(username == "" || password == ""){
        res.json({message:"Please fill all the fields",success:false});
        return;
    }

    //search db : username : empID,password : whatever user wants
    User.findOne({empID:username}).then(dbUser=>{
        //if user not present
        if(!dbUser){
            res.status(422).json({error:"Incorrect employee ID or password",message:"Create new account or Enter valid employee ID and password"})
        }else{
            //compare password of user present in db and user logging in
            bcrypt.compare(password,dbUser.password).then((match)=>{
                if(match){
                    console.log("Matched password and username")
                    //attach user with token so tha they can access protected resource like menu
                    let token = null;
                    jwt.sign({signedRegID:dbUser.empID},signature,(err,temp)=>{
                        if(err){
                            //error for dev
                            console.log(err);
                            res.json({error:"Server is busy at the moment...",user:null})
                        }
                        else{
                            console.log("Successful sign in...")
                            token = temp;
                            //attach rememebr me bool to the client cookie
                            //res.cookie("doRememebrMe",rememberMe,{maxAge:oneYearToSeconds});
                            //attach user data to req
                            req.user = dbUser;
                            res.json({message:"Successfully Signed In",token:token,success:true,user : req.user})
                        }
                    })
                }else{
                    res.status(422).json({error:"Incorrect employee ID or password",message:"Create new account or Enter valid employee ID and password",success:false,user:null})
                }
            }).catch(err=>{console.log(err);res.json({error:"Server is busy at the moment...",user:null})})
        }
    }).catch(err=>{console.log(err);res.json({error:"Server is busy at the moment...",user:null})})
})

module.exports = router;