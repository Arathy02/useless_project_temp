import React, { useState } from "react";
import timing from "../Images/timing.jpg";
import diet from "../Images/diet.jpg";
import exercise from "../Images/exercise.jpg";
import bg from "../Images/bg.jpg";
import bg2 from "../Images/bg2.jpg";

function LifestyleSurvey() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false); // Track submission status
  const [results, setResults] = useState({}); // Store results

  const [formData, setFormData] = useState({
    timing: "",
    diet: "",
    screentime: "",
    future: "",
    exercise: "", // Change exercise to a string to hold one value
  });

  const steps = [
    {
      question: "How many hours of shut-eye do you think you are getting each night?",
      name: "timing",
      options: [
        'Less than 4 hours: "Sleep is for the weak"',
        '4-6 hours: "I get just enough to function... sometimes"',
        '6-8 hours: "I am perfectly a sleeping beauty"',
        'More than 8 hours: "Who am I kidding? I could sleep all day"',
      ],
      type: "radio",
    },
    {
      question: "On a Scale Of Kale Smoothi to triple cheese burger where do your meals usually fall?",
      name: "diet",
      options: [
        'Mostly green smoothies and salads: "I am a health guru in the making"',
        'Balanced meals with some treats: "I believe in moderation"',
        'Lots of comfort food: "Food = happiness"',
        'Junk food is life: "What is a vegetable, really?"',
      ],
      type: "radio",
    },
    {
      question: "How many hours do you spend scrolling?",
      name: "screentime",
      options: [
        '1-2 hours: "I have some control....I think"',
        '3-5 hours: "Moderate social media expert"',
        '6-8 hours: "Professional scroller here"',
        '9+ hours: "I might be the internets best friend"',
      ],
      type: "radio",
    },
    {
      question: "Do you see yourself becoming a wise sage or a professional couch potato in 10 years?",
      name: "future",
      options: [
        'Wise sage: "I will be doling out wisdom daily"',
        'Living my best life, balanced and happy: "Just enjoying the journey"',
        'Tired but surviving: "I will take what I can get"',
        'Professional couch potato: "Dream job, honestly"',
      ],
      type: "radio",
    },
    {
      question: "Are you running marathons, or is your idea of cardio just rushing to the couch before your show starts?",
      name: "exercise", // Corrected the name here
      options: [
        'Exercise daily: "I am practically an athlete!"',
        'A few times a week: "I like to stay fit but chill about it."',
        'Once in a blue moon: "Does stretching count?"',
        'Exercise? What’s that?: "My thumbs are strong from scrolling!"',
      ],
      type: "radio",
    },
  ];

  const backgroundImages = [timing, diet, bg, bg2, exercise];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/survey/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response from server:", data);

      // Set results and mark as submitted
      setResults(data.result); // Assuming the server returns the results in the response
      setSubmitted(true);

      // Reset form data and step
      setFormData({
        timing: "",
        diet: "",
        screentime: "",
        future: "",
        exercise: "",
      });
      setCurrentStep(0);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  
  const renderInput = (step) => {
    const { type, name, options } = step;
    switch (type) {
      case "radio":
        return options.map((option) => (
          <label key={option} style={{ display: "block", margin: "0.5rem 0" }}>
            <input
              type="radio"
              name={name}
              value={option}
              checked={formData[name] === option}
              onChange={handleChange}
              style={{ marginRight: "0.5rem" }}
            />
            {option}
          </label>
        ));
      case "select":
        return (
          <select
            name={name}
            value={formData[name]}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem" }}
          >
            <option value="">Select</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "checkbox":
        return options.map((option) => (
          <label key={option} style={{ display: "block", margin: "0.5rem 0" }}>
            <input
              type="checkbox"
              name={name}
              value={option}
              checked={formData.hobbies.includes(option)}
              onChange={handleChange}
              style={{ marginRight: "0.5rem" }}
            />
            {option}
          </label>
        ));
      default:
        return null;
    }
  };

  return (
    <div
    className="survey-container"
    style={{
      backgroundImage: submitted
      ? `url(${bg})` // Use the new background for results
      : `url(${backgroundImages[currentStep]})`, // Use the current step's background   
         backgroundSize: "cover",
      backgroundPosition: "center",
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      textAlign: "center",
      padding: "2rem",
    }}
  >
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        padding: "2rem",
        borderRadius: "10px",
        maxWidth: "600px",
        width: "100%",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(0.1px)",
        color: "black",
      }}
    >
      {submitted ? (
        <div>
          <h2>Survey Results</h2>
          <p>{results}</p> {/* Display the result message directly */}
          <button onClick={() => setSubmitted(false)}>Retake Survey</button>
        </div>
      ) : (
        <>
          <h2>{steps[currentStep].question}</h2>
          <form>
            <div style={{ marginBottom: "1rem" }}>
              {renderInput(steps[currentStep])}
            </div>
            <div className="button-group" style={{ marginTop: "1rem" }}>
              {currentStep > 0 && (
                <button type="button" onClick={handleBack} style={{ marginRight: "1rem" }}>
                  Back
                </button>
              )}
              <button type="button" onClick={handleNext}>
                {currentStep === steps.length - 1 ? "Submit" : "Next"}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  </div>
  );
}

export default LifestyleSurvey;
