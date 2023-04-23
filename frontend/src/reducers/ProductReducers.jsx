import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
      
    CLEAR_ERRORS} 
    from '../constants/ProductConstants';

    //Reducer take and previous state and action and 
    //then provide new state with action
const ProductReducer=(state={products:[]} ,action)=>{

    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
               loading:true,
               products:[],
            };
        case ALL_PRODUCT_SUCCESS:
            return {
               loading:false,
               products:action.productTest.products,
               productCount:action.productTest.productCount,
               resultPerPage:action.productTest.resultPerPage,
               filterProductCount:action.productTest.filterProductCount,
            };
        case ALL_PRODUCT_FAIL:
            return {
               loading:false,
               error:action.productTest,
            };
        case CLEAR_ERRORS:
            return {
               ...state,
               error:null,

            };
    
        default:
            return state;
    }
};

export default ProductReducer;


