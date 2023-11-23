const { check } = require("express-validator");

const validateUserInsert = [
  check("fullName").optional(),
  check("username")
    .notEmpty()
    .withMessage("Username cannot be null")
    .isString()
    .withMessage("Username must be a string"),
  check("password").optional(),
  check("gender").optional(),
  check("dateOfBirth").optional(),
  check("phoneNumber")
    .optional()
    .isInt()
    .withMessage("Phone number must be an integer"),
  check("email").optional().isEmail().withMessage("Invalid email address"),
  check("photoProfile").optional(),
  check("latitude").optional().isFloat().withMessage("Invalid latitude"),
  check("longtitude").optional().isFloat().withMessage("Invalid longitude"),
];

const validateUserUpdate = [
  check("fullName").optional(),
  check("username")
    .optional()
    .isString()
    .withMessage("Username must be a string"),
  check("password").optional(),
  check("gender").optional(),
  check("dateOfBirth").optional(),
  check("phoneNumber")
    .optional()
    .isInt()
    .withMessage("Phone number must be an integer"),
  check("email").optional().isEmail().withMessage("Invalid email address"),
  check("photoProfile").optional(),
  check("latitude").optional().isFloat().withMessage("Invalid latitude"),
  check("longtitude").optional().isFloat().withMessage("Invalid longitude"),
];

module.exports = {
  validateUserInsert,
  validateUserUpdate,
};
