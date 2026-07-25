const express = require("express");
const router = express.Router();

const {
  User,
  Collector,
  PickupRequest,
  PickupAssignment,
  WasteCategory,
} = require("../models");

const {
  verifyToken,
  checkRole,
} = require("../middleware/auth");

/* ==========================
   Dashboard Statistics
========================== */
router.get(
  "/stats",
  verifyToken,
  checkRole("admin"),
  async (req, res) => {
    try {
      const totalUsers = await User.count();
      const totalCollectors = await Collector.count();
      const totalRequests = await PickupRequest.count();

      const pendingRequests = await PickupRequest.count({
        where: { Status: "Pending" },
      });

      const assignedRequests = await PickupRequest.count({
        where: { Status: "Assigned" },
      });

      const completedRequests = await PickupRequest.count({
        where: { Status: "Completed" },
      });

      res.json({
        totalUsers,
        totalCollectors,
        totalRequests,
        pendingRequests,
        assignedRequests,
        completedRequests,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

/* ==========================
   Get All Users
========================== */
router.get(
  "/users",
  verifyToken,
  checkRole("admin"),
  async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: {
          exclude: ["Password"],
        },
      });

      res.json(users);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

/* ==========================
   Get All Collectors
========================== */
router.get(
  "/collectors",
  verifyToken,
  checkRole("admin"),
  async (req, res) => {
    try {
      const collectors = await Collector.findAll({
        attributes: {
          exclude: ["Password"],
        },
      });

      res.json(collectors);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

/* ==========================
   Get Waste Categories
========================== */
router.get(
  "/categories",
  verifyToken,
  checkRole("admin"),
  async (req, res) => {
    try {
      const categories = await WasteCategory.findAll();

      res.json(categories);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

/* ==========================
   Add Waste Category
========================== */
router.post(
  "/categories",
  verifyToken,
  checkRole("admin"),
  async (req, res) => {
    try {
      const { CategoryName, Description } = req.body;

      const category = await WasteCategory.create({
        CategoryName,
        Description,
      });

      res.status(201).json({
        message: "Category added successfully.",
        category,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

/* ==========================
   View Pickup Requests
========================== */
router.get(
  "/requests",
  verifyToken,
  checkRole("admin"),
  async (req, res) => {
    try {
      const requests = await PickupRequest.findAll({
        include: [
          {
            model: User,
            attributes: ["UserID", "FullName", "Phone"],
          },
          {
            model: WasteCategory,
            attributes: ["CategoryID", "CategoryName"],
          },
        ],
        order: [["RequestDate", "DESC"]],
      });

      res.json(requests);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

/* ==========================
   Assign Collector
========================== */
router.post(
  "/assign",
  verifyToken,
  checkRole("admin"),
  async (req, res) => {
    try {
      const { RequestID, CollectorID } = req.body;

      const request = await PickupRequest.findByPk(RequestID);

      if (!request) {
        return res.status(404).json({
          message: "Pickup request not found.",
        });
      }

      const collector = await Collector.findByPk(CollectorID);

      if (!collector) {
        return res.status(404).json({
          message: "Collector not found.",
        });
      }

      await PickupAssignment.create({
        RequestID,
        CollectorID,
      });

      await PickupRequest.update(
        {
          Status: "Assigned",
        },
        {
          where: {
            RequestID,
          },
        }
      );

      res.json({
        message: "Collector assigned successfully.",
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

/* ==========================
   Daily Reports
========================== */
router.get(
  "/reports",
  verifyToken,
  checkRole("admin"),
  async (req, res) => {
    try {
      const reports = await PickupRequest.findAll({
        include: [
          User,
          WasteCategory,
        ],
        order: [["PickupDate", "DESC"]],
      });

      res.json(reports);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

module.exports = router;