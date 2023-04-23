const Order = require('../models/orderModel');
const PDFDocument = require('pdfkit');
const nodeMailer = require('nodemailer');
const cloudinary = require('cloudinary');

const fs = require('fs');
const path = require('path');
const { options } = require('pdfkit');

const dotenv = require('dotenv');
dotenv.config({ path: 'backend/config/config.env' });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio_phone = process.env.TWILIO_PHONE_NO;
const client = require('twilio')(accountSid, authToken);


//send message here
const sendMessage = orderDetails => {
  const userPhone = orderDetails.shippingInfo.phoneNo;
  console.log('orders details  : ',orderDetails)

  const messageBody = `Hello,${orderDetails.user.name} your order of Rs:${orderDetails.totalPrice/100} has been placed successfully.
           Thankyou`

  client.messages
    .create({
      body: `${messageBody}`,
      from: `${twilio_phone}`,
      to: `+91${userPhone}`
    })
    .then(message => console.log(message.sid));
  
  client.calls.create({
     url: 'http://demo.twilio.com/docs/voice.xml',
    // twiml: '<Response><Say>Ahoy, World!</Say></Response>',
    from: `${twilio_phone}`,
    to: `+91${userPhone}`
  }); 
  
};



const sendEmail = async options => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    secure: true,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    content: options.content,
    text: options.message
    //attachments: [options.attachments]
  };

  await transporter.sendMail(mailOptions);
};

//order confirmation mail to user
exports.orderConfirmationMail = async order => {
  const orderDetails = await Order.findById(order._id).populate(
    'user',
    'name email avatar'
  );

  //console.log('order details in orderConfirmationMail : ', orderDetails);

  const message = `
    Dear ${orderDetails && orderDetails.user.name},

    We’re happy to let you know that we’ve received your order.Your order details can be found below.

    ---------------------------- Order Information ----------------------------
       Order Status      :       ${orderDetails && orderDetails.orderStatus}
       Shipping Price    :       ${orderDetails && orderDetails.shippingPrice}
       Tax               :       ${orderDetails && orderDetails.taxPrice}
       Total Price       :       ${
         orderDetails && orderDetails.totalPrice / 100
       }
    ---------------------------------------------------------------------------------

    ---------------------------- Payment Information -------------------------- 
       Payment ID        :       ${orderDetails && orderDetails.paymentInfo.id}
       Payment Status    :       ${
         orderDetails && orderDetails.paymentInfo.status
       } 
    -----------------------------------------------------------------------------------

    Your package is on its way!

    Please feel free to contact for any queries and clarifications.
    Contact : customercare@yum.market.com
                             
                                    🧡ThankYou🧡

    `;

  sendEmail({
    email: `${orderDetails && orderDetails.user.email}`,
    subject: `Order confirmation Yum Market (${
      orderDetails && orderDetails.paymentInfo.id
    })`,
    content: `Payment ID : ${orderDetails && orderDetails.paymentInfo.id}`,
    message: message
  });

  sendMessage(orderDetails);
};
















// exports.generateIvoice = async order => {
//   const orderDetails = await Order.findById(order._id).populate(
//     'user',
//     'name email avatar'
//   );

//   console.log('order details in generate invoice : ', orderDetails);

//   //generate pdf and mail here
//   const doc = new PDFDocument();

//   // Pipe its output somewhere, like to a file or HTTP response
//   // See below for browser usage
//   const res1 = doc.pipe(
//     fs.createWriteStream(`${orderDetails && orderDetails.user.name}.pdf`)
//   );

//   //console.log("res1 : ", res1.path);

//   // Adding functionality
//   doc
//     .fontSize(40)
//     .text(
//       `Yum Market`,
//       {
//         align: 'center'
//       },
//       200,
//       65
//     )
//     .moveDown(0.1);

//   doc.fontSize(20).text(`Shipping Information`, {
//     width: 250,
//     align: 'left'
//   });

//   doc
//     .fontSize(10)
//     .text(
//       `Address      :  ${orderDetails && orderDetails.shippingInfo.address},${
//         orderDetails && orderDetails.shippingInfo.city
//       },${orderDetails && orderDetails.shippingInfo.pinCode},${
//         orderDetails && orderDetails.shippingInfo.state
//       },${orderDetails && orderDetails.shippingInfo.phoneNo}
//       `,
//       {
//         width: 400,
//         align: 'left'
//       }
//     )
//     .moveDown(0.1);

//   doc.fontSize(20).text(`Order Items`, {
//     width: 250,
//     align: 'left'
//   });

//   doc
//     .fontSize(10)
//     .text(
//       `Name        :       ${orderDetails && orderDetails.orderItems[0].name}
//            Price       :       ${
//              orderDetails && orderDetails.orderItems[0].price
//            }
//            quantity    :       ${
//              orderDetails && orderDetails.orderItems[0].quantity
//            }
//       `,
//       {
//         width: 250,
//         lineBreak: true,
//         align: 'left'
//       }
//     )
//     .moveDown(0.1);

//   doc.fontSize(20).text(`Payment Information`, {
//     width: 250,
//     align: 'left'
//   });

//   doc
//     .fontSize(10)
//     .text(
//       `Payment ID        :       ${orderDetails && orderDetails.paymentInfo.id}
//            Payment Status    :       ${
//              orderDetails && orderDetails.paymentInfo.status
//            }
//           `,
//       {
//         width: 250,
//         lineBreak: true,
//         align: 'left'
//       }
//     )
//     .moveDown(0.1);

//   doc.fontSize(20).text(`Order Information`, {
//     width: 250,
//     align: 'left'
//   });

//   doc
//     .fontSize(10)
//     .text(
//       `Order Status      :       ${orderDetails && orderDetails.orderStatus}
//        Shipping Price    :       ${orderDetails && orderDetails.shippingPrice}
//        Total Price       :       ${
//          orderDetails && orderDetails.totalPrice / 100
//        }`,
//       {
//         width: 250,
//         lineBreak: true,
//         align: 'left'
//       }
//     )
//     .moveDown(0.1);

//   doc
//     .fillColor('blue')
//     .text('Visit - Yum Market', 100, 100)
//     .link(100, 100, 160, 27, 'https://yum-market-a5mz.vercel.app/');

//   doc.fontSize(20).fillColor('green').text(`ThankYou`, {
//     align: 'center'
//   });

//   //before sending mail uploadfile in cloudinary and get url to attach
//   //console.log(doc.res);

//   // const result = await cloudinary.v2.uploader.upload(doc.toString('base64'), {
//   //   folder: 'Invoices'
//   // });

//   // console.log('pdf url  cloudinary : ', result);

//   // Finalize PDF file
//   doc.end();

//   //   const message = `
//   //     Dear ${orderDetails && orderDetails.user.name},

//   //     We’re happy to let you know that we’ve received your order.Your order details can be found below.

//   //     ---------------------------- Order Information ----------------------------
//   //        Order Status      :       ${orderDetails && orderDetails.orderStatus}
//   //        Shipping Price    :       ${orderDetails && orderDetails.shippingPrice}
//   //        Tax               :       ${orderDetails && orderDetails.taxPrice}
//   //        Total Price       :       ${
//   //          orderDetails && orderDetails.totalPrice / 100
//   //        }
//   //     ---------------------------------------------------------------------------------

//   //     ---------------------------- Payment Information --------------------------
//   //        Payment ID        :       ${orderDetails && orderDetails.paymentInfo.id}
//   //        Payment Status    :       ${
//   //          orderDetails && orderDetails.paymentInfo.status
//   //        }
//   //     -----------------------------------------------------------------------------------

//   //     Your package is on its way!

//   //     Please feel free to contact for any queries and clarifications.
//   //     Contact : customercare@yum.market.com

//   //                                     🧡ThankYou🧡

//   //     `;

//   //   sendEmail({
//   //     email: `${orderDetails && orderDetails.user.email}`,
//   //     subject: `Order confirmation Yum Market (${
//   //       orderDetails && orderDetails.paymentInfo.id
//   //     })`,
//   //     content: `Payment ID : ${orderDetails && orderDetails.paymentInfo.id}`,
//   //     message: message
//   //   });
//   // };
// };
