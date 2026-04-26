import React, { useState } from "react";
import { registerSlot } from "../../../services/admin.service";

export default function AddSlot({ setSlot }) {
  const [slot_num_inp, setSlotNum] = useState(0);
  const [floor_inp, setFloor] = useState("");

  const handleSubmit = async () => {
    if (slot_num_inp === 0) {
      alert("Slot number can't be 0");
      return;
    }
    if(!floor_inp) {
      alert("Invalid Floor");
      return;
    }

    const resp = await registerSlot(slot_num_inp, floor_inp);
    if (resp?.error !== true) {
      setSlot((prev) => [
        ...prev,
        { id: resp.id, slot_num: resp.slot_num, floor: resp.floor },
      ]);
      setSlotNum(0);
    } else {
    }
  };
  const handleCancel = () => {
    setSlotNum(0);
    setFloor("");
  };

  return (
    <section className="add-slot">
      <h3>Add a slot</h3>
      <div className="fields">
        <input
          type="number"
          value={slot_num_inp}
          onChange={(e) => setSlotNum(e.target.value)}
        />
        <input
          type="text"
          value={floor_inp}
          onChange={(e) => setFloor(e.target.value)}
        />
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
        <button className="submit-btn" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </section>
  );
}
