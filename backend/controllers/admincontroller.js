const jwt = require("jsonwebtoken");
const { Admin } = require("../models");

// Admin Login
exports.login = async (req, res) => {
  try {
    const AdminUsername =
  req.body.AdminUsername || req.body.username;

const Password =
  req.body.Password || req.body.password;

const SecurityCode =
  req.body.SecurityCode || req.body.securityCode;

    const admin = await Admin.findOne({
      where: { AdminUsername },
    });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    if (admin.Password !== Password) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    if (admin.SecurityCode !== SecurityCode) {
      return res.status(401).json({
        message: "Invalid security code",
      });
    }

    const token = jwt.sign(
      {
        AdminID: admin.AdminID,
        AdminUsername: admin.AdminUsername,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({
      message: "Admin login successful",
      token,
      admin,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();

    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Admin By ID
exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Admin
exports.updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    await admin.update(req.body);

    res.status(200).json({
      message: "Admin updated successfully",
      admin,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Admin
exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    await admin.destroy();

    res.status(200).json({
      message: "Admin deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};