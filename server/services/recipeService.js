const Recipe = require("../models/recipe");

async function createRecipe(data) {
  try {
    return await Recipe.create(data);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllRecipes({
  page = 1,
  limit = 10,
  search,
  ingredient,
  maxTime,
}) {
  try {
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (ingredient) {
      filter.ingredients = { $in: [ingredient] };
    }

    if (maxTime && !isNaN(parseInt(maxTime))) {
      filter.cookingTime = { $lte: parseInt(maxTime) };
    }

    const skip = (page - 1) * limit;

    const recipes = await Recipe.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Recipe.countDocuments(filter);

    return { recipes, total };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getRecipeById(id) {
  try {
    return await Recipe.findById(id);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getRecipesByUser(userId) {
  try {
    const recipes = await Recipe.find({
      createdBy: userId,
    }).sort({
      createdAt: -1,
    });
    console.log(recipes);
    return recipes;
  } catch (error) {}
  throw new Error(error.message);
}

async function updateRecipe(id, data) {
  try {
    return await Recipe.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteRecipe(id) {
  try {
    return await Recipe.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  getRecipesByUser,
  updateRecipe,
  deleteRecipe,
};
