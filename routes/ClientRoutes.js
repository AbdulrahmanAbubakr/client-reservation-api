const express = require("express");
const router = express.Router();

const {
  createClient,
  getClientById,
} = require("../controllers/ClientController");
const validateType = require("../middlewares/validateType");

router.post("/:type", validateType, createClient);
router.get("/client/:id", getClientById);

module.exports = router;
