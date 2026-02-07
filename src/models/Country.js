const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    continent: {
      type: String,
      required: true,
    },

    tourTypes: {
      type: [String],
      default: [],
    },

    availableCountries: {
      type: [String],
      default: [],
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Country", countrySchema);
