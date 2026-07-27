const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Admin = require("../models/Admin");
const Collector = require("../models/Collector");

/* =====================================
   USER REGISTER
===================================== */

router.post("/register", async (req, res) => {
  try {
    const { name, username, email, password, phone, address } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({
        message: "Name, Username, Email and Password are required.",
      });
    }

    const existingUsername = await User.findOne({
      where: { Username: username },
    });

    if (existingUsername) {
      return res.status(409).json({
        message: "Username already exists.",
      });
    }

    const existingEmail = await User.findOne({
      where: { Email: email },
    });

    if (existingEmail) {
      return res.status(409).json({
        message: "Email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      FullName: name,
      Username: username,
      Email: email,
      Password: hashedPassword,
      Phone: phone,
      Address: address,
    });

    return res.status(201).json({
      success: true,
      message: "Registration Successful",
      userId: user.UserID,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
/* ==========================
   User Login
========================== */
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and Password are required.",
      });
    }

    const user = await User.findOne({
      where: { Username: username },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const match = await bcrypt.compare(password, user.Password);

    if (!match) {
      return res.status(401).json({
        message: "Invalid password.",
      });
    }

    const token = jwt.sign(
      {
        id: user.UserID,
        role: "user",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      role: "user",
      userId: user.UserID,
      fullName: user.FullName,
      username: user.Username,
      email: user.Email,
      phone: user.Phone,
      address: user.Address,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
/* ==========================
   Collector Login
========================== */
router.post("/collector/login", async (req, res) => {
  try {
    const { collectorCode, password } = req.body;

    if (!collectorCode || !password) {
      return res.status(400).json({
        message: "Collector Code and Password are required.",
      });
    }

    const collector = await Collector.findOne({
      where: {
        CollectorCode: collectorCode,
      },
    });

    if (!collector) {
      return res.status(404).json({
        message: "Collector not found.",
      });
    }

    // Plain password check
    if (collector.Password !== password) {
      return res.status(401).json({
        message: "Invalid password.",
      });
    }

    const token = jwt.sign(
      {
        id: collector.CollectorID,
        role: "collector",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Collector Login Successful",
      token,
      role: "collector",
      collectorId: collector.CollectorID,
      collectorName: collector.CollectorName,
      collectorCode: collector.CollectorCode,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
/* ==========================
   Admin Login
========================== */
router.post("/admin/login", async (req, res) => {
  try {
    const { username, password, securityCode } = req.body;

    const admin = await Admin.findOne({
      where: {
        AdminUsername: username,
      },
    });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found.",
      });
    }

    if (admin.Password !== password) {
      return res.status(401).json({
        message: "Invalid password.",
      });
    }

    if (admin.SecurityCode !== securityCode) {
      return res.status(401).json({
        message: "Invalid security code.",
      });
    }

    const token = jwt.sign(
      {
        id: admin.AdminID,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      message: "Admin Login Successful",
      token,
      role: "admin",
      adminId: admin.AdminID,
      username: admin.AdminUsername,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
module.exports = router;