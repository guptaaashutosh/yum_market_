const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
// const dotenv=require('dotenv');

const path = require('path');

const errorMiddleware = require('./middleware/error');

//config
//for production check
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({ path: 'backend/config/config.env' });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//route imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');
const others = require('./routes/otherRoute');

app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', payment);
app.use('/api/v1', others);

console.log(process.env.RAZORPAY_API_KEY);

app.get('/api/getkey', (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
});

//YOUR_SERVICE_ID
app.get('/api/getServiceId', (req, res) => {
  res.status(200).json({ key: process.env.YOUR_SERVICE_ID });
});

//YOUR_TEMPLATE_ID
app.get('/api/getTempId', (req, res) => {
  res.status(200).json({ key: process.env.YOUR_TEMPLATE_ID });
});

//YOUR_PUBLIC_KEY
app.get('/api/getPublicId', (req, res) => {
  res.status(200).json({ key: process.env.YOUR_PUBLIC_KEY });
});

//production build configuration
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
});

//Middleware for error
app.use(errorMiddleware);

module.exports = app;
