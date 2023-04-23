const dotenv = require('dotenv');
//config
dotenv.config({ path: 'backend/config/config.env' });

const catchAsyncErrors = require('../middleware/catchAsyncError');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//razorpay
const Razorpay = require('razorpay');
const crypto = require('crypto');
const generateIvoice = require('../Invoice-generator/generateInvoice');
const { setTimeout } = require('timers');
// console.log(process.env.RAZORPAY_API_KEY);
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET
});
//

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.body.amount);

  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'inr',
    metadata: {
      company: 'Yum Market'
    }
  });

  //console.log(myPayment);
  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret
  });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY
  });

  console.logi(process.env.STRIPE_API_KEY);
});

//Razorpay
//payment checkout
exports.paymentCheckout = async (req, res) => {
  console.log('body in paymentCheckout : ', req.body);
  const { amountToPay } = req.body;
  //console.log(Number(amountToPay));
  //error occur when the amount is in decimal //solve that

  try {
    const options = {
      amount: Number(amountToPay), // amount in the smallest currency unit - paisa
      currency: 'INR'
      //   receipt: 'order_rcptid_11'
    };
    const order = await instance.orders.create(options);

    if (!order) {
      //console.log('here is error1');
       res.status(500).json({
         success: false,
         message:"Cannot order the item.please try again"
       });
    }

    res.status(200).json({
      success: true,
      order
    });

    console.log('order in paymentCheckout : ', order);

  } catch (error) {
    console.log(`Error : ${error}`);
  }
};

//

//payment verification
exports.paymentVerification = async (req, res) => {
  console.log('body in paymentverification :', req.body);

  //req.body gives
  //   {
  //   razorpay_payment_id: 'pay_LT5DnqDs9hyPZR',
  //   razorpay_order_id: 'order_LT5DS2PZoHwHUT',
  //   razorpay_signature: 'a2843581777c2417c2ae52373002ff3b602367d0e04bd0562414d0d7735648b1'
  // }

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  // payment verification

  //Creating a signature in  server using the following attributes:

  const body = razorpay_order_id + '|' + razorpay_payment_id;

  //Use the SHA256 algorithm, the razorpay_payment_id and
  //the order_id to construct a HMAC hex digest as shown below

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest('hex');

  //both signature which we have recieved and which is generated from secret key should be same to verify
  console.log('sig received ', razorpay_signature);
  console.log('sig generated ', expectedSignature);

  const verifyPayment = expectedSignature === razorpay_signature;

  if (verifyPayment) {
    //save in database

    //  res.status(200).json({
    //    success: true,
    //    message:"payment successfull"
    //  });
    console.log('payment verified');

     //generateIvoice(razorpay_payment_id);

    //redirect to frontend success page
    // res.redirect(
    //   `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    // );

   

    //for production
    res.redirect(
      `/paymentsuccess?reference=${razorpay_payment_id}`
    );

  } else {
    res.status(400).json({
      success: false,
      message: 'payment fail'
    });

    console.log('payment failed');
  }
};
