const express = require("express");
const router = express.Router();
const { addTransaction } = require("../data/mockStore");

// Creates a transaction in the in-memory store for the simple first pass.
router.post("/", (req, res) => {
  const transaction = req.body;

  if (!transaction.amount || !transaction.category || !transaction.date) {
    return res.status(400).json({
      success: false,
      message: "Missing required transaction fields"
    });
  }

  const saved = addTransaction({
    userId: Number(transaction.userId || 1),
    type: transaction.type,
    amount: Number(transaction.amount),
    category: transaction.category,
    date: transaction.date,
    description: transaction.description || ""
  });

  res.status(201).json({
    success: true,
    message: "Transaction saved successfully",
    transaction: saved
  });
});

module.exports = router;
