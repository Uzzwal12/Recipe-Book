const { body } = require("express-validator");

exports.recipeValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("ingredients")
    .isString()
    .notEmpty()
    .withMessage("Ingredients must be a comma-separated string"),
  body("instructions").notEmpty().withMessage("Instructions are required"),
  body("cookingTime").notEmpty().withMessage("Cooking time is required"),
];
