const router = require("express").Router();
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

router.post("/", createCountry);
router.put("/:id", updateCountry);
router.delete("/:id", deleteCountry);

module.exports = router;
