import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EntryGate from "./pages/entry-gate/EntryGate";
import ExitGate from "./pages/exit-gate/ExitGate";

function NotFoundPage() {
  return (
    <>
      <p>ERROR 404: Page Not Exist</p>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<EntryGate />} />
        <Route path="/entry" element={<EntryGate />} />
        <Route path="/exit" element={<ExitGate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
