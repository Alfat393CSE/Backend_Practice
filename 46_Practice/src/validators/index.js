import { body } from "express-validator";

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Email is invalid")
      .notEmpty()
      .withMessage("Email is required"),
    body("username")
      .trim()
      .isLowercase()
      .withMessage("Username must be in lowercase")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters")
      .notEmpty()
      .withMessage("Username is required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .notEmpty()
      .withMessage("Password is required"),
    body("fullName").trim().optional(),
  ];
};

const userLoginValidator = () => {
  return [
    body("email")
      .optional()
      .isEmail()
      .withMessage("Email is invalid")
      .notEmpty()
      .withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

export { userRegisterValidator, userLoginValidator };
