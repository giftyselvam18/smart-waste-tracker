const express = require("express");
const router = express.Router();

const {
  createNotification,
  getAllNotifications,
  getNotificationById,
  getUserNotifications,
  markAsRead,
  deleteNotification,
} = require("../controllers/notificationController");

router.post("/", createNotification);

router.get("/", getAllNotifications);
router.get("/:id", getNotificationById);
router.get("/user/:userId", getUserNotifications);

router.put("/:id/read", markAsRead);

router.delete("/:id", deleteNotification);

module.exports = router;