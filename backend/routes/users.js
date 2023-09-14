import express from "express";
import {
  createUser,
  deleteUser,
  forgotPassword,
  getAllUsers,
  getUser,
  getUserDetails,
  loginUser,
  logoutUser,
  resetPassword,
  updateUserDetails,
  updateUserRoles,
} from "../controllers/users.js";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

//User routes
router.post("/new", createUser);
router.get("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/password/reset", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/myDetails", isAuthenticated, getUserDetails);
router.put("/my/update", isAuthenticated, updateUserDetails);


//Admin routes
router.get(
  "/admin/users",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);

router
  .route("/admin/users/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getUser)
  .put(isAuthenticated, authorizeRoles("admin"), updateUserRoles)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteUser);

export default router;
