import mongoose from "mongoose";

const countrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    continent: {
      type: String,
      required: true,
      enum: ["Asia", "Europe", "Africa", "America", "Australia"],
    },

    tourTypes: [
      {
        type: String,
        enum: ["Travel", "Umrah", "Hajj", "Study", "Work"],
      },
    ],

    availableCountries: [
      {
        type: String,
      },
    ],

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String, // image URL
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Country", countrySchema);
