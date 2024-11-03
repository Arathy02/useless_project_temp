// routes/surveyRoutes.js
const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/surveyController');

// Route to submit the survey
router.post('/submit', surveyController.submitSurvey);

module.exports = router;
