const services = require("../db/services.js");
const PARKING_SPACE_ID = process.env.TEST_USERID || 1;

/**
 * Handle Slot registration
 * @param {Request} req - Request Object
 * @param {Response} res - Response Object
 * @returns Response
 */
const registerSlot = async (req, res) => {
  try {
    const { slot_num, floor } = req.body;
    if (!slot_num || !floor)
      return res.status(400).json({ message: "Invalid fields" });

    const resp = await services.registerSlot(PARKING_SPACE_ID, slot_num, floor);
    if (!resp.isSuccess) return res.status(400).json({ message: resp.message });

    return res.status(200).json({
      message: "Successfully registerd slot!",
      slot_num,
      floor,
      id: resp.id,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

/**
 * Gets Parking slots of a parking space (id)
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const getParkingSlots = async (req, res) => {
  try {
    const resp = await services.getParkingSlots(PARKING_SPACE_ID);
    if (!resp.isSuccess) return res.status(400).json({ message: resp.message });

    res.status(200).json({ slots: resp.slots });
  } catch {
    return res.status(400).json({ message: "An error occured" });
  }
};

module.exports = {
  registerSlot,
  getParkingSlots,
};
