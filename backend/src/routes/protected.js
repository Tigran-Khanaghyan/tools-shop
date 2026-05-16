const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

// Protected route example
router.get("/", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "You have access to this protected resource",
    data: {
      user: req.user,
      timestamp: new Date().toISOString(),
    },
  });
});

module.exports = router;
