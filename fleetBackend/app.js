const express = require('express');
const cors = require('cors');
// const db = require('./db/db');
const userRoutes = require('./routes/userManagement');
const authRoutes = require('./routes/authentication');
const driverRoutes = require('./routes/driver');
const fleetRoutes = require('./routes/fleet');
const shopRoutes = require('./routes/shop');
const trackingRoutes = require('./routes/drivertracking');
const otpVerificationRouted = require('./routes/otpVeirification');
const orderRoutes = require('./routes/orderRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const crypto = require('crypto');


const app = express();
const port = 3011;

// Middleware to parse JSON bodies
app.use(express.json());
const corsOptions = {
  allowedHeaders: ['Origin','X-Requested-With','Content-Type', 'Authorization','Accept'], // Allowed headers
  credentials: true,
  methods:'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: false
  
};

app.use(cors(corsOptions));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/fleets', fleetRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/tracking', trackingRoutes);
app.use('/api/otp', otpVerificationRouted);
app.use('/api', orderRoutes)





app.use(errorMiddleware);
app.get('/', (req, res) => {
// const secret = crypto.randomBytes(32).toString('hex');
// console.log(secret);
  res.send('Hello World!');
});

// Sample route to fetch data from the database
// app.get('/users', (req, res) => {
//   const query = 'SELECT * FROM fltUser';
  
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       res.status(500).send('Server error');
//       return;
//     }
//     res.json(results);
//   });
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
