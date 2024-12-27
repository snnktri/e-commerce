//require("dotenv").config({path: "./env"})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import express from "express";

dotenv.config(
    {
        path: './.env'
    }
)

const app = express();

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000, ()=> {
        console.log("MONGODB CONNECTED !! DB HOST: ", process.env.PORT);
    })
})
.catch (error => {
    console.error("Error on connecting to database ", error);
})