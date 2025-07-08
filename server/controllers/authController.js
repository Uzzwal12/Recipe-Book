const User = require("../models/user");
const { registerService, loginService } = require("../services/authService");

async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    const user = await registerService({ username, email, password });
    res.status(201).json({
      user,
    });
  } catch (error) {
    console.log("Error in registering user", error);
    res.status(error.statusCode || 500).json({
      message: error.message || "Something went wrong",
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const token = await loginService({ email, password });
    res.status(200).send(token);
  } catch (error) {
    console.log("Error in login", error);
    res.status(error.statusCode || 500).json({
      message: error.message || "Something went wrong",
    });
  }
}

module.exports = { register, login };
