import React from "react";
import { registerVehicle } from "../../../services/gate.service";

export default function UserInput({
  license_plate_num,
  phno,
  setLicensePlateNum,
  setPhno,
  setOtp,
  setParkingSlot,
}) {
  const handleSubmit = async () => {
    if (phno && license_plate_num) {
      const data = await registerVehicle(phno, license_plate_num);
      if (data?.error !== true) {
        setOtp(data.otp);
        setParkingSlot({
          slot_num: data.slot_num,
          floor: data.floor,
        });
      } else {
        console.log(data.message);
      }
    } else {
      alert("Invalid Input fields");
    }
  };

  return (
    <section className="user-input">
      <h2>Enter Your Details</h2>
      <div className="fields-container">
        <div className="field">
          <label>Phone Number: </label>
          <input
            value={phno}
            onChange={(e) => setPhno(e.target.value)}
            type="text"
          />
        </div>
        <div className="field">
          <label>License Plate Number: </label>
          <input
            value={license_plate_num}
            onChange={(e) => setLicensePlateNum(e.target.value)}
            type="text"
          />
        </div>
        <button onClick={handleSubmit}>Get Slot</button>
      </div>
    </section>
  );
}
