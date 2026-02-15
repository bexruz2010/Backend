const express = require("express");
const mongoose = require("mongoose");
const Country = require("./models/country"); // sening model yo'ling

const app = express();
app.use(express.json()); // JSON body ni o'qish uchun

// CREATE – yangi country qo'shish
app.post("/countries", async (req, res) => {
  try {
    const country = new Country(req.body);
    await country.save();
    res.status(201).json(country);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ – barcha countrylarni olish
app.get("/countries", async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ – ID bo'yicha olish
app.get("/countries/:id", async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) return res.status(404).json({ error: "Not found" });
    res.json(country);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE – country yangilash
app.put("/countries/:id", async (req, res) => {
  try {
    const country = await Country.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!country) return res.status(404).json({ error: "Not found" });
    res.json(country);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE – country o'chirish
app.delete("/countries/:id", async (req, res) => {
  try {
    const country = await Country.findByIdAndDelete(req.params.id);
    if (!country) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Server ishga tushishi
mongoose.connect("mongodb://localhost:27017/tourDB")
  .then(() => {
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch(err => console.log(err));
