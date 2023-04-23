import {ADD_TO_CART,
      REMOVE_FROM_CART,
      SAVE_SHIPPING_INFO
    } from '../constants/CartContant';
import axios from 'axios';


// Add to cart 
export const addItemToCart = (id, quantity) => async (dispatch,getState) => {
  
      const { data } = await axios.get(`/api/v1/product/${id}`)

      dispatch({
        type:ADD_TO_CART,
        payload:{
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.images[0].url,
            //stock:data.product.stock,
            quantity,
        },
      });

      localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))

}
  
//Remove from cart
export const removeItemFromCart=(id)=>async(dispatch,getState)=>{
  console.log("from   action",id);
  dispatch({
    type:REMOVE_FROM_CART,
    payload:id,
  })

  localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))

}

//SaveshippingInfo
export const SaveshippingInfo=(data)=>async(dispatch)=>{
  dispatch({
    type:SAVE_SHIPPING_INFO,
    payload:data,
  });

  localStorage.setItem("shippingInfo",JSON.stringify(data))

}