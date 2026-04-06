import React from "react";

export default function SlotCollection({
  license_plate_num,
  phno,
  otp,
  parkingSlot,
  setUIState,
}) {
  const handleOk = () => {
    setUIState("BEGIN");
  };
  return (
    <section className="slot-collection">
      <div className="receipt">
        <div className="field">
          <span className="field-name">License Plate:</span>
          <span className="field-value">{license_plate_num}</span>
        </div>
        <div className="field">
          <span className="field-name">Phone Number:</span>
          <span className="field-value">{phno}</span>
        </div>
        <div className="field">
          <span className="field-name">OTP:</span>
          <span className="field-value">{otp}</span>
        </div>
        <h4>Parking Slot:</h4>
        <div className="field">
          <span className="field-name">Slot Number: </span>
          <span className="field-value">{parkingSlot.slot_num}</span>
        </div>
        <div className="field">
          <span className="field-name">Floor: </span>
          <span className="field-value">{parkingSlot.floor}</span>
        </div>
      </div>
      <button onClick={handleOk}>Ok</button>
    </section>
  );
}
