const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.register = async (req, res) => {
  try {
    const { FullName, Username, Password, Email } = req.body;

    const user = await User.create({
      FullName,
      Username,
      Password,
      Email,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { Username, Password } = req.body;

    const user = await User.findOne({
      where: { Username },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.Password !== Password) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        UserID: user.UserID,
        Username: user.Username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};