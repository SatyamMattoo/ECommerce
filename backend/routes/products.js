import express from "express";
import {
  myProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} from "../controllers/products.js";

const router = express.Router();

//Routes
router.get("/my", myProducts);
router.post("/new", createProduct);
router
  .route("/:id")
  .get(getProductDetails)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;
