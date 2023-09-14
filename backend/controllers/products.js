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

//create and update review
export const createReview = async (req, res, next) => {
  try {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
          rev.rating = rating;
          rev.comment = comment;
        }
      });
    } else {
      product.reviews.push(review);
      product.noOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.rating = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Review Added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

//get all reviews of a product
export const getAllReviews = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    next(error);
  }
};

//delete a review
export const deleteReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter((rev) => {
      const isMatch = rev._id.toString() !== req.query.id;
      return isMatch;
    });

    let avg = 0;

    reviews.forEach((rev) => {
      avg += rev.rating;
    });

    let rating = 0;

    if (reviews.length === 0) {
      rating = 0;
    } else {
      rating = avg / reviews.length;
    }

    const noOfReviews = reviews.length;

    console.log(rating, noOfReviews, reviews);

    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        rating,
        reviews,
        noOfReviews,
      },
      {
        new: true,
        runValidaters: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      message: "Review Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
