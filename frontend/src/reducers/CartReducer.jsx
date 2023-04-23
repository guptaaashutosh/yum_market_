import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SAVE_SHIPPING_INFO
 } from '../constants/CartContant';


export const cartReducer=( state ={cartItems:[],shippingInfo:{}},action)=>{
     switch (action.type) {
        case ADD_TO_CART:
            const item=action.payload;

            //to check is present in cartItems(state)
            const isItemExit=state.cartItems.find(
                (i)=> i.product===item.product  //product is productId
            );

            if(isItemExit){
                return {
                    ...state,
                    cartItems:state.cartItems.map((i)=>
                        i.product === isItemExit.product ? item : i
                    )
                }

            }else{
                return {
                    ...state,
                    cartItems:[...state.cartItems,item]
                }
            }
        
        case REMOVE_FROM_CART:
            return{
                    ...state,
                    //add all items except remove product (through it id)
                    cartItems:state.cartItems.filter((i)=>i.product !== action.payload)

            }
            
            case SAVE_SHIPPING_INFO:
                return{
                    ...state,
                    shippingInfo:action.payload,
                }

        default:
            return state;
     }
}