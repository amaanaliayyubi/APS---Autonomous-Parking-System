const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * Generic SMS sender
 * @param {string} phone - without country code (India)
 * @param {string} message
 */
const sendSMS = async (phone, message) => {
  try {
    const res = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to: `+91${phone}`,
    });

    return res.sid;
  } catch (err) {
    console.error("SMS Error:", err.message);
    throw err;
  }
};

module.exports = { sendSMS };