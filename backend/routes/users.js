import express from "express";
import {
  createUser,
  forgotPassword,
  loginUser,
  logoutUser,
  resetPassword,
} from "../controllers/users.js";

const router = express.Router();

router.post("/new", createUser);
router.get("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/password/reset", forgotPassword);
router.put("/password/reset/:token", resetPassword);

export default router;
