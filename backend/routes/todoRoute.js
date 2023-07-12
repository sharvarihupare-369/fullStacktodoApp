const express = require("express")
const TodoModel = require("../models/todoModel")
const validator = require("../middleware/validator")
const todoRoute = express.Router()

todoRoute.post("/addtodo",validator,async(req,res)=>{
    try {
        const todo = await TodoModel.create(req.body)
        res.status(200).send({"msg":"Todo added successfully",todo})
    } catch (error) {
        res.status(400).send({'errormsg':error.message})
    }
})


todoRoute.get("/",async(req,res)=>{
    const {q} =  req.query;
    try {
        if(!q){
            const todos = await TodoModel.find(req.query)
            res.status(200).send(todos)
        }else{
            const todos = await TodoModel.find({ title: { $regex: q, $options: "i" } })
            res.status(200).send(todos)
        }
    } catch (error) {
        res.status(400).send({'errormsg':error.message})
    }
})

todoRoute.get("/:id",async(req,res)=>{
    const id = req.params.id
    try {
         const todo = await TodoModel.findById({_id:id})
         res.status(200).send(todo)
    } catch (error) {
        res.status(400).send({'errormsg':error.message})
    }
})


todoRoute.patch("/update/:id",async(req,res)=>{
    const id = req.params.id;
    try {
        const todo = await TodoModel.findByIdAndUpdate({_id:id},req.body,{new:true})
        res.status(200).send({"msg":"Todo is updated",todo})
    } catch (error) {
        res.status(400).send({'errormsg':error.message})
    }
})


todoRoute.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id;
    try {
        const todo = await TodoModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":"Todo is deleted"})
    } catch (error) {
        res.status(400).send({'errormsg':error.message})
    }
})

module.exports = todoRoute