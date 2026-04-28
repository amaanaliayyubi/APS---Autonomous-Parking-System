// services/sms.service.js

const axios = require("axios");

const API_URL = "https://www.fast2sms.com/dev/bulkV2";

/**
 * Send SMS via Fast2SMS
 * @param {string} phone - 10 digit Indian number (e.g., "9876543210")
 * @param {string} message - plain text message
 * @returns {Promise<{success: boolean, request_id?: string}>}
 */
const sendSMS = async (phone, message) => {
  try {
    if (!phone) throw new Error("Phone is required");

    // normalize phone (remove spaces, +91, etc.)
    const cleanPhone = String(phone).replace(/\D/g, "").slice(-10);

    // Fast2SMS has message length limits; keep it safe
    const text = String(message).trim().slice(0, 1000);

    const payload = {
      route: "q", // quick route (good for testing; no DLT needed initially)
      message: text,
      language: "english",
      flash: 0,
      numbers: cleanPhone, // comma-separated if multiple
    };

    const res = await axios.post(API_URL, payload, {
      headers: {
        authorization: process.env.FAST2SMS_API_KEY,
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    const data = res.data || {};

    // Normalize response shape (so rest of app doesn't care about provider)
    const ok = data.return === true;

    if (!ok) {
      throw new Error(
        data.message || "Fast2SMS failed"
      );
    }

    return {
      success: true,
      request_id: data.request_id,
    };
  } catch (err) {
    console.error("SMS Error:", err.response?.data || err.message);
    throw err;
  }
};

module.exports = { sendSMS };