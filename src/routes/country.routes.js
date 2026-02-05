const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const {
  createCountry,
  getCountries,
  updateCountry,
  deleteCountry
} = require("../controllers/country.controller");

router.get("/", getCountries);
router.post("/", auth, createCountry);
router.put("/:id", auth, updateCountry);
router.delete("/:id", auth, deleteCountry);

module.exports = router;
