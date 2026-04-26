/**
 * Exit payment receipt template
 */
const buildPaymentReceipt = ({
  plate,
  amount,
  mode,
  slot,
  floor,
  entryTime,
  exitTime,
}) => {
  return `
🚗 AUTONOMOUS PARKING RECEIPT

--------------------------------
Vehicle : ${plate}
Slot    : ${slot} | Floor ${floor}

Entry   : ${entryTime}
Exit    : ${exitTime}

--------------------------------
Amount  : ₹${amount}
Mode    : ${mode}

--------------------------------
✅ Payment Successful

Thank you for using our service!
Have a safe journey 🚗
`;
};

/**
 * Entry parking ticket
 */
const buildEntryTicket = ({ plate, slot, floor, otp, entryTime }) => {
  return `
🚗 AUTONOMOUS PARKING

--------------------------------
Vehicle : ${plate}
Slot    : ${slot} | Floor ${floor}

Entry   : ${entryTime}

--------------------------------
🔐 OTP (for exit): ${otp}

⚠️ Keep this OTP safe.
You will need it to exit.

--------------------------------
Thank you & drive safely 🚗
`;
};

module.exports = { buildEntryTicket, buildPaymentReceipt };
