const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDb } = require('./config/db');
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/auth', authRoutes);
app.use('/api/notes', noteRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

async function start() {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  await connectDb();
  app.listen(port, () => {
    console.log(`🚀 Backend running on http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error('Failed to start server:', error.message);
  process.exit(1);
});
