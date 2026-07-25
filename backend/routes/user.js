const express = require("express");
const router = express.Router();

const {
  PickupRequest,
  Notification,
  Feedback,
} = require("../models");

const {
  verifyToken,
  checkRole,
} = require("../middleware/auth");

/* ==========================
   Create Pickup Request
========================== */
router.post(
  "/pickup-request",
  verifyToken,
  checkRole("user"),
  async (req, res) => {
    try {
      const {
        CategoryID,
        PickupAddress,
        PickupDate,
        Description,
      } = req.body;

      const request = await PickupRequest.create({
        UserID: req.user.id,
        CategoryID,
        PickupAddress,
        PickupDate,
        Description,
        Status: "Pending",
      });

      res.status(201).json({
        message: "Pickup request created successfully.",
        request,
      });

    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

/* ==========================
   My Pickup Requests
========================== */
router.get(
  "/my-requests",
  verifyToken,
  checkRole("user"),
  async (req, res) => {
    try {

      const requests = await PickupRequest.findAll({
        where: {
          UserID: req.user.id,
        },
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
   Pickup History
========================== */
router.get(
  "/history",
  verifyToken,
  checkRole("user"),
  async (req, res) => {
    try {

      const history = await PickupRequest.findAll({
        where: {
          UserID: req.user.id,
          Status: "Completed",
        },
      });

      res.json(history);

    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

/* ==========================
   Update Pickup Request
========================== */
router.put(
  "/pickup-request/:id",
  verifyToken,
  checkRole("user"),
  async (req, res) => {
    try {

      const {
        PickupAddress,
        PickupDate,
        Description,
        CategoryID,
      } = req.body;

      await PickupRequest.update(
        {
          PickupAddress,
          PickupDate,
          Description,
          CategoryID,
        },
        {
          where: {
            RequestID: req.params.id,
            UserID: req.user.id,
          },
        }
      );

      res.json({
        message: "Pickup request updated successfully.",
      });

    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

/* ==========================
   Submit Feedback
========================== */
router.post(
  "/feedback",
  verifyToken,
  checkRole("user"),
  async (req, res) => {
    try {

      const {
        RequestID,
        Rating,
        Comments,
      } = req.body;

      const feedback = await Feedback.create({
        RequestID,
        UserID: req.user.id,
        Rating,
        Comments,
      });

      res.status(201).json({
        message: "Feedback submitted successfully.",
        feedback,
      });

    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

/* ==========================
   Notifications
========================== */
router.get(
  "/notifications",
  verifyToken,
  checkRole("user"),
  async (req, res) => {
    try {

      const notifications = await Notification.findAll({
        where: {
          UserID: req.user.id,
        },
        order: [["CreatedAt", "DESC"]],
      });

      res.json(notifications);

    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

/* ==========================
   Dashboard Summary
========================== */
router.get(
  "/dashboard-summary",
  verifyToken,
  checkRole("user"),
  async (req, res) => {
    try {

      const requests = await PickupRequest.findAll({
        where: {
          UserID: req.user.id,
        },
      });

      res.json({
        total: requests.length,
        pending: requests.filter(r => r.Status === "Pending").length,
        assigned: requests.filter(r => r.Status === "Assigned").length,
        completed: requests.filter(r => r.Status === "Completed").length,
      });

    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

module.exports = router;