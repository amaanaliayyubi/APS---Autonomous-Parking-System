import React from "react";

export default function SlotGrid({ slots = [] }) {
  const grouped = slots.reduce((acc, slot) => {
    if (!acc[slot.floor]) acc[slot.floor] = [];
    acc[slot.floor].push(slot);
    return acc;
  }, {});

  const sortedFloors = Object.keys(grouped).sort((a, b) =>
    b.localeCompare(a, undefined, { numeric: true, sensitivity: "base" })
  );

  return (
    <section className="slots">
      <h3>Parking Overview</h3>

      <div className="legend">
        <div className="legend-item">
          <span className="legend-box vacant"></span> Vacant
        </div>
        <div className="legend-item">
          <span className="legend-box occupied"></span> Occupied
        </div>
      </div>

      {slots.length === 0 && (
        <span className="no-slot-message">No slot registered yet.</span>
      )}

      {sortedFloors.map((floor) => (
        <div className="floor-group" key={floor}>
          <h4 className="floor-title">Floor {floor}</h4>

          <div className="slot-grid">
            {grouped[floor].map((s) => (
              <div
                className={`slot ${s.is_vacant ? "vacant" : "occupied"}`}
                key={s.id}
              >
                <div className="slot-number">#{s.slot_num}</div>
                <div className="slot-floor">Floor: {floor}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
