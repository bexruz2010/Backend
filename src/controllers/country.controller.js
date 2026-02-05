const Country = require("../models/Country");
exports.createCountry = async (req, res) => {
    const country = await Country.create(req.body);

    global.io.emit("new-country", {
      message: "New country added",
      country
    });
  
    res.json(country);
  };
exports.getCountries = async (req, res) => {
  const countries = await Country.find({ isActive: true });
  res.json(countries);
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
  await Country.findByIdAndDelete(req.params.id);
  res.json({ message: "O‘chirildi" });
};
