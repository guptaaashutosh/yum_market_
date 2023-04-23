import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import CheckOutSteps from './CheckOutSteps';
import './ConfirmOrder.css';
import PaymentModal from './Payment/PaymentModal';




// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure
// } from '@chakra-ui/react';
// import PaymentRazor from './Payment/PaymentRazor';


function ConfirmOrder() {


    const navigate=useNavigate();

    const{shippingInfo,cartItems}=useSelector((state)=>state.cart);
    const{user}=useSelector( (state) => state.users.user);


    const subtotal=cartItems.reduce(
        (acc,item)=>acc+item.quantity*item.price,
        0
    );

    //if subtotal less than 500 then 30 rs shipping charges
    const shippingCharges=subtotal> 500 ? 0 : 30;

    const tax=subtotal*0.18;

    const totalPrice=subtotal+shippingCharges+tax;

    const address=`${shippingInfo.address},${shippingInfo.city},
                 ${shippingInfo.pinCode},${shippingInfo.state},${shippingInfo.country}`

  
  
    const proceedToPayment=()=>{
        const data={
            subtotal,
            shippingCharges,
            tax,
            totalPrice
        };

        sessionStorage.setItem("orderInfo",JSON.stringify(data));
        
        // navigate("/payment");

        //for razorpay
       navigate('/payment');
        
    }

  return (
    <>
     
      <MetaData title='Confirm Order' />
      <CheckOutSteps activeStep={1} />

      <div className='confirmOrderPage'>
        <div>
          <div className='confirmshippingArea'>
            <Typography>Shipping Info</Typography>
            <div className='confirmshippingAreaBox'>
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
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

            <button onClick={proceedToPayment}>Proceed To Payment</button>

          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmOrder;