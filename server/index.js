const express = require('express');
const cors = require('cors');
require('dotenv').config();
const twilio = require('twilio');

const session = require('express-session');
const mongoose=require("mongoose")
const { getDatabaseConnection } = require('./config/db');

const adminrouter = require('./routers/adminRoutes');
const superadminrouter = require('./routers/superadminRoute');
const telecallerroute = require('./routers/telecallerRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  const { database } = req.headers; 
  if (!database) {
    return res.status(400).json({ message: 'Database name is required in headers.' });
  }

  try {
    console.log(database)
    req.db = getDatabaseConnection(database)
    next();
  } catch (error) {
    console.error('Error connecting to database:', error);
    res.status(500).json({ message: 'Database connection error.' });
  }
});

app.use('/api/superadmin', superadminrouter);
app.use('/api/admin', adminrouter);
app.use('/api/telecaller', telecallerroute);

app.listen(8000, () => {
  console.log('Server running on http://localhost:8000');
});
