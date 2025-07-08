const express = require("express");
const { register, login } = require("../controllers/authController");
const handleValidation = require("../middleware/validators/handleValidation");
const {
  registerValidation,
  loginValidation,
} = require("../middleware/validators/authValidator");

const authRouter = express.Router();

authRouter.post("/register", registerValidation, handleValidation, register);
authRouter.post("/login", loginValidation, handleValidation, login);

module.exports = authRouter;
