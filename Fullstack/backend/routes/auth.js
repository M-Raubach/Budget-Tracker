const express = require("express");
const router = express.Router();

// Keeps the original prototype login check for the simple first pass.
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "username" && password === "password") {
    return res.json({
      success: true,
      user: {
        id: 1,
        username
      }
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid username or password"
  });
});

module.exports = router;
