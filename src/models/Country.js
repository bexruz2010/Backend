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
    description: {
      type: String,
      default: "",
    },
    tourTypes: {
      type: [String], // Adventure, Relax, Family, etc.
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
    discount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0, // 1-5 ball
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    mainImage: {
      type: String,
      required: true,
    },
    gallery: {
      type: [String],
      default: [],
    },
    durationDays: {
      type: Number,
      default: 1,
    },
    bestSeason: {
      type: String,
      default: "", // Spring, Summer, etc.
    },
    tourOptions: [
      {
        transport: {
          type: String,
          enum: ["Bus", "Plane", "Ship"],
          required: true,
        },
        mealPlan: {
          type: String,
          enum: ["Breakfast only", "Half board", "Full board"],
          default: "Breakfast only",
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
  },
  { timestamps: true }
);

// Indexlar tez qidirish uchun
countrySchema.index({ continent: 1 });
countrySchema.index({ price: 1 });
countrySchema.index({ tourTypes: 1 });

module.exports = mongoose.model("Country", countrySchema);
