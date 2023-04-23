import React, { useRef, useEffect, useState } from 'react';
import './Payment.css';
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../layout/MetaData';
import { useAlert } from 'react-alert';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import EventIcon from '@material-ui/icons/Event';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutSteps from './CheckOutSteps';

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import OrderSuccess from './OrderSuccess';
import { createOrder } from '../../actions/orderAction';

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  const payBtn = useRef(null); //with reference we can access it html property

  const { cartItems, shippingInfo } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.users);

  //console.log(shippingInfo.address);
  console.log(user.user);

  console.log("orderInfo in CheckoutForm : ",orderInfo);

  //multiply with 100 inorder to convert into paisa to store in stripe
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };
  
  console.log("payment data:",paymentData);
  // console.log(' up to here1');


  console.log("cartItems:",cartItems);


  //testing
  const order={
       totalPrice: Math.round(orderInfo.totalPrice * 100),
       itemPrice:orderInfo.subtotal,
       taxPrice:orderInfo.tax,
       shippingPrice:orderInfo.shippingCharges,
       orderItems:cartItems,
       shippingInfo,
  }

  console.log("order details:",order);

//

  //for modal popUp
  const[openModel,setOpenModel]=useState(false);


  const submitHandler = async () => {  
    // e.preventDefault();
   
    payBtn.current.disabled = true;
    

    // console.log(' up to here2');

     try{
       const config={
        headers:{
            "Content-Type":"application/json",
        },
       };

       console.log("error1");

       const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
       );

       console.log("error11");

       const client_secret = data.client_secret;

       //for stripe and elements check
       if(!stripe || !elements) return;
       console.log("error2");

       const result=await stripe.confirmCardPayment(client_secret,{
        payment_method:{
            card:elements.getElement(CardNumberElement),
            billing_details:{
                name:user.user.name,
                email:user.user.email,
                address:{
                    line1:shippingInfo.address,
                    city:shippingInfo.city,
                    state:shippingInfo.state,
                    postal_code:shippingInfo.pinCode,
                    country:shippingInfo.country,
                },
            },
        },
       });

       console.log("error3");

       if(result.error){
        payBtn.current.disabled=false;
        alert.error(result.error.message);
       }else{

        if(result.paymentIntent.status==="succeeded"){
            console.log("successful payment");
            //paymentInfo 
            order.paymentInfo={
              id:result.paymentIntent.id,
              status:result.paymentIntent.status,
            };
            alert.success("successfully payment done");

            dispatch(createOrder(order));
             
            //navigate("/success");
             
             setOpenModel(true);
                  
        }else{
            alert.error("There's some issue while processing payment");
        }

       }

       console.log("error4");
     }catch(error){
        console.log("error5");
        payBtn.current.disabled=false;
        alert.error(error.response.data.message);
     }
  };


  useEffect(() => {
    
  }, [openModel]);

  

  return (
    <>
      {openModel && <OrderSuccess launchValue={true} />}

      <MetaData title='Payment' />
      <CheckOutSteps activeStep={2} />
      <div className='paymentContainer'>
        <form className='paymentForm' onSubmit={e => submitHandler(e)}>
          <Typography>Card Info</Typography>

          <div>
            <CreditCardIcon />
            <CardNumberElement className='paymentInput' />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className='paymentInput' />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className='paymentInput' />
          </div>

          <input
            type='submit'
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className='paymentFormBtn'
          />
        </form>
      </div>
    </>
  );
};

export default CheckoutForm;
