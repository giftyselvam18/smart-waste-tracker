const jwt = require("jsonwebtoken");
const { Collector } = require("../models");

// Collector Login
exports.login = async (req, res) => {
  try {
    const CollectorCode =
  req.body.CollectorCode || req.body.username;

const Password =
  req.body.Password || req.body.password;

    const collector = await Collector.findOne({
      where: { CollectorCode },
    });

    if (!collector) {
      return res.status(404).json({
        message: "Collector not found",
      });
    }

    if (collector.Password !== Password) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        CollectorID: collector.CollectorID,
        CollectorCode: collector.CollectorCode,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({
      message: "Collector login successful",
      token,
      collector,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Collectors
exports.getAllCollectors = async (req, res) => {
  try {
    const collectors = await Collector.findAll();
    res.status(200).json(collectors);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Collector By ID
exports.getCollectorById = async (req, res) => {
  try {
    const collector = await Collector.findByPk(req.params.id);

    if (!collector) {
      return res.status(404).json({
        message: "Collector not found",
      });
    }

    res.status(200).json(collector);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create Collector
exports.createCollector = async (req, res) => {
  try {
    const collector = await Collector.create(req.body);

    res.status(201).json({
      message: "Collector created successfully",
      collector,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Collector
exports.updateCollector = async (req, res) => {
  try {
    const collector = await Collector.findByPk(req.params.id);

    if (!collector) {
      return res.status(404).json({
        message: "Collector not found",
      });
    }

    await collector.update(req.body);

    res.status(200).json({
      message: "Collector updated successfully",
      collector,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Collector
exports.deleteCollector = async (req, res) => {
  try {
    const collector = await Collector.findByPk(req.params.id);

    if (!collector) {
      return res.status(404).json({
        message: "Collector not found",
      });
    }

    await collector.destroy();

    res.status(200).json({
      message: "Collector deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};