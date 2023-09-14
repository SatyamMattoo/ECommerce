import express from "express";
import { createOrder, getOrder, myOrders } from "../controllers/orders.js";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/order/new",isAuthenticated, createOrder);
router.get("/order/my",isAuthenticated, myOrders);
router.get("/order/:id",isAuthenticated,authorizeRoles("admin"), getOrder);

export default router;
