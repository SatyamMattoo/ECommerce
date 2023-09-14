import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: "India",
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
  },
  orderDetails: [
    {
      productName: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    paymentId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },

  itemsPrice: {
    type: Number,
    required: true,
  },
  taxes: {
    type: Number,
    required: true,
  },
  shippingCharges: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    default: "Processing",
    required: true,
  },
  deliveredAt: {
    type: Date,
  },
  orderedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Order = mongoose.model("Order", orderSchema);
