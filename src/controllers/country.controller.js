const Country = require("../models/Country");

exports.getCountries = async (req, res) => {
  const countries = await Country.find({ isActive: true });
  res.json(countries);
};

exports.getCountryById = async (req, res) => {
  const country = await Country.findById(req.params.id);
  if (!country) {
    return res.status(404).json({ message: "Topilmadi" });
  }
  res.json(country);
};

exports.getByContinent = async (req, res) => {
  const countries = await Country.find({
    continent: req.params.continent,
    isActive: true,
  });
  res.json(countries);
};

exports.getByType = async (req, res) => {
  const countries = await Country.find({
    tourTypes: req.params.type,
    isActive: true,
  });
  res.json(countries);
};

exports.searchByTitle = async (req, res) => {
  const countries = await Country.find({
    title: { $regex: req.params.title, $options: "i" },
    isActive: true,
  });
  res.json(countries);
};

exports.createCountry = async (req, res) => {
  const country = await Country.create(req.body);
  res.json(country);
};

exports.updateCountry = async (req, res) => {
  const updated = await Country.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

exports.deleteCountry = async (req, res) => {
  await Country.findByIdAndUpdate(req.params.id, { isActive: false });
  res.json({ message: "O‘chirildi" });
};
