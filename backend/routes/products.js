import express from "express";
import {
  myProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} from "../controllers/products.js";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

//Routes
router.get("/my", myProducts);
router.post("/new", isAuthenticated, authorizeRoles("admin"), createProduct);
router
  .route("/:id")
  .get(getProductDetails)
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);

export default router;
