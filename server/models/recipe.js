const { Schema, model, Types } = require("mongoose");

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    cookingTime: {
      type: Schema.Types.Mixed,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Recipe", recipeSchema);
