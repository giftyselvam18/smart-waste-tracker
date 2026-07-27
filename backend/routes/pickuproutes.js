const express = require("express");
const router = express.Router();

const pickupController = require("../controllers/pickupController");


// =========================
// Pickup Request
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
// Pickup Assignment
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
// Complete Pickup
// =========================

router.put(
  "/complete",
  pickupController.completePickup
);






// =========================
// Collector Dashboard
// =========================


router.get(
  "/collector/:id",
  pickupController.getCollectorRequests
);




module.exports = router;