const express = require("express");
const cors = require("cors");

const app = express();

// 🔥 BODY PARSER (majburiy!)
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api/countries", require("./routes/country.routes"));

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API ishlayapti 🚀");
});

module.exports = app;
