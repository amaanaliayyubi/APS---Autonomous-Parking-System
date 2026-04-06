import { post } from "../services/api.service";

export const registerVehicle = (phno, license_plate_num) => {
  return post("/gate/entry", {
    phno_raw: phno,
    license_plate_raw: license_plate_num,
  });
};

export const unregisterVehicle = (phno, otp) => {
  return post("/gate/exit", {
    phno_raw: phno,
    otp_raw: otp,
  });
};

export const makePayment = (mode, amount) => {
  return post("/gate/payment", { mode, amount });
};
