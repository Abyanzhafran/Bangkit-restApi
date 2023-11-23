const { check } = require("express-validator");

const validateLogin = [
  check("username")
    .notEmpty()
    .withMessage("Username cannot be null")
    .isString()
    .withMessage("Username must be a string"),
  check("password")
    .notEmpty()
    .withMessage("password cannot be null")
    .isString()
    .withMessage("password must be a string"),
];

module.exports = {
  validateLogin,
};
