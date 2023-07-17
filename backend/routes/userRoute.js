const express = require("express")
const bcrypt = require("bcrypt")
const jwt= require("jsonwebtoken")
const mykey = process.env.JWT_SECRET
const rkey = process.env.JWT_REFRESH_KEY
const UserModel = require("../models/userModel")
const registerMiddleware = require("../middlewares/registermiddleware")
const BlackListModel = require("../models/blackListModel")
const auth = require("../middlewares/authMiddleware")
const userRouter = express.Router()


userRouter.post("/register",registerMiddleware,async(req,res)=>{
    const {pass} = req.body
    try {
      const newPass = await bcrypt.hash(pass,10)
      const user = await UserModel.create({...req.body,pass:newPass})
      res.send({msg:"User registered successfully",user}) 
    } catch (error) {
        res.status(400).send({msg:error.message})
    }

})


userRouter.post("/login",async(req,res)=>{
    const {email,pass} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(!user){
           return res.status(400).send("Invalid credentials")
        }
        const comparepass = await bcrypt.compare(pass,user.pass)
        if(!comparepass){
           return  res.status(400).send("Invalid credentials")
        }else{
            const token = jwt.sign({userId:user._id,name:user.name},mykey,{expiresIn: "6hr"})
            res.send({msg:"User logged in successfully",token})
        }
    } catch (error) {
        res.send(400).status({msg:error.message})
    }
})


userRouter.get("/logout",async(req,res)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if(!token){
       return res.status(400).send({"msg":"Login First!"})
    }
    try {
        const blackList = await BlackListModel.create({token})
        res.status(200).send({"msg":"User Logged out"})
    } catch (error) {

        res.status(400).send({ msg: 'Cannot blacklist the token' });

    }
})


module.exports = userRouter