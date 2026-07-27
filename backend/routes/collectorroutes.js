const express = require("express");
const router = express.Router();
const {
  login,
  getAllCollectors,
  getCollectorById,
  createCollector,
  updateCollector,
  deleteCollector,
  getAssignedPickups,
  startPickup
} = require("../controllers/collectorController");
// =========================
// Collector Login
// =========================
router.post("/login", login);

// =========================
// Assigned Pickups
// =========================
router.get("/pickups/:collectorId", getAssignedPickups);

// =========================
// Start Pickup
// =========================
router.put("/startPickup/:requestId", startPickup);

// =========================
// Get All Collectors
// =========================
router.get("/", getAllCollectors);

// =========================
// Get Collector By ID
// =========================
router.get("/:id", getCollectorById);

// =========================
// Create Collector
// =========================
router.post("/", createCollector);

// =========================
// Update Collector
// =========================
router.put("/:id", updateCollector);

// =========================
// Delete Collector
// =========================
module.exports = router;