const recipeService = require("../services/recipeService");

async function createRecipe(req, res) {
  try {
    const data = {
      ...req.body,
      ingredients: req.body.ingredients.split(",").map((i) => i.trim()),
      imageUrl: req.file ? `/upload/${req.file.filename}` : "",
      createdBy: req.user.id,
    };
    const recipe = await recipeService.createRecipe(data);
    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).json({ message: "Failed to create recipe" });
  }
}

async function getAllRecipes(req, res) {
  try {
    const { search, ingredient, maxTime, page, limit } = req.query;

    const { recipes, total, totalPages } = await recipeService.getAllRecipes({
      page,
      limit,
      search,
      ingredient,
      maxTime,
    });
    res.json({
      page,
      limit,
      total,
      recipes,
      totalPages,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch recipes" });
  }
}

async function getSingleRecipe(req, res) {
  try {
    const recipe = await recipeService.getRecipeById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch recipe" });
  }
}

async function getUserRecipes(req, res) {
  try {
    const { page, limit } = req.query;
    const { recipes, total, totalPages } = await recipeService.getRecipesByUser(
      {
        userId: req.user.id,
        page,
        limit,
      }
    );
    res.json({ recipes, total, totalPages });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user recipes" });
  }
}

async function updateRecipe(req, res) {
  try {
    const recipe = await recipeService.getRecipeById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.createdBy.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this recipe" });
    }
    console.log(req.body);
    const data = {
      ...req.body,
      ingredients: req.body.ingredients
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
    };

    // Only update image if new file uploaded
    if (req.file) {
      data.imageUrl = `/upload/${req.file.filename}`;
    }

    const updated = await recipeService.updateRecipe(req.params.id, data);
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update recipe" });
  }
}

async function deleteRecipe(req, res) {
  try {
    const recipe = await recipeService.getRecipeById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.createdBy.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this recipe" });
    }

    await recipeService.deleteRecipe(req.params.id);
    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete recipe" });
  }
}

module.exports = {
  createRecipe,
  getAllRecipes,
  getUserRecipes,
  getSingleRecipe,
  deleteRecipe,
  updateRecipe,
};
