const { check } = require("express-validator");

const validateProductInsert = [
  check("sellerId")
    .notEmpty()
    .withMessage("Seller ID cannot be null")
    .isString()
    .withMessage("Seller ID must be a string"),
  check("name").optional(),
  check("category").optional(),
  check("definition").optional(),
  check("price").optional().isFloat().withMessage("Invalid price"),
  check("insertedAt").optional(),
  check("updatedAt").optional(),
];

const validateProductUpdate = [
  check("productPhoto").optional(),
  check("name").optional(),
  check("category").optional(),
  check("definition").optional(),
  check("price").optional().isFloat().withMessage("Invalid price"),
  check("insertedAt").optional(),
  check("updatedAt").optional(),
];

module.exports = {
  validateProductInsert,
  validateProductUpdate,
};
