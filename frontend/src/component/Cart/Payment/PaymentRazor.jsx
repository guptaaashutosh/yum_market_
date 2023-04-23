import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import MetaData from '../../layout/MetaData';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CheckOutSteps from '../CheckOutSteps';

const PaymentRazor = () => {
  //const dispatch = useDispatch();

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

  const { cartItems, shippingInfo } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.users);



   const subtotal = cartItems.reduce(
     (acc, item) => acc + item.quantity * item.price,
     0
   );

   //if subtotal less than 500 then 30 rs shipping charges
   const shippingCharges = subtotal > 500 ? 0 : 30;

   const tax = subtotal * 0.18;

   const totalPrice = subtotal + shippingCharges + tax;

   const address = `${shippingInfo.address},${shippingInfo.city},
                 ${shippingInfo.pinCode},${shippingInfo.state},${shippingInfo.country}`;

  



  //console.log(shippingInfo.address);
  //   console.log(user.user.email);

  //console.log('user data in payment : ', user.user);

     //console.log('orderInfo in paymentRazor : ', orderInfo);

  //multiply with 100 inorder to convert into paisa to store in stripe
  //   const paymentData = {
  //     amount: Math.round(orderInfo.totalPrice * 100)
  //   };

  //   console.log('payment data:', paymentData);
  // console.log(' up to here1');

  //   console.log('cartItems:', cartItems);

  //testing
  const order = {
    totalPrice: Math.round(orderInfo.totalPrice * 100),
    itemPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    orderItems: cartItems,
    shippingInfo
  };

  //console.log('order details:', order);

  const checkOutHandler = async amount => {
    console.log('amount to be pay : ', Math.round(amount * 100));
    const amountToPay = Math.round(amount * 100);

    

    //console.log(window);

    const keyData = await axios.get('api/getkey');
    //console.log("keyData : ", keyData.data.key)
   

    const { data } = await axios.post(`api/v1/checkout`, {
      amountToPay
    });

    //   console.log('data : ', data);
    console.log('data order : ', data.order.amount);
    // console.log('image url : ', user.user.avatar.url);

    var options = {
      key: keyData.data.key, // Enter the Key ID generated from the Dashboard
      amount: data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: user.user.name,
      description: 'YUM MARKET',
      image: `${user.user.avatar.url}`,
      order_id: data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: '/api/v1/paymentverification',
      // callback_url: 'http://localhost:8000/api/v1/paymentverification',
      prefill: {
        name: user.user.name, //user name
        email: user.user.email, //user email
        contact: '9900000000' //user contact no
      },
      notes: {
        address: 'Yum Market Corporate Office'
      },
      theme: {
        color: '#cc6600'
      }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <MetaData title='Payment' />

      <CheckOutSteps activeStep={1} />

      <div className='confirmOrderPage'>
        <div>
          <div className='confirmshippingArea'>
            <Typography>Shipping Info</Typography>
            <div className='confirmshippingAreaBox'>
              <div>
                <p>Name:</p>
                <span>{user.user.name}</span>
              </div>
              <div>
                <p>Phone No:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Pin Code:</p>
                <span>{shippingInfo.pinCode}</span>
              </div>
              <div>
                <p>City:</p>
                <span>{shippingInfo.city}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>

          <div className='confirmCartItems'>
            <Typography>Your Cart Items</Typography>
            <div className='confirmCartItemsContainer'>
              {cartItems &&
                cartItems.map(item => (
                  <div key={item.productId}>
                    <img src={item.image} alt={item.name} />
                    <Link to={`product/${item.productId}`}>{item.name}</Link>
                    <span>
                      {item.quantity} X {item.price} ={' '}
                      <b>Rs:{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div>
          <div className='orderSummary'>
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>Rs:{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>Rs:{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>Rs:{tax}</span>
              </div>
            </div>

            <div className='orderSummaryTotal'>
              <p>
                <b>Total:</b>
              </p>
              <span>Rs:{totalPrice}</span>
            </div>

            <input
              type='submit'
              value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
              onClick={() => checkOutHandler(orderInfo.totalPrice)}
              className='paymentFormBtn'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentRazor;
