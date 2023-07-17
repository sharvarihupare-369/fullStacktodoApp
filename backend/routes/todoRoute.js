const express = require("express")
const TodoModel = require("../models/todoModel")
const validator = require("../middlewares/validator")
const auth = require("../middlewares/authMiddleware")
const todoRoute = express.Router()

todoRoute.post("/addtodo",auth,validator,async(req,res)=>{

    try {
        const {title,priority,status,created_at} = req.body
        const todo = await TodoModel.create({title,priority,status,created_at,userId:req.userId,name:req.name})
        // await todo.populate("creator")
        res.status(200).send({"msg":"Todo added successfully",todo})
    } catch (error) {
        res.status(400).send({'errormsg':error.message})
    }

})


todoRoute.get("/",auth,async(req,res)=>{
    const {q} =  req.query;
    const userId = req.userId
    const page = req.query.page
    const limit = req.query.limit;

    try {
       let pageNum = +page || 1
       let skip = (pageNum-1) * limit
       let limitPage = +limit || 5      
        if(q){
            const todos = await TodoModel.find({ title: { $regex: q, $options: "i" } , userId }).skip(skip).limit(limitPage)
            res.status(200).send(todos)
        }else{
            const todos = await TodoModel.find({userId}).skip(skip).limit(limitPage)
            res.status(200).send(todos)
        }
    } catch (error) {
        res.status(400).send({'errormsg':error.message})
    }
})




todoRoute.patch("/update/:id",auth,async(req,res)=>{
    const id = req.params.id;
    const userId = req.userId
    const user = await TodoModel.findOne({_id:id})
    try {
        if(userId == user.userId.toString()){
            const updatedTodos = await TodoModel.findByIdAndUpdate({_id:id},req.body,{new:true})
            res.status(200).send({"msg":"Todos updated successfully",updatedTodos})
        }else{
            res.status(400).send({"msg":"You are not allowed to update"})
        }
    } catch (error) {
        res.status(400).send({'errormsg':error.message})
    }
})


todoRoute.delete("/delete/:id",auth,async(req,res)=>{
    const id = req.params.id;
    const userId = req.userId
    const user = await TodoModel.findOne({_id:id})
    try {
        if(userId == user.userId.toString()){
            const todo = await TodoModel.findByIdAndDelete({_id:id})
            res.status(200).send({"msg":"Todo is deleted"})
        }else{
            res.status(400).send({"msg":"You are not allowed to delete"})
        }
    } catch (error) {
        res.status(400).send({'errormsg':error.message})
    }
})

module.exports = todoRoute