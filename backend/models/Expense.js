const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 100
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0.01, "Amount must be greater than zero"]
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      maxlength: 50
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "UPI", "Card", "Net Banking", "Other"],
      default: "Cash"
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
