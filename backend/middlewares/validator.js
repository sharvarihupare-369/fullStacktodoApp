const TodoModel = require("../models/todoModel")

const validator = async(req,res,next) => {
     const {title,status} = req.body
     const userId = req.userId
     if(!title || status==undefined){
       return res.status(400).send({"errmsg":"All the fields are required"})
     }

     
     const existTodo = await TodoModel.findOne({title,userId})
     if(existTodo){
        return res.status(400).send({"errmsg":"This todo is already exist"})
     }

     next()
    
}

module.exports = validator