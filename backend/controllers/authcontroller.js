const jwt = require("jsonwebtoken");
const { User, Admin, Collector } = require("../models");

exports.register = async (req, res) => {
  try {
    const {
      name,
      username,
      password,
      email,
      phone,
      address
    } = req.body;

    const user = await User.create({
      FullName: name,
      Username: username,
      Password: password,
      Email: email,
      Phone: phone,
      Address: address,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    console.error("Register Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { username, password, role, securityCode } = req.body;

    let user = null;
    let payload = {};

    if (role === "user") {
      user = await User.findOne({
        where: { Username: username },
      });

      if (!user)
        return res.status(404).json({ message: "User not found" });

      if (user.Password !== password)
        return res.status(401).json({ message: "Invalid password" });

      payload = {
  UserID: user.UserID,
  id: user.UserID,
  role: "user",
  username: user.Username,
};
    }

    else if (role === "collector") {
      user = await Collector.findOne({
        where: { CollectorCode: username },
      });

      if (!user)
        return res.status(404).json({ message: "Collector not found" });

      if (user.Password !== password)
        return res.status(401).json({ message: "Invalid password" });

      payload = {
        id: user.CollectorID,
        role: "collector",
        username: user.CollectorCode,
      };
    }

    else if (role === "admin") {
      user = await Admin.findOne({
        where: { AdminUsername: username },
      });

      if (!user)
        return res.status(404).json({ message: "Admin not found" });

      if (user.Password !== password)
        return res.status(401).json({ message: "Invalid password" });

      if (user.SecurityCode !== securityCode)
        return res.status(401).json({ message: "Invalid security code" });

      payload = {
        id: user.AdminID,
        role: "admin",
        username: user.AdminUsername,
      };
    }

    else {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: payload,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};