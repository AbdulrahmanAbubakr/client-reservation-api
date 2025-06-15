const express = require("express");
const router = express.Router();
const { createPaymentIntent } = require("../controllers/PaymentController");

router.post("/payment-intent/:id", createPaymentIntent);

module.exports = router;
