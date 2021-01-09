const express = require("express");
const router = express.Router()
const mongoose = require("mongoose");
//ref to the collection
const User = mongoose.model("User");
//password hashing
const bcrypt = require('bcryptjs');
//token
const jwt = require("jsonwebtoken");
//signature to generate token
const signature = 'iwillwinthehackathon100percent';

router.post("/signup",(req,res)=>{
    //destructure from body
    const {name,orgName,empid,mobno,email,imgURL} = req.body;

    //search in db
    User.findOne({empid:empid}).then((dbUser)=>{
        //if found
        if(dbUser){
            res.status(500).json({error:"User already exists"})
        }
        else{
            //gen uid => username
            const regID = new Date().valueOf().toString();
            //hash password
            bcrypt.hash(empid,12).then((hashedPassword)=>{
                //save data to db
                const newUser = new User({
                    name,
                    orgName,
                    empid,
                    mobno,
                    email,
                    imgURL,
                    regID,
                    password:hashedPassword
                });
                newUser.save().then((x)=>{
                    res.status(201).json({message:"Successful registration,redirecting to login page...",regID:regID,note:"username is your registration id and password is your employee id",success:true})
                }).catch(err=>{
                    console.log(err);
                    res.status(401).json({success:false,message:"Unable to register"})
                })
            })
        }
    })
})

router.post('/signin',(req,res)=>{
    const {username,password} = req.body;

    //search db
    User.findOne({regID:username}).then(dbUser=>{
        //if user not present
        if(!dbUser){
            //redirect to sign up page
            res.status(422).json({error:"Incorrect email or password"})
        }else{
            //compare password of user present in db and user logging in
            bcrypt.compare(password,dbUser.password).then((match)=>{
                if(match){
                    //attach user with token so thathe can access protected resource like menu
                    let token = null;
                    jwt.sign({signedRegID:dbUser.regID},signature,(err,temp)=>{
                        if(err){
                            console.log(err)
                        }
                        else{
                            token = temp;
                            res.json({message:"Successfully signed in",token})
                        }
                    })
                }else{
                    res.json({error:"Invalid email or password"})
                }
            }).catch(err=>{console.log(err)})
        }
    })
})

module.exports = router;