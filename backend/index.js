const express = require("express");
const app = express()
require('dotenv').config();
const Port =  process.env.PORT
const connection = require("./.configs/db");
const todoRoute = require("./routes/todoRoute");
app.use(express.json())
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