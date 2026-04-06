const express = require("express");
const router = express.Router();
const admin = require("../controllers/admin.controller.js");

router.post("/slot", admin.registerSlot);
router.get("/slot", admin.getParkingSlots);

module.exports = router;
