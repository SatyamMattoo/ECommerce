import ErrorHandler from "../middlewares/errorHandler.js";
import { Order } from "../models/orders.js";
import { Product } from "../models/products.js";

//Create Order
export const createOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderDetails,
      paymentInfo,
      itemsPrice,
      taxes,
      shippingCharges,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderDetails,
      paymentInfo,
      itemsPrice,
      taxes,
      shippingCharges,
      totalPrice,
      user: req.user._id,
      paidAt: Date.now(),
    });

    console.log(req.body);

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

//Get single Order
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

//Orders for the Logged in User
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

//Get All Orders - Admin
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    if (!orders) {
      return next(new ErrorHandler("Order not found", 404));
    }

    let totalAmt = 0;

    orders.forEach((order) => {
      totalAmt += order.totalPrice;
    });

    res.status(200).json({
      success: true,
      totalAmt,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

//Update Stock
async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

//Update Order - Admin
export const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    if (order.orderStatus === "Delivered") {
      return next(
        new ErrorHandler("You have already delivered this order", 404)
      );
    }

    order.orderDetails.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Order Updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

//Delete Order - Admin
export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Order Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
