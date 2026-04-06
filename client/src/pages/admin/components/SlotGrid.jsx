import React from "react";

export default function SlotGrid({ slots = [] }) {
  return (
    <section className="slots">
      <h3>Parking Slot in the Parking</h3>
      <div className="slot-grid">
        {slots.length === 0 && (
          <span className="no-slot-message">No slot registered yet.</span>
        )}
        {slots.length > 0 &&
          slots.map((s) => (
            <div className="slot" key={s.id}>
              <span>{s.slot_num}</span>
              <span>{s.floor} floor</span>
            </div>
          ))}
      </div>
    </section>
  );
}
