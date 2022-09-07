const { check } = require("express-validator");

const checkFullName = check("full_name").contains();

const checkEmail = check("email")
  .isEmail()
  .contains()
  .withMessage("Please provide a valid email.");

const checkUserName = check("user_name").contains();

const checkPassword = check("password")
  .isLength({ min: 6, max: 15 })
  .contains()
  .withMessage("Password has to be between 6 and 15 characters.");
module.exports = {
  loginValidation: [checkEmail, checkPassword],
  customerValidation: [checkFullName, checkEmail, checkUserName, checkPassword],
};
