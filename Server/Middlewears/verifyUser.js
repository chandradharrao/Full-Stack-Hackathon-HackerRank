//middle wear to verify user
//req.header.authuriation:"Bearer  __token__"; if logged in else null
//we need to extract the token
const jwt = require("jsonwebtoken");
const signature = 'iwillwinthehackathon100percent';
const User = mongoose.model("User");

module.exports = (req,res,next)=>{
    //extract authorization
    const {authorization} = req.headers;
    if(!authorization){
        res.status(401).json({error:"You must log in before booking"})
    }else{
        //extract token
        const token = authorization.split(" ")[1].toString()
        //verify if valid token
        jwt.verify(token,signature,(err,payload)=>{
            if(err){
                console.log(err);
                res.json({message:"You must be logged in"});
            }
            else{
                //extract regID from decoded payload
                const regID = payload.signedRegID;
                //attach user details into the req.user
                User.findOne({regID}).then((foundUser)=>{
                    req.user = foundUser;
                    next();
                })
            }
        })
    }
}