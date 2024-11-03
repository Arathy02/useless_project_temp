// models/Survey.js
const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
  timing: { type: String, required: true },
  exercise: { type: String, required: true },
  diet: { type: String, required: true },
  screentime: { type: String, required: true },
  future: { type: String, required: true },
}, { timestamps: true });

const Survey = mongoose.model('Survey', SurveySchema);
module.exports = Survey;
