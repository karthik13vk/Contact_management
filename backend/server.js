import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/ContactRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/contacts", contactRoutes);

app.get("/", (req, res) => {
    res.send("Server Working fine...");
});

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(5000, () => {
            console.log("Server Running on Port 5000");
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
