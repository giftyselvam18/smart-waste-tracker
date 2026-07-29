const express = require("express");
const router = express.Router();

const {
  getUserDashboardStats
} = require("../controllers/dashboardController");


router.get("/stats", getUserDashboardStats);


module.exports = router;