const express = require('express');
const cors = require('cors');

// const authRoutes = require("./routes/auth.routes");

const app = express();

// FIXME: REMOVE this before production deploy to vercel - does not need .listen() method.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Local server running at http://localhost:${PORT}`);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(cors());
app.use(express.json());

// app.use('/api/auth', authRoutes);

// (async () => {
//   await initSchema();
// })();

module.exports = app;