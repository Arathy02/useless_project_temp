const Survey = require('../models/Survey'); // Assuming you have a Survey model set up
const surveyPoints = {
  timing: {
    'Less than 4 hours:"Sleep is for the weak"': -2,
    '4-6 hours:"I get just enough to function... sometimes"': -1,
    '6-8 hours:"I am perfectly a sleeping beauty"': 1,
    'More than 8 hours:"Who am I kidding? I could sleep all day"': 2
  },
  diet: {
    'Mostly green smoothies and salads: "I am a health guru in the making"': 2,
    'Balanced meals with some treats: "I believe in moderation"': 1,
    'Lots of comfort food: "Food = happiness"': -1,
    'Junk food is life: "What is a vegetable, really?"': -2
  },
  screentime: {
    '1-2 hours: "I have some control... I think"': 2,
    '3-5 hours: "Moderate social media expert"': 1,
    '6-8 hours: "Professional scroller here"': -1,
    '9+ hours: "I might be the internet’s best friend"': -2
  },
  future: {
    'Wise sage: "I will be doling out wisdom daily"': 2,
    'Living my best life, balanced and happy: "Just enjoying the journey"': 1,
    'Tired but surviving: "I will take what I can get"': -1,
    'Professional couch potato: "Dream job, honestly"': -2
  },
  exercise: {
    'Exercise daily: "I am practically an athlete!"': 2,
    'A few times a week: "I like to stay fit but chill about it."': 1,
    'Once in a blue moon: "Does stretching count?"': -1,
    'Exercise? What’s that?: "My thumbs are strong from scrolling!"': -2
  }
};

function generateResponse(score) {
  if (score >= 8) {
    return "You're living a highly balanced, health-conscious lifestyle. Keep up the great work!";
  } else if (score >= 4) {
    return "You’re on a good path! A few tweaks could make a big difference for long-term wellness.";
  } else if (score >= 0) {
    return "You’re doing okay, but there’s room for improvement. Small adjustments could boost your energy and well-being.";
  } else if (score >= -4) {
    return "Your lifestyle shows signs of imbalance. Consider changes for a healthier routine.";
  } else {
    return "It looks like you might be living on the edge! More balance could be beneficial for both body and mind.";
  }
}

exports.submitSurvey = async (req, res) => {
  try {
    const surveyData = req.body;

    // Calculate score based on user's answers
    let score = 0;
    for (const [question, answer] of Object.entries(surveyData)) {
      if (surveyPoints[question] && surveyPoints[question][answer]) {
        score += surveyPoints[question][answer];
      }
    }

    // Generate response message
    const resultMessage = generateResponse(score);
    console.log("result",resultMessage)
    // Save survey data to database
    const newSurvey = new Survey({
      ...surveyData,
      score, // Optionally store score
      resultMessage // Optionally store result message
    });
    await newSurvey.save();

    res.status(201).json({
      message: 'Survey submitted successfully',
      data: newSurvey,
      result: resultMessage // Send the generated response back to the user
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error submitting survey',
      error: error.message
    });
  }
};
