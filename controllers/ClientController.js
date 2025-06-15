const Client = require("../models/Client");
const sendClientEmail = require("../utils/sendClientEmail");
const createClient = async (req, res) => {
  try {
    // getting router type logic
    const { devType } = req;
    const formData = req.body;
    console.log(`Handling submission for: ${devType}`, formData);

    // creating client logic
    const clientData = req.body;
    const newClient = await Client.create(clientData);
    // console.log(newClient);

    //Send email
    await sendClientEmail(clientData);
    res.status(201).json({
      success: true,
      message: "Client is created successfully",
      data: newClient,
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = {};

      // Extract specific validation error messages
      Object.keys(error.errors).forEach((key) => {
        validationErrors[key] = error.errors[key].message;
      });
      console.log(error);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    // Handle duplicate key error (unique constraint violation)
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: "Duplicate entry",
        error: `${duplicateField} already exists`,
      });
    }

    console.error("Error creating client:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: "Something went wrong while creating the client",
    });
  }
};

const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Fetching client with ID:", id);

    const client = await Client.findById(id);
    if (!client) {
      return res.status(400).json({ message: "Client is not found" });
    }
    res.status(200).json(client);
  } catch (error) {
    console.log("Error in fetching client", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createClient, getClientById };
