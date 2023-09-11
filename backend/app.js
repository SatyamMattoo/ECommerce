import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { error } from "./middlewares/errorHandler.js";
import productRouter from "./routes/products.js";
import userRouter  from "./routes/users.js"

export const app = express();

//specify path to env variables
config({ path: "backend/configs/config.env" });

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);

//Error Middleware
app.use(error);

app.get("/", (req, res) => console.log("Working"));
