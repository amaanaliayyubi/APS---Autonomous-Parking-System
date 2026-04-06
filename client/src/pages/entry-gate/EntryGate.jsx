import React, { useEffect, useState } from "react";
import WelcomePage from "./components/WelcomePage";
import UserInput from "./components/UserInput";
import SlotCollection from "./components/SlotCollection";
import "./EntryGate.css"

export default function EntryGate() {
  const [UIState, setUIState] = useState("BEGIN");
  const [license_plate_num, setLicensePlateNum] = useState("");
  const [phno, setPhno] = useState("");
  const [otp, SetOtp] = useState("");
  const [parkingSlot, setParkingSlot] = useState({
    slot_num: null,
    floor: null,
  });

  useEffect(() => {
    if (UIState === "USER_INPUT") {
      if (otp && parkingSlot.floor && parkingSlot.slot_num)
        setUIState("SLOT_COLLECTION");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp, parkingSlot]);

  useEffect(() => {
    if (UIState === "BEGIN") {
      setLicensePlateNum("");
      setPhno("");
      SetOtp("");
      setParkingSlot({
        slot_num: null,
        floor: null,
      });
    }
  }, [UIState]);

  return (
    <main className="entry-gate">
      {UIState === "BEGIN" && <WelcomePage setUIState={setUIState} />}
      {UIState === "USER_INPUT" && (
        <UserInput
          license_plate_num={license_plate_num}
          phno={phno}
          setLicensePlateNum={setLicensePlateNum}
          setPhno={setPhno}
          setOtp={SetOtp}
          setParkingSlot={setParkingSlot}
        />
      )}
      {UIState === "SLOT_COLLECTION" && (
        <SlotCollection
          license_plate_num={license_plate_num}
          phno={phno}
          otp={otp}
          parkingSlot={parkingSlot}
          setUIState={setUIState}
        />
      )}
    </main>
  );
}

/*
1) -->Start,
2) --License Plate image capture,
3) <--License Plate Number

If fails then user need to manually enter it.

4) -->Enter Phone Number
5) <-- OTP + Parking Slot
6) Reset to new User
*/
