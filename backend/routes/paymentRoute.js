const express = require('express');
const {
  processPayment,
  sendStripeApiKey,
  paymentCheckout,
  paymentVerification
} = require('../controllers/paymentController');
const router = express.Router();
const { isAuthenticateUser } = require('../middleware/auth');

// router.route('/payment/process').post(isAuthenticateUser, processPayment);
// router.route('/stripeapikey').get(isAuthenticateUser, sendStripeApiKey);

//razorpay
router.route('/checkout').post(paymentCheckout);
router.route('/paymentverification').post(paymentVerification);

module.exports = router;
