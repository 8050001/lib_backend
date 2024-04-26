import { body } from "express-validator";

export const postCreateValidation = [
  body("title", "Enter title of the post").isLength({ min: 3 }).isString(),
  body("text", "Enter text of the post")
    .isLength({
      min: 3,
    })
    .isString(),
  body("tags", "Invalid tag format").optional().isString(),
  body("imageUrl", "Invalid image link").optional().isString(),
];
