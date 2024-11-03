import React from "react";
import { useNavigate } from 'react-router-dom';
// import './Home.css'; // Make sure to import your CSS file
import galaxyImage from "../Images/galaxy1.jpg";
function Home() {
    const navigate = useNavigate();
    const handleStartJourney = () => {
        navigate('/qs'); // Navigate to the /qs page
      };
  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${galaxyImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        color:"grey"
      }}
    >
      {/* Galaxy Background */}
      <div className="galaxy-background"></div>

      {/* Header Section */}
      <header className="home-header">
        <h1>Welcome to the Virtual Time Machine</h1>
        <p>Experience the past, present, and future like never before!</p>
      </header>

      {/* Main Content Section */}
      <main className="home-main">
        <section className="time-machine-intro">
          <h2>Travel Through Time</h2>
          <p>
            Discover significant moments in history, or explore the future with
            our state-of-the-art virtual time machine. Navigate different eras
            and relive key events as if you were there!
          </p>
        </section>

        {/* Call to Action */}
        <section className="home-cta">
        <button className="cta-button" onClick={handleStartJourney}>Start Your Journey</button>
                </section>
      </main>
    </div>
  );
}

export default Home;
