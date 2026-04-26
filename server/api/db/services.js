const { pool, query } = require("./connection.js");
const PAYMENT_MODE = {
  UPI: "UPI",
  CARD: "CARD",
  CASH: "CASH",
  COUPON: "COUPON",
};

/**
 * DB service used to register vehicle and information in the database.
 * @param {string} license_plate - 10 character long license plate number
 * @param {string} otp 4 character one time password string
 * @param {string} phno 10 numeric character phone number string
 * @param {number} slot_id - id of the slot being asigned
 * @returns {{isSuccess: boolean}}
 */
const registerVehicle = async (license_plate, otp, phno, slot_id) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    await conn.execute(
      "INSERT INTO vehicles(license_plate, otp, phno, slot_assigned) VALUES(?, ?, ?, ?)",
      [license_plate, otp, phno, slot_id]
    );
    await conn.execute("UPDATE parking_slots SET is_vacant=0 WHERE id=?", [
      slot_id,
    ]);

    await conn.commit();
    return { isSuccess: true };
  } catch {
    await conn.rollback();
    console.error("Failed to register vehicle");
    return { isSuccess: false };
  } finally {
    conn.release();
  }
};

/**
 * Gets details of first available slot
 * @param {number} parking_space_id - id of parking space
 * @returns {{isAvailable: boolean, id?: number, slot_num?: number, floor?:string}} Success message
 */
const getAvailableSlot = async (parking_space_id) => {
  try {
    const rows = await query(
      "SELECT id, slot_num, floor FROM parking_slots WHERE parking_space_id=? AND is_vacant=1",
      [parking_space_id]
    );
    if (rows.length > 0) {
      return {
        isAvailable: true,
        id: rows[0].id,
        slot_num: rows[0].slot_num,
        floor: rows[0].floor,
      };
    } else return { isAvailable: false };
  } catch {
    return { isAvailable: false };
  }
};

/**
 * Soft deletes the registered vehicle entry from the db
 * @param {string} otp - 4 digit unique otp
 * @param {string} phno - 10 degit phone number
 * @returns {{isSuccess: boolean, slot_num?: number, floor?: string, license_plate?: string}} success message and slot information
 */
const unregisterVehicle = async (otp, phno) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [rows] = await conn.execute(
      `SELECT v.slot_assigned, v.license_plate, ps.slot_num, ps.floor
       FROM vehicles v
       JOIN parking_slots ps
        ON ps.id = v.slot_assigned
       WHERE v.otp=? AND v.phno=?`,
      [otp, phno]
    );

    if (!rows[0].slot_assigned) throw new Error("No slot available");

    await conn.execute(
      "UPDATE vehicles SET is_deleted=1 WHERE slot_assigned=?",
      [rows[0].slot_assigned]
    );

    await conn.execute("UPDATE parking_slots SET is_vacant=1 WHERE id=?", [
      rows[0].slot_assigned,
    ]);

    await conn.commit();
    return {
      isSuccess: true,
      slot_num: rows[0].slot_num,
      floor: rows[0].floor,
      license_plate: rows[0].license_plate,
    };
  } catch {
    return { isSuccess: false };
  } finally {
    conn.release();
  }
};

/**
 * Registers a parking slot
 * @param {string} parking_space_id - parking space id
 * @param {number} slot_num - slot number
 * @param {string} floor - floor name
 * @returns {{isSuccess: boolean, message?: string, id?: number}} success message
 */
const registerSlot = async (parking_space_id, slot_num, floor) => {
  try {
    const duplicate_resp = await query(
      `SELECT id FROM parking_slots
       WHERE
        parking_space_id=? AND
        slot_num=? AND
        floor=?`,
      [parking_space_id, slot_num, floor]
    );

    if (duplicate_resp.length > 0)
      return {
        isSuccess: false,
        message: "Same Slot number and Floor present.",
      };

    const resp = await query(
      "INSERT INTO parking_slots(parking_space_id, slot_num, floor) VALUES (?, ?, ?)",
      [parking_space_id, slot_num, floor]
    );
    return { isSuccess: true, id: resp.insertId };
  } catch {
    return { isSuccess: false, message: "An error occured in database." };
  }
};

const registerPayement = async (parking_space_id, mode, amount) => {
  try {
    if (!PAYMENT_MODE.hasOwnProperty(mode))
      throw new Error("Unrecognised Payement method.");

    await query(
      "INSERT INTO payment_history(parking_space_id, mode, amount) VALUES(?, ?, ?)",
      [parking_space_id, mode, amount]
    );

    return { isSuccess: true };
  } catch (err) {
    return { isSuccess: false, message: err.message };
  }
};

const getParkingSlots = async (parking_space_id) => {
  try {
    const slots = await query(
      `SELECT
       id, slot_num, floor
       FROM parking_slots
       WHERE parking_space_id=?`,
      [parking_space_id]
    );

    return { isSuccess: true, slots };
  } catch {
    return { isSuccess: false, message: "Can't get parking slots" };
  }
};

/**
 * Gets a registered vehicle ticket
 * @param {string} phno - phone number
 * @param {string} otp - One time password
 * @returns {{isSuccess: boolean, license_plate?: string, slot_num?: string, floor?: string}}
 */
const getTicketInfo = async (phno, otp) => {
  try {
    const slots = await query(
      `SELECT
       v.license_plate,
       ps.slot_num,
       ps.floor
      FROM vehicles
      JOIN parking_slots ON v.slot_assigned = ps.id
      WHERE v.otp=? AND v.phno=?`,
      [phno, otp]
    );

    return {
      isSuccess: true,
      license_plate: slots[0].license_plate,
      slot_num: slots[0].slot_num,
      floor: slots[0].floor,
    };
  } catch {
    return {
      isSuccess: false,
      message: "Can't get vehicle ticket information.",
    };
  }
};

module.exports = {
  registerVehicle,
  getAvailableSlot,
  unregisterVehicle,
  registerSlot,
  registerPayement,
  getParkingSlots,
  getTicketInfo,
};
