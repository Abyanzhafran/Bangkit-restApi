const { check } = require("express-validator");

const validateTransactionInsert = [
  check("userId")
    .notEmpty()
    .withMessage("User ID cannot be null")
    .isString()
    .withMessage("User ID must be a string")
    .isLength({ max: 255 })
    .withMessage("User ID must be at most 255 characters"),
  check("productId")
    .notEmpty()
    .withMessage("product ID cannot be null")
    .isString()
    .withMessage("product ID must be a string")
    .isLength({ max: 255 })
    .withMessage("product ID must be at most 255 characters"),
  check("username")
    .optional()
    .isString()
    .withMessage("Username must be a string")
    .isLength({ max: 255 })
    .withMessage("Username must be at most 255 characters"),
  check("productName")
    .optional()
    .isString()
    .withMessage("Product Name must be a string")
    .isLength({ max: 255 })
    .withMessage("Product Name must be at most 255 characters"),
  check("quantity")
    .optional()
    .isInt()
    .withMessage("Quantity must be an integer"),
  check("price")
    .optional()
    .isFloat()
    .withMessage("Price must be a valid floating-point number"),
  check("totalAmount")
    .optional()
    .isFloat()
    .withMessage("Total Amount must be a valid floating-point number"),
  check("transactionDate")
    .optional()
    .isString()
    .withMessage("Transaction Date must be a string")
    .isLength({ max: 50 })
    .withMessage("Transaction Date must be at most 50 characters"),
];

module.exports = { validateTransactionInsert };
