import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import getConnection from "./utils/getConnection.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true, limit:"50mb"}));






app.listen(process.env.PORT, ()=>{
    getConnection();
    console.log("Server started successfully.", process.env.PORT);
})