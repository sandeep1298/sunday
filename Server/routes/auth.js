const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const User = mongoose.model("User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {JWT_SECRET } = require('../keys')
const requireLogin = require("../middleware/requireLogin")


router.post('/signup',(req,res)=>{
   const{name, email,password}= req.body
   if(!email || !password || !name){
      return res.status(422).json({error:"please fill all the fields"})
   }
   User.findOne({email:email})
   .then((saveduser)=>{
       if(saveduser){
        return res.status(422).json({error:"user already exists in that email"}) 
       }
       else{
           bcrypt.hash(password,12)
           .then(hashedpassword=>{
                const user = new User({
                    email,password:hashedpassword,name
                })
                user.save()
                .then(user =>{
                    res.json({message:"Signed In successfully"})
                })
                .catch(err=>{
                    console.log(err)
                })
            })
        }
   })
   .catch(err=>{
    console.log(err)
   })
})

router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
      return  res.status(422).json({error:"Please add email or password"})
    }
    User.findOne({email:email})
    .then(saveduser =>{
        if(!saveduser){
         return  res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,saveduser.password)
        .then(doMatch=>{
            if(doMatch){
                //res.json({message:"successfully signed in"})
                const token = jwt.sign({_id:saveduser._id}, JWT_SECRET)
                const {_id,name,email,followers,following} = saveduser
                res.json({token,user:{_id,name,email,followers,following}})
            }else{
                return  res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})
module.exports=router