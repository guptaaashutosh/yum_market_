import React,{useRef,useEffect,useState} from 'react';
import './Payment.css';
import { useSelector,useDispatch } from 'react-redux';
import MetaData from '../layout/MetaData';
import { useAlert } from 'react-alert';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import EventIcon from '@material-ui/icons/Event';
import VpnKeyIcon from '@material-ui/icons/VpnKey';


import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
  } from '@stripe/react-stripe-js';

import CheckOutSteps from './CheckOutSteps';
import CheckoutForm from './CheckOutForm';

function Payment() {



    const alert=useAlert();

    const [stripeApiKey, setStripeApiKey] = useState("");
  
    async function getStripeApiKey(){
      const {data}=await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey); 
    }
  
    console.log(stripeApiKey);
  
    //for user authentication during start of app
    useEffect(() => {

      getStripeApiKey();
  
    }, []);

  return (
    <>
            <Elements stripe={loadStripe(stripeApiKey)} >
              <CheckoutForm/>
            </Elements>
    
    </>
  )
}

export default Payment
