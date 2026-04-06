const express = require("express");
const router = express.Router();
const { getDashboardSummary } = require("../data/mockStore");

// Reuses the dashboard summary and returns the same values as a simple monthly report.
router.get("/monthly", (req, res) => {
  const userId = req.query.userId || 1;
  const summary = getDashboardSummary(userId);
  res.json(summary);
});

module.exports = router;
