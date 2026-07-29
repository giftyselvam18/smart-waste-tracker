const express = require("express");
const router = express.Router();

const pickupController = require("../controllers/pickupController");


// =========================
// Pickup Request Routes
// =========================

router.post(
  "/request",
  pickupController.createPickupRequest
);


router.get(
  "/request",
  pickupController.getAllPickupRequests
);


router.get(
  "/request/:id",
  pickupController.getPickupRequestById
);


router.put(
  "/request/:id",
  pickupController.updatePickupRequest
);


router.delete(
  "/request/:id",
  pickupController.deletePickupRequest
);



// =========================
// User Track Status Routes
// =========================

router.get(
  "/user/:id",
  pickupController.getUserPickups
);



// =========================
// Pickup Assignment Routes
// =========================

router.post(
  "/assign",
  pickupController.assignCollector
);


router.get(
  "/assign",
  pickupController.getAllAssignments
);


router.get(
  "/assign/:id",
  pickupController.getAssignmentById
);


router.delete(
  "/assign/:id",
  pickupController.deleteAssignment
);



// =========================
// Collector Dashboard Routes
// =========================

router.get(
  "/collector/:id",
  pickupController.getCollectorRequests
);



// =========================
// Collector Pickup Actions
// =========================

// Start Pickup
router.put(
  "/start/:RequestID",
  pickupController.startPickup
);


// Complete Pickup
router.put(
  "/complete/:id",
  pickupController.completePickup
);



// =========================
// Today's Collection
// =========================

router.get(
  "/today-collection",
  pickupController.getTodayCollection
);



module.exports = router;