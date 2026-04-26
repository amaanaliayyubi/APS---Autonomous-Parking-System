import React, { useEffect, useState } from "react";
import UserInput from "./components/UserInput";
import Payment from "./components/Payment";
import ThankYou from "./components/ThankYou";
import "./ExitGate.css";

export default function ExitGate() {
  const [UIState, setUIState] = useState("BEGIN");
  const [otp, setOtp] = useState("");
  const [phno, setPhno] = useState("");
  const [mode, setMode] = useState("UPI");
  const [amount, setAmount] = useState(50);

  useEffect(() => {
    if (UIState === "BEGIN") {
      setOtp("");
      setPhno("");
      setMode("UPI");
    }
  }, [UIState]);

  return (
    <main className="exit-gate">
      {UIState === "BEGIN" && (
        <UserInput
          phno={phno}
          otp={otp}
          setPhno={setPhno}
          setOtp={setOtp}
          setUIState={setUIState}
        />
      )}
      {UIState === "PAYMENT" && (
        <Payment
          setUIState={setUIState}
          mode={mode}
          amount={amount}
          setMode={setMode}
          setAmount={setAmount}
          phno={phno}
          otp={otp}
        />
      )}
      {UIState === "END" && <ThankYou setUIState={setUIState} />}
    </main>
  );
}
