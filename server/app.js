const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/recipe");
const app = express();

const DB_URI = process.env.DB_URL;
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/users", authRoutes);
app.use("/api", recipeRoutes);

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("DB connection failed", error);
  });
