import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import getConnection from "./utils/getConnection.js";
import userRoutes from "./routes/user.js";
dotenv.config();

const app = express();
const corsOptions = {
    origin: process.env.URL || 'http://localhost:5173',
    credentials: true,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));


app.use('/user', userRoutes);



app.listen(process.env.PORT, () => {
    getConnection();
    console.log("Server started successfully.", process.env.PORT);
})