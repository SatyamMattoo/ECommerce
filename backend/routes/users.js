import express from "express";
import { createUser, loginUser, logoutUser } from "../controllers/users.js";

const router = express.Router();

router.post("/new", createUser);
router.get("/login", loginUser);
router.get("/logout", logoutUser);

export default router;
