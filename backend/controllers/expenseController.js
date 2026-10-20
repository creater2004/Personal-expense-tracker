const mongoose = require("mongoose");
const Expense = require("../models/Expense");

function validId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

async function createExpense(req, res, next) {
  try {
    const { title, amount, category, paymentMethod, date, description } = req.body;

    if (!title || amount === undefined || !category) {
      return res.status(400).json({ message: "Title, amount and category are required" });
    }

    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ message: "Amount must be a number greater than zero" });
    }

    const expense = await Expense.create({
      user: req.user._id,
      title,
      amount: numericAmount,
      category,
      paymentMethod,
      date: date || new Date(),
      description
    });

    return res.status(201).json({ message: "Expense created", expense });
  } catch (error) {
    next(error);
  }
}

async function getExpenses(req, res, next) {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1, createdAt: -1 });
    return res.json({ count: expenses.length, expenses });
  } catch (error) {
    next(error);
  }
}

async function getExpenseById(req, res, next) {
  try {
    if (!validId(req.params.id)) {
      return res.status(400).json({ message: "Invalid expense ID" });
    }

    const expense = await Expense.findOne({ _id: req.params.id, user: req.user._id });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.json({ expense });
  } catch (error) {
    next(error);
  }
}

async function updateExpense(req, res, next) {
  try {
    if (!validId(req.params.id)) {
      return res.status(400).json({ message: "Invalid expense ID" });
    }

    const allowedFields = ["title", "amount", "category", "paymentMethod", "date", "description"];
    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }

    if (updates.amount !== undefined) {
      updates.amount = Number(updates.amount);
      if (!Number.isFinite(updates.amount) || updates.amount <= 0) {
        return res.status(400).json({ message: "Amount must be a number greater than zero" });
      }
    }

    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updates,
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.json({ message: "Expense updated", expense });
  } catch (error) {
    next(error);
  }
}

async function deleteExpense(req, res, next) {
  try {
    if (!validId(req.params.id)) {
      return res.status(400).json({ message: "Invalid expense ID" });
    }

    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.json({ message: "Expense deleted" });
  } catch (error) {
    next(error);
  }
}

async function getSummary(req, res, next) {
  try {
    const result = await Expense.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          totalExpenses: { $sum: 1 }
        }
      }
    ]);

    const summary = result[0] || { totalAmount: 0, totalExpenses: 0 };
    return res.json({
      totalAmount: summary.totalAmount,
      totalExpenses: summary.totalExpenses
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getSummary
};
