import { Product } from "../models/products.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import ApiFeatures from "../utils/features.js";

//Creating product--Admin
export const createProduct = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
     
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
      message: "Product Created successfully",
    });
  } catch (error) {
    next(error);
  }
};

//Get specific product
export const getProductDetails = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

//Get all prodcuts
export const myProducts = async (req, res, next) => {
  try {
    const resultPerPage = 10;
    const productCount = await Product.countDocuments();

    const ApiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);

    const products = await ApiFeature.query;

    res.status(201).json({
      products,
      productCount,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

//Updating product--Admin
export const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidaters: true,
      useFindAndModify: false,
    });

    res.status(201).json({
      success: true,
      product,
      message: "Product Updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

//Deleting Product--Admin
export const deleteProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    product = await Product.findByIdAndDelete(req.params.id);

    res.status(201).json({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
