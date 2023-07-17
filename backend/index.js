const express = require("express");
const app = express()
const cors = require("cors")
require('dotenv').config();
const Port =  process.env.PORT
const connection = require("./.configs/db");
const todoRoute = require("./routes/todoRoute");
const userRouter = require("./routes/userRoute");
app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
app.use("/todos",todoRoute)




app.listen(Port,async()=>{
    try {
    await connection
    console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is listening on port ${Port}`)
})