import React from "react";

export default function WelcomePage({ setUIState }) {
  const handleStart = () => {
    setUIState("USER_INPUT");
  }
  
  return <section className="welcome-page">
    <h1>Welcome to Autonomous Parking System.</h1>
    <span className="small-text">Click 'Start' to get parking slot.</span>
    <button onClick={handleStart}>Start</button>
  </section>;
}
