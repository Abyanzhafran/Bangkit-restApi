const { check } = require("express-validator");

const validateComment = [
  check("username")
    .notEmpty()
    .withMessage("Username cannot be null")
    .isString()
    .withMessage("Username must be a string"),
  check("comment").notEmpty().withMessage("comment cannot be null"),
  check("rating")
    .notEmpty()
    .withMessage("rating cannot be null")
    .isInt()
    .withMessage("rating must be an integer"),
];

module.exports = { validateComment };
