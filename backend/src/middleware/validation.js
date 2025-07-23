const { body, validationResult } = require("express-validator");

// Validation middleware for creating a player
const validatePlayer = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Name must be between 1 and 50 characters")
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage("Name can only contain letters, numbers, and spaces"),
  body("score")
    .isInt({ min: 0, max: 999999 })
    .withMessage("Score must be a non-negative integer up to 999,999"),
];

// Validation middleware for updating a score
const validateScoreUpdate = [
  body("score")
    .isInt({ min: 0, max: 999999 })
    .withMessage("Score must be a non-negative integer up to 999,999"),
];

// Error handling middleware for validation
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  next();
};

module.exports = {
  validatePlayer,
  validateScoreUpdate,
  handleValidationErrors,
};
