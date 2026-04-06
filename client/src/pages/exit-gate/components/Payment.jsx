import React from "react";
import { makePayment } from "../../../services/gate.service";

export default function Payment({
  setUIState,
  mode,
  amount,
  setMode,
  setAmount,
}) {
  const handlePayment = async () => {
    if (!mode || !amount) {
      alert("Invalid Fields");
      return;
    }

    setUIState("END");
    const data = await makePayment(mode, amount);
    if (data?.error !== true) {
      setUIState("END");
    } else {
      setUIState("END");
    }
  };

  return (
    <section className="payment">
      <h3>OTP & Phone Number is varified</h3>
      <h3>Proceed with payment</h3>
      <div className="field-container">
        {/* PAYMENT MODE */}
        <div className="field">
          <label>Payment Mode: </label>
          <select onChange={(e) => setMode(e.target.value)} value={mode}>
            <option value="UPI">UPI</option>
            <option value="CARD">Card</option>
            <option value="CASH">Cash</option>
            <option value="COUPON">Coupon</option>
          </select>
        </div>
        {/* PAYMENT MODE */}
        <div className="field">
          <label>Payment Mode: </label>
          <label>Rs {amount}/-</label>
        </div>
      </div>
      <button onClick={handlePayment}>Pay</button>
    </section>
  );
}
