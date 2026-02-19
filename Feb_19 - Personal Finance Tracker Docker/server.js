// server.js
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

app.get('/', (req, res) => {
  res.send('Personal Finance Tracker API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Connected to database at ${DB_URL}`);
});