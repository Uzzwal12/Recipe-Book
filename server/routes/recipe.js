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
const upload = require("../middleware/upload");
const recipeRouter = express.Router();

recipeRouter.post(
  "/recipes",
  authMiddleware,
  upload.single("image"),
  recipeValidator,
  handleValidation,
  createRecipe
);
recipeRouter.get("/recipes", getAllRecipes);
recipeRouter.get("/recipes/:id", getSingleRecipe);
recipeRouter.get("/users/my-recipes", authMiddleware, getUserRecipes);
recipeRouter.put(
  "/recipes/:id",
  authMiddleware,
  upload.single("image"),
  recipeValidator,
  updateRecipe
);
recipeRouter.delete("/recipes/:id", authMiddleware, deleteRecipe);

module.exports = recipeRouter;
