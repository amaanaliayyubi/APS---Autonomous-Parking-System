const express = require("express");
const router = express.Router();
const gateController = require("../controllers/gate.controller.js");

router.post("/entry", gateController.vehicleEnter);
router.post("/exit", gateController.vehicleExit);
router.post("/payment", gateController.makePayment);

module.exports = router;
