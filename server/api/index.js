const express = require("express");
const cors = require("cors");
const adminRoutes = require("./routes/admin.routes.js");
const gateRoutes = require("./routes/gate.routes.js");
const plateRoutes = require("./routes/plate.routes.js");

const app = express();

// FIXME: REMOVE this before production deploy to vercel - does not need .listen() method.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Local server running at http://localhost:${PORT}`);
});

app.get("/api/health", (req, res) => {
  res.json({ status: "APS API Running" });
});

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/gate", gateRoutes);
app.use("/api", plateRoutes)

// (async () => {
//   await initSchema();
// })();

module.exports = app;
