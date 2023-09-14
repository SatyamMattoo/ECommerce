import express from "express";
import {
  myProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createReview,
  deleteReview,
  getAllReviews,
} from "../controllers/products.js";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

//Routes
router.get("/my", myProducts);
router.route("/:id").get(getProductDetails);

router.post(
  "admin/new",
  isAuthenticated,
  authorizeRoles("admin"),
  createProduct
);

router
  .route("admin/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);

router
  .route("/reviews")
  .put(isAuthenticated, createReview)
  .delete(isAuthenticated, deleteReview);
router.get("/reviews/:id", getAllReviews);

export default router;
