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
<<<<<<< HEAD
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



=======
router.post("/assign", pickupController.assignCollector);
router.get("/assign", pickupController.getAllAssignments);
router.get("/assign/:id", pickupController.getAssignmentById);
router.delete("/assign/:id", pickupController.deleteAssignment);
router.put("/start/:id", pickupController.startPickup);
router.put(
  "/complete/:id",
  pickupController.completePickup
);
router.get(
 "/today-collection",
 pickupController.getTodayCollection
);
exports.getTodayCollection = async (req, res) => {
  try {
>>>>>>> 693b0d7 (Added today collection and collector profile features)

    const today = new Date().toISOString().split("T")[0];

    const collections = await PickupRequest.findAll({
      where: {
        Status: "Completed",
        PickupDate: today
      }
    });

    res.status(200).json({
      totalCollection: collections.length,
      collections
    });

  } catch(error) {

    res.status(500).json({
      message: error.message
    });

  }
};
module.exports = router;