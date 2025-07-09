const Recipe = require("../models/recipe");

async function createRecipe(data) {
  try {
    const {
      title,
      ingredients,
      instructions,
      cookingTime,
      imageUrl,
      createdBy,
    } = data;
    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      cookingTime,
      createdBy,
      imageUrl,
    });
    await newRecipe.save();
    return newRecipe;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

async function getAllRecipes({ page, limit, search, ingredient, maxTime }) {
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
    const totalPages = Math.ceil(total / limit);
    return { recipes, total, totalPages };
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
async function getRecipesByUser({ userId, page, limit }) {
  try {
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { createdBy: userId };

    const recipes = await Recipe.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Recipe.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    return { recipes, totalPages, total, currentPage: page };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateRecipe(id, data) {
  console.log(id, data);
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
