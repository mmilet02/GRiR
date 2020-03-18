const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const tableTypes = require('./routes/tableTypes.js');
const floorPlans = require('./routes/floorPlans.js');
const restoraunts = require('./routes/Restoraunt.js');
const auth = require('./routes/auth.js');
const connectDB = require('./config/db.js');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

app.use(express.json());

app.use('/api/tableTypes', tableTypes);
app.use('/api/floorPlans', floorPlans);
app.use('/api/restoraunts', restoraunts);
app.use('/api/auth', auth);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Server started in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
