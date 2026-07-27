const express = require("express");
const router = express.Router();

const {
  login,
  getAllCollectors,
  getCollectorById,
  createCollector,
  updateCollector,
  deleteCollector,
} = require("../controllers/collectorController");

router.post("/login", login);

router.get("/", getAllCollectors);
router.get("/:id", getCollectorById);
router.post("/", createCollector);
router.put("/:id", updateCollector);
router.delete("/:id", deleteCollector);

module.exports = router;