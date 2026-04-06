import React from "react";
import { unregisterVehicle } from "../../../services/gate.service";

export default function UserInput({ phno, otp, setPhno, setOtp, setUIState }) {
  const handleSubmit = async () => {
    if (!phno || !otp) {
      alert("Invalid Fields");
      return;
    }
    const data = await unregisterVehicle(phno, otp);
    if (data?.error !== true) {
      setUIState("PAYMENT");
    } else {
      console.log(data.message);
    }
  };

  return (
    <section className="user-input">
      <h2>Enter below details for exit.</h2>
      <div className="field-container">
        {/* Phone Number */}
        <div className="field">
          <label>Phone Number: </label>
          <input
            value={phno}
            onChange={(e) => setPhno(e.target.value)}
            type="text"
          />
        </div>
        {/* OTP */}
        <div className="field">
          <label>OTP: </label>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
          />
        </div>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </section>
  );
}
