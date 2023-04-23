import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,

  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_RESET,
  NEW_REVIEW_FAIL,

  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  ALL_REVIEW_RESET,

  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,

  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_RESET,
  NEW_PRODUCT_FAIL,

  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,

  ADMIN_DELETE_PRODUCT_REQUEST,
  ADMIN_DELETE_PRODUCT_SUCCESS,
  ADMIN_DELETE_PRODUCT_FAIL,
  ADMIN_DELETE_PRODUCT_RESET,

  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,

  CLEAR_ERRORS
} from '../constants/ProductConstants';

export const productDetailReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.AllProducts
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.AllProducts
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

//product review reducer
export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {

    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true
      };

    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload
      };
      
    case NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case NEW_REVIEW_RESET:
      return {
        loading: false,
        success: false,
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


//new product reducer  //admin
export const newProductReducer = (state = {product:{}}, action) => {
  switch (action.type) {

    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true
      };

    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product:action.payload.product,
      };
      
    case NEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case NEW_PRODUCT_RESET:
      return {
        loading: false,
        success: false,
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



//get all admin products reducer
export const adminProductReducer = (state = {products: [] }, action) => {
  switch (action.type) {
    case ADMIN_PRODUCT_REQUEST:
      return {
        loading: true,
        ...state
      };
    case ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.adminProducts
      };
    case ADMIN_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.adminProducts
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



//delete product reducer --admin
export const deleteAdminProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETE_PRODUCT_REQUEST:
      return {
        loading: true,
        ...state
      };
    case ADMIN_DELETE_PRODUCT_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload.success
      };
    case ADMIN_DELETE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case ADMIN_DELETE_PRODUCT_RESET:
        return {
          loading: false,
          isDeleted:false,
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



//update product reducer --admin
export const updateAdminProductReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return {
        loading: true,
        ...state
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload.success
      };
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case UPDATE_PRODUCT_RESET:
        return {
          loading: false,
          isUpdated:false,
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



//all product review reducer //admin
export const productsReviewReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
      return {
        loading: true,
        ...state
      };
    case ALL_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload
      };
    case ALL_REVIEW_FAIL: 
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case ALL_REVIEW_RESET:
        return {
          ...state,
          loading: false,
          reviews:null
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


// delete/update review reducer  //admin
export const reviewActionReducer = (state = { }, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        loading: true,
        ...state
      };

    case DELETE_REVIEW_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload.success
      };

    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case DELETE_REVIEW_RESET:
        return {
          ...state,
          loading: false,
          isDeleted:false,
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