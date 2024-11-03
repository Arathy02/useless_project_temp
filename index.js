const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();
const surveyRoutes = require('./routes/surveyRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Sample route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Routes
app.use('/api/survey', surveyRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
