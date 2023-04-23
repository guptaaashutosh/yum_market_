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


//for new order 
export const newOrderReducer=(state={order:[]},action)=>{
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading:true,
            }
        
        case CREATE_ORDER_SUCCESS:
            return {
                loading:false,
                order:action.payload,
            }
        case CREATE_ORDER_FAIL:
            return {
                loading:false,
                error:action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null,
            }

        default:
            return state;
     }
}


//for my order 
export const myOrderReducer=(state={orders:[]},action)=>{
    switch (action.type) {
        case MY_ORDER_REQUEST:
            return {
                loading:true,
            }
        
        case MY_ORDER_SUCCESS:
            return {
                loading:false,
                orders:action.payload,
            }
        case MY_ORDER_FAIL:
            return {
                loading:false,
                error:action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null,
            }

        default:
            return state;
     }
}



//for single order details 
export const myOrderDetailsReducer=(state={order:{}},action)=>{
    switch (action.type) {
      
        case ORDER_DETAILS_REQUEST:
            return {
                loading:true,
            }
        
        case ORDER_DETAILS_SUCCESS:
            return {
                loading:false,
                order:action.payload,
            }
      
        case ORDER_DETAILS_FAIL:
            return {
                loading:false,
                error:action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null,
            }

        default:
            return state;
     }
}



//get all orders // admin  reducer
export const getAllOrdersReducer = (state = {adminOrders: [] }, action) => {
    switch (action.type) {
      case ADMIN_ORDER_REQUEST:
        return {
          loading: true,
          ...state
        };
      case ADMIN_ORDER_SUCCESS:
        return {
          loading: false,
          adminOrders: action.payload
        };
      case ADMIN_ORDER_FAIL:
        return {
          loading: false,
          error: action.payload
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null
        };
  
      default:
        return state;
    }
  };


//update order action // admin  reducer
export const updateOrderReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_ORDER_REQUEST:
        return {
          loading: true,
          ...state
        };
      case UPDATE_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload.success
        };
      case UPDATE_ORDER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };

      case UPDATE_ORDER_RESET:
            return {
              ...state,
              loading: false,
              isUpdated: false,
            };
            
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null
        };
  
      default:
        return state;
    }
  };
  
  
//delete order action // admin  reducer
export const deleteOrderReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_ORDER_REQUEST:
        return {
          loading: true,
          ...state
        };
      case DELETE_ORDER_SUCCESS:
        return {
          loading: false,
          isDeleted: action.payload.success
        };
      case DELETE_ORDER_FAIL:
        return {
          loading: false,
          error: action.payload
        };

      case DELETE_ORDER_RESET:
            return {
              loading: false,
              isDeleted: false,
         };

      case CLEAR_ERRORS:
        return {
          ...state,
          error: null
        };
  
      default:
        return state;
    }
  };
  