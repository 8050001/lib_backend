import { body } from "express-validator";

export const registerValidation = [
  body("email", "Invalid mail format").isEmail(),
  body("password", "The password must be at least 5 characters long").isLength({
    min: 5,
  }),
  body("fullName", "Enter a name").isLength({ min: 3 }),
  body("avatarUrl", "Invalid avatar link").optional().isURL(),
];

export const loginValidation = [
  body("email", "Invalid mail format").isEmail(),
  body("password", "The password must be at least 5 characters long").isLength({
    min: 5,
  }),
];
