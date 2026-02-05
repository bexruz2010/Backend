const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/countries", require("./routes/country.routes"));


app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

module.exports = app;
