const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const JWT_SECRET = process.env.JWT_SECRET || "your_secret";

async function registerService({ username, email, password }) {
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw { statusCode: 400, message: "User already exists" };
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();

    return newUser;
  } catch (error) {
    if (error.statusCode) throw error;
    console.error("Error in register:", error);
    throw {
      statusCode: 500,
      message: "Something went wrong while registering user.",
    };
  }
}

async function loginService({ email, password }) {
  try {
    const user = await User.findOne({ email });
    if (!user)
      throw {
        statusCode: 400,
        message: "Invalid Email user not found with this email",
      };
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      throw {
        statusCode: 400,
        message: "Invalid password",
      };

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return {
      message: "Login Successful",
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
  } catch (error) {
    if (error.statusCode) throw error;
    console.error("Error in login:", error);
    throw {
      statusCode: 500,
      message: "Something went wrong while login user.",
    };
  }
}

module.exports = { registerService, loginService };
