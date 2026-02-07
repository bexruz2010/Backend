const mongoose = require("mongoose");

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
      unique: true, // URL uchun
      lowercase: true,
      index: true,
    },
    continent: {
      type: String,
      required: true,
      enum: ["Asia", "Europe", "Africa", "North America", "South America", "Oceania", "Antarctica"],
    },
    countryCode: { // ISO country code
      type: String,
      default: "",
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
      type: [String], // Masalan: "France", "Spain" – multi-destination
      default: [],
    },

    // Narx va chegirmalar
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: "USD",
    },

    // Reyting va sharhlar
    rating: {
      type: Number,
      default: 0, // 1-5 ball
      min: 0,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },

    // Rasmlar
    mainImage: {
      type: String,
      required: true,
    },
    gallery: {
      type: [String],
      default: [],
    },
    video: {
      type: String, // YouTube yoki Vimeo link
    },

    // Tur davomiyligi va fasl
    durationDays: {
      type: Number,
      default: 1,
    },
    bestSeason: {
      type: String,
      default: "", // Spring, Summer, Autumn, Winter
    },
    climate: {
      type: String, // Tropical, Temperate, Arid, etc.
    },

    // Tur opsiyalari
    tourOptions: [
      {
        transport: {
          type: String,
          enum: ["Bus", "Plane", "Ship", "Train", "Car"],
          required: true,
        },
        mealPlan: {
          type: String,
          enum: ["Breakfast only", "Half board", "Full board", "All inclusive"],
          default: "Breakfast only",
        },
        price: {
          type: Number,
          required: true,
        },
        extraServices: {
          type: [String], // Masalan: "Guide", "Insurance", "Airport transfer"
          default: [],
        },
      },
    ],

    // Holat
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false, // sayt homepage uchun
    },
    tags: {
      type: [String], // Safari, Beach, Mountain, Cultural
      default: [],
    },

    // Aloqa va lokatsiya
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0],
      },
      address: String,
      city: String,
      country: String,
    },

    // Review va bookinglar
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

    // SEO uchun qo‘shimchalar
    metaTitle: String,
    metaDescription: String,
    metaKeywords: [String],
  },
  { timestamps: true }
);

// Indexlar tez qidirish uchun
countrySchema.index({ continent: 1 });
countrySchema.index({ price: 1 });
countrySchema.index({ tourTypes: 1 });
countrySchema.index({ slug: 1 }, { unique: true });
countrySchema.index({ "location.coordinates": "2dsphere" }); // Geospatial search

module.exports = mongoose.model("Country", countrySchema);

