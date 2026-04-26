import React, { useEffect, useState } from "react";
import AddSlot from "./components/AddSlot";
import SlotGrid from "./components/SlotGrid";
import "./Admin.css";
import { fetchParkingSlot } from "../../services/admin.service";

export default function Admin() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchParkingSlot();
      if (data?.error !== true) {
        setSlots(data.slots);
      } else {
      }
    };

    loadData();
  }, []);

  return (
    <main className="admin">
      <SlotGrid slots={slots} />
      <AddSlot setSlot={setSlots} />
    </main>
  );
}