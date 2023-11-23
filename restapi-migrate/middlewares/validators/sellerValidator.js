const { check } = require("express-validator");

const validateSellerInsert = [
  check("userId")
    .notEmpty()
    .withMessage("User ID cannot be empty")
    .isString()
    .withMessage("Username must be a string"),
  check("shopName").optional().isString(),
  check("province").optional().isString(),
  check("city").optional().isString(),
  check("detailStreet").optional().isString(),
  check("skill").optional().isString(),
  check("sellerPhoto").optional().isString(),
  check("sellerName").optional().isString(),
  check("phoneNumber")
    .optional()
    .isInt()
    .withMessage("Phone number must be an integer"),
  check("email").optional().isEmail().withMessage("Invalid email address"),
  check("latitude").optional().isFloat().withMessage("Invalid latitude"),
  check("longitude").optional().isFloat().withMessage("Invalid longitude"),
];

const validateSellerUpdate = [
  check("shopName").optional().isString(),
  check("province").optional().isString(),
  check("city").optional().isString(),
  check("detailStreet").optional().isString(),
  check("skill").optional().isString(),
  check("sellerPhoto").optional().isString(),
  check("sellerName").optional().isString(),
  check("phoneNumber")
    .optional()
    .isInt()
    .withMessage("Phone number must be an integer"),
  check("email").optional().isEmail().withMessage("Invalid email address"),
  check("latitude").optional().isFloat().withMessage("Invalid latitude"),
  check("longitude").optional().isFloat().withMessage("Invalid longitude"),
];

module.exports = {
  validateSellerInsert,
  validateSellerUpdate,
};
