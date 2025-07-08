const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createRecipe,
  getAllRecipes,
  getSingleRecipe,
  getUserRecipes,
  deleteRecipe,
  updateRecipe,
} = require("../controllers/recipeController");
const { recipeValidator } = require("../middleware/validators/recipeValidator");
const handleValidation = require("../middleware/validators/handleValidation");
const recipeRouter = express.Router();

recipeRouter.post(
  "/recipes",
  authMiddleware,
  recipeValidator,
  handleValidation,
  createRecipe
);
recipeRouter.get("/recipes", getAllRecipes);
recipeRouter.get("/recipes/:id", getSingleRecipe);
recipeRouter.get("/users/my-recipes", authMiddleware, getUserRecipes);
recipeRouter.put("/recipes/:id", authMiddleware, recipeValidator, updateRecipe);
recipeRouter.delete("/recipes/:id", authMiddleware, deleteRecipe);

module.exports = recipeRouter;
