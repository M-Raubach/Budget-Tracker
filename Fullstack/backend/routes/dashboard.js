const express = require("express");
const router = express.Router();
const { getDashboardSummary } = require("../data/mockStore");

// Returns summary values for the dashboard page.
router.get("/summary", (req, res) => {
  const userId = req.query.userId || 1;
  const summary = getDashboardSummary(userId);
  res.json(summary);
});

module.exports = router;
