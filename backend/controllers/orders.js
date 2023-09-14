import { Product } from "../models/products.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import ApiFeatures from "../utils/features.js";
import { Order } from "../models/orders.js";

export const createOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxes,
      shippingCharges,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxes,
      shippingCharges,
      totalPrice,
      user: req.user._id,
      paidAt: Date.now(),
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

//orders for the logged in user
export const myOrders = async (req, res, next) => {
  try { 
    const orders = await Order.find({ user: req.user });

    if (!orders) {
      return next(new ErrorHandler("Order not found", 404));
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

