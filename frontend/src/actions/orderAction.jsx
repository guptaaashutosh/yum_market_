import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ADMIN_ORDER_REQUEST,
    ADMIN_ORDER_SUCCESS,
    ADMIN_ORDER_FAIL,

    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_RESET,

    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_RESET,
    

    CLEAR_ERRORS
} from '../constants/OrderConstant';


import axios from 'axios';

//create order action
export const createOrder=(order)=>async (dispatch)=>{
     try{
        dispatch({type:CREATE_ORDER_REQUEST});
        const config={
            Headers:{
                "Content-Type":"application/json",
            },
        };

        const {data} =await axios.post(
            "api/v1/order/new",order,config,
        )

        dispatch({
            type:CREATE_ORDER_SUCCESS,
            payload:data,
        })

     }catch(error){
        dispatch({
            type:CREATE_ORDER_FAIL,
            payload:error.response.data.message,
        })
     }
}


//my order action
export const myOrders=()=>async (dispatch,getState)=>{
    try{
       dispatch({type:MY_ORDER_REQUEST});

       const {data} =await axios.get(
           "api/v1/orders/me"
       )

    //    const data2=JSON.parse(data);
    //    console.log(data2.orders);

       dispatch({
           type:MY_ORDER_SUCCESS,
           payload:data.orders,
       })

    }catch(error){
       dispatch({
           type:MY_ORDER_FAIL,
           payload:error.response.data.message,
       })
    }
};



//my single order details action
export const OrderDetails=(id)=>async (dispatch)=>{
    try{
       dispatch({type:ORDER_DETAILS_REQUEST});

       console.log("id",id);

       //here is problem on call link 12:01
       const {data} =await axios.get(`/api/v1/order/${id}`);  

    //    const data2=JSON.parse(data);
    //    console.log(data2.orders);

       dispatch({
           type:ORDER_DETAILS_SUCCESS,
           payload:data.order,
       })

    }catch(error){
       dispatch({
           type:ORDER_DETAILS_FAIL,
           payload:error.response.data.message,
       })
    }
};


//all orders action //admin
export const allOrders=()=>async (dispatch)=>{
    try{
       dispatch({type:ADMIN_ORDER_REQUEST});

       const {data} =await axios.get(
           "/api/v1/admin/orders"
       )

       dispatch({
           type:ADMIN_ORDER_SUCCESS,
           payload:data.orders,
       })

    }catch(error){
       dispatch({
           type:ADMIN_ORDER_FAIL,
           payload:error.response.data.message,
       })
    }
};

//13:55:14
//update  order //admin action
export const updateOrder=(updatedOrderData,id)=>async (dispatch)=>{
    try{
       dispatch({type:UPDATE_ORDER_REQUEST});
       const config={
           Headers:{
               "Content-Type":"application/json",
           },
       };

       console.log(updatedOrderData);

       const {data} =await axios.put(
        `/api/v1/admin/order/${id}`,
        updatedOrderData,
        config,
       )

       dispatch({
           type:UPDATE_ORDER_SUCCESS,
           payload:data,
       })

    }catch(error){
       dispatch({
           type:UPDATE_ORDER_FAIL,
           payload:error.response.data.message,
       })
    }
}



//delete order // admin action
export const deleteOrder=(id)=>async (dispatch)=>{
    try{
       dispatch({type:DELETE_ORDER_REQUEST});

       const {data} =await axios.delete(`/api/v1/admin/order/${id}`);  

       dispatch({
           type:DELETE_ORDER_SUCCESS,
           payload:data,
       })

    }catch(error){
       dispatch({
           type:DELETE_ORDER_FAIL,
           payload:error.response.data.message,
       })
    }
};


//Clearing errors
export const clearErrors = () => async dispatch => {
    dispatch({ type: CLEAR_ERRORS });
  };