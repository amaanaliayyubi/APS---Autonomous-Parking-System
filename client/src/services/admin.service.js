import { post } from "./api.service";
import { get } from "./api.service";

export const fetchParkingSlot = () => {
  return get("/admin/slot");
};

export const registerSlot = (slot_num, floor) => {
  return post("/admin/slot", { slot_num, floor });
};
