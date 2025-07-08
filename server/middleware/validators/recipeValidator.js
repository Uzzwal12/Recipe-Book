const { body } = require("express-validator");

exports.recipeValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("ingredients")
    .isArray({ min: 2 })
    .withMessage("Ingredients must be an array"),
  body("instructions").notEmpty().withMessage("Instructions are required"),
  body("cookingTime").notEmpty().withMessage("Cooking time is required"),
];
