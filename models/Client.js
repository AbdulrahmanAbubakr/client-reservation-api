const mongoose = require("mongoose");
const clientSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Full name must be at least 2 characters long"],
      maxlength: [100, "Full name cannot exceed 100 characters"],
    },
    civilId: {
      type: String,
      required: [true, "Civil ID is required"],
      validate: {
        validator: function (validation) {
          return validation && validation.toString().length === 14;
        },
        message: "Civil ID must be 14 digits",
      },
      unique: true,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      minlength: [2, "Company name must be at least 2 characters long"],
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      validate: {
        validator: function (validator) {
          return validator && /^\d{8,15}$/.test(validator.toString());
        },
        message: "Phone number must be between 8-15 digits",
      },
    },
    socialMedia: {
      type: String,
      required: [true, "Social media platform is required"],
    },
    agreedToTerms: {
      type: Boolean,
      required: true,
      get: function (value) {
        return value ? "Agreed" : "Not Agreed";
      },
      validate: {
        validator: function (value) {
          return value === true;
        },
        message: "You must agree with Terms & Conditions",
      },
    },
    agreedToPrivacy: {
      type: Boolean,
      required: true,
      get: function (value) {
        return value ? "Agreed" : "Not Agreed";
      },
      validate: {
        validator: function (value) {
          return value === true;
        },
        message: "You must agree to the Privacy & Policy",
      },
    },
    signature: {
      type: String,
      required: [true, "Signature is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
