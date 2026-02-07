const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const {
  createCountry,
  getCountries,
  updateCountry,
  deleteCountry,
  getCountryById,
  getByContinent,
  getByType,
  searchByTitle,
} = require("../controllers/country.controller");

router.get("/", getCountries);
router.get("/continent/:continent", getByContinent);
router.get("/type/:type", getByType);
router.get("/search/:title", searchByTitle);
router.get("/:id", getCountryById);

router.post("/", auth, createCountry);
router.put("/:id", auth, updateCountry);
router.delete("/:id", auth, deleteCountry);

module.exports = router;
