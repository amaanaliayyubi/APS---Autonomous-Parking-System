const {
  registerVehicle,
  getAvailableSlot,
  unregisterVehicle,
  registerPayement,
} = require("../db/services.js");
const PARKING_SPACE_ID = process.env.TEST_USERID || 1;

const license_plate_pattern =
  /^(?:[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}|[0-9]{2}BH[0-9]{4}[A-Z]{2})$/;
const phno_pattern = /^(?:\+91|91)?[6-9]\d{9}$/;

/**
 * Generates random 4 digit string OTP
 * @returns {string} otp string
 */
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

/**
 * Handles Vehicle entry at Entry gate
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @returns response
 */
const vehicleEnter = async (req, res) => {
  try {
    const { license_plate_raw, phno_raw } = req.body;
    const license_plate = license_plate_raw.replace(/\s+/g, "").toUpperCase();
    const phno = phno_raw.replace(/\s+/g, "");

    if (!license_plate_pattern.test(license_plate) || !phno_pattern.test(phno))
      return res.status(400).json({ message: "Invalid fields" });

    const available_slot = await getAvailableSlot(PARKING_SPACE_ID);
    if (!available_slot.isAvailable)
      return res.status(400).json({ message: "No free slot available." });

    const otp = generateOTP();

    const reg_info = await registerVehicle(
      license_plate,
      otp,
      phno,
      available_slot.id
    );
    if (!reg_info.isSuccess)
      return res.status(400).json({ message: "DB Error, registration failed" });

    return res.status(200).json({
      message:
        "Vehicle Registration successfull, please collect OTP for exit gate",
      otp,
      slot_num: available_slot.slot_num,
      floor: available_slot.floor,
    });
  } catch {
    return res
      .status(400)
      .json({ message: "An error occured can't register vehicle." });
  }
};

/**
 * Handles Vehicle exit at exit gate
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @returns response
 */
const vehicleExit = async (req, res) => {
  try {
    const { otp_raw, phno_raw } = req.body;
    const phno = phno_raw.replace(/\s+/g, "");
    const otp = otp_raw.replace(/\s+/g, "");
    if (!phno_pattern.test(phno) || !otp || otp.length < 4)
      return res.status(400).json({ message: "Invalid fields" });

    const unreg = await unregisterVehicle(otp, phno);

    if (!unreg.isSuccess)
      return res
        .status(400)
        .json({ message: "DB Error, can't unregister vehicle" });

    return res
      .status(200)
      .json({ message: "OTP & Phone number successfully verified" });
  } catch {
    return res
      .status(400)
      .json({ message: "An error occured can't unregister vehicle." });
  }
};

/**
 * Handles Vehicle exit at exit gate
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @returns response
 */
const makePayment = async (req, res) => {
  try {
    const { mode, amount } = req.body;
    if (!mode || !amount)
      return res.status(400).json({ message: "Invalid fields!" });

    const pay_resp = await registerPayement(PARKING_SPACE_ID, mode, amount);

    if (!pay_resp.isSuccess)
      return res.status(400).json({ message: `DB Error, ${pay_resp.message}` });
  } catch {
    return res
      .status(400)
      .json({ message: "Some Error Occurred, cant process payement." });
  }
};

module.exports = { vehicleEnter, vehicleExit, makePayment };
