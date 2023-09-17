import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
  myOrders,
  updateOrder,
} from "../controllers/orders.js";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/order/new", isAuthenticated, createOrder);
router.get("/order/my", isAuthenticated, myOrders);
router.get("/order/:id", isAuthenticated, getOrder);

router.get(
  "/admin/orders",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrders
);
router
  .route("/admin/orders/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteOrder);

export default router;
