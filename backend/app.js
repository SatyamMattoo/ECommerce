import express from "express";
import { config } from "dotenv";
import productRouter from "./routes/products.js";
import { error } from "./middlewares/errorHandler.js";

export const app = express();

//specify path to env variables
config({ path: "backend/configs/config.env" });

//Middlewares
app.use(express.json());
app.use("/api/v1/products", productRouter);

//Error Middleware
app.use(error);

app.get("/", (req, res) => console.log("Working"));
