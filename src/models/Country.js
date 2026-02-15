// models/country.js
const mongoose = require("mongoose");

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove non-word chars
    .replace(/\s+/g, "-") // spaces to dashes
    .replace(/-+/g, "-");

const tourOptionSchema = new mongoose.Schema(
  {
    transport: {
      type: String,
      enum: ["Bus", "Plane", "Ship", "Train", "Car"],
    },
    mealPlan: {
      type: String,
      enum: ["Breakfast only", "Half board", "Full board", "All inclusive"],
      default: "Breakfast only",
    },
    price: {
      type: Number,
      min: 0,
    },
    extraServices: {
      type: [String],
      default: [],
    },
  },
  { _id: false } // option subdocs need not have their own _id
);

const countrySchema = new mongoose.Schema(
  {
    // Asosiy ma'lumotlar
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    continent: {
      type: String,
      required: true,
      enum: ["Asia", "Europe", "Africa", "North America", "South America", "Oceania", "Antarctica"],
    },
    countryCode: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },

    // Tur turlari va teglari
    tourTypes: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },

    // Narx va chegirma
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    currency: {
      type: String,
      default: "USD",
    },

    // Reyting
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },

    // Media
    mainImage: {
      type: String,
      required: true,
    },
    gallery: {
      type: [String],
      default: [],
    },
    video: {
      type: String,
      default: "",
    },

    // Davomiylik va ob-havo
    durationDays: {
      type: Number,
      default: 1,
      min: 1,
    },
    bestSeason: {
      type: String,
      default: "",
    },
    climate: {
      type: String,
      default: "",
    },

    // Opsiyalar (ixtiyoriy)
    tourOptions: {
      type: [tourOptionSchema],
      default: [],
    },

    // Holat
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },

    // Lokatsiya (GeoJSON point)
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        // don't set a default so we can detect missing location easily
      },
      address: { type: String, default: "" },
      city: { type: String, default: "" },
      country: { type: String, default: "" },
    },

    // Reflar
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

    // SEO
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    metaKeywords: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Indekslar (tez qidiruv uchun)
countrySchema.index({ continent: 1 });
countrySchema.index({ price: 1 });
countrySchema.index({ tourTypes: 1 });
countrySchema.index({ slug: 1 }, { unique: true });
countrySchema.index({ "location.coordinates": "2dsphere" });

// Pre-validate: slug bo'lmasa title'dan hosil qilamiz
countrySchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title);
  }
  next();
});

module.exports = mongoose.model("Country", countrySchema);
