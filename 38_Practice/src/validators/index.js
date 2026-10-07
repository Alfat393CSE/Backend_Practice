import { body } from "express-validator";

const userRegisterValidator = () => {
  return [
    body("username")
      .trim()
      .isEmpty()
      .withMessage("username is required")
      .isLowercase()
      .withMessage("username must be in lowercase")
      .isLength({ min: 3 })
      .withMessage("username must be at least 3 characters"),

    body("email")
      .trim()
      .isEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("email is invalid"),

    body("password")
      .trim()
      .isEmpty()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("password must be at least 8 characters"),

    body("fullName").optional().trim(),
  ];
};

export { userRegisterValidator };
