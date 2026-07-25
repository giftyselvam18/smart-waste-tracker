const express = require("express");
const router = express.Router();

const {
  PickupRequest,
  PickupAssignment,
  User,
  WasteCategory,
} = require("../models");

const {
  verifyToken,
  checkRole,
} = require("../middleware/auth");

/* ==========================
   My Assigned Requests
========================== */
router.get(
  "/my-requests",
  verifyToken,
  checkRole("collector"),
  async (req, res) => {
    try {

      const assignments = await PickupAssignment.findAll({
        where: {
          CollectorID: req.user.id,
        },
        include: [
          {
            model: PickupRequest,
            include: [
              {
                model: User,
                attributes: ["UserID", "FullName", "Phone", "Address"],
              },
              {
                model: WasteCategory,
                attributes: ["CategoryID", "CategoryName"],
              },
            ],
          },
        ],
      });

      res.json(assignments);

    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

/* ==========================
   Update Pickup Status
========================== */
router.put(
  "/request/:id/status",
  verifyToken,
  checkRole("collector"),
  async (req, res) => {
    try {

      const { Status } = req.body;

      await PickupRequest.update(
        { Status },
        {
          where: {
            RequestID: req.params.id,
          },
        }
      );

      res.json({
        message: "Status updated successfully.",
      });

    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

/* ==========================
   Complete Pickup
========================== */
router.put(
  "/request/:id/complete",
  verifyToken,
  checkRole("collector"),
  async (req, res) => {
    try {

      await PickupRequest.update(
        {
          Status: "Completed",
        },
        {
          where: {
            RequestID: req.params.id,
          },
        }
      );

      res.json({
        message: "Pickup completed successfully.",
      });

    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

/* ==========================
   Collection History
========================== */
router.get(
  "/history",
  verifyToken,
  checkRole("collector"),
  async (req, res) => {
    try {

      const assignments = await PickupAssignment.findAll({
        where: {
          CollectorID: req.user.id,
        },
        include: [
          {
            model: PickupRequest,
            where: {
              Status: "Completed",
            },
          },
        ],
      });

      res.json(assignments);

    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

/* ==========================
   Collector Dashboard
========================== */
router.get(
  "/dashboard",
  verifyToken,
  checkRole("collector"),
  async (req, res) => {
    try {

      const assignments = await PickupAssignment.findAll({
        where: {
          CollectorID: req.user.id,
        },
        include: [
          {
            model: PickupRequest,
          },
        ],
      });

      const total = assignments.length;

      const pending = assignments.filter(
        (a) => a.PickupRequest.Status === "Pending"
      ).length;

      const assigned = assignments.filter(
        (a) => a.PickupRequest.Status === "Assigned"
      ).length;

      const completed = assignments.filter(
        (a) => a.PickupRequest.Status === "Completed"
      ).length;

      res.json({
        totalAssigned: total,
        pending,
        assigned,
        completed,
      });

    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

module.exports = router;