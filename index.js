const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();
app.set("trust proxy", 1);

//Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 5,
});

app.use(limiter);

// Enable cors
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  }),
);

// Set static folder
app.use(express.static("public"));

// Routes
app.use("/api", require("./routes"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
