import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ThankYou({ setUIState }) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setUIState("BEGIN");
      navigate("/exit");
    }, 5000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="thank-you">
      <h1>✅ Thank You</h1>
    </section>
  );
}