const { body, validationResult } = require("express-validator");
const validFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      errors: errors.mapped(),
    });
  }
  next();
};
exports.createUSersValidation = [
  body("name").notEmpty().withMessage("name cannot be empty"),
  body("email").notEmpty().withMessage("email is not valid").isEmail(),
  body("password")
    .notEmpty()
    .withMessage("password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
  validFields,
];

exports.loginUsersValidation = [
    body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  validFields,
];

exports.updateUserValidation = [
  body('currentPassword')
  .notEmpty()
  .withMessage('Password cannot be empty')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters long'),
body('newPassword')
  .notEmpty()
  .withMessage('Password cannot be empty')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters long'),
validFields,

];
