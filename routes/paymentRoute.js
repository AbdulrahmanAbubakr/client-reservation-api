const express = require("express");
const router = express.Router();
const { createCheckout } = require("../controllers/PaymentController");

router.post("/checkout", createCheckout);

module.exports = router;
