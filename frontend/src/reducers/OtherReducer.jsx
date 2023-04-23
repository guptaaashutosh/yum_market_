import {
  ALL_OTHERS_DETAILS_FAIL,
  ALL_OTHERS_DETAILS_REQUEST,
    ALL_OTHERS_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_OTHERS_DETAILS_FAIL,
  DELETE_OTHERS_DETAILS_REQUEST,
  DELETE_OTHERS_DETAILS_RESET,
  DELETE_OTHERS_DETAILS_SUCCESS,
  OTHERS_DETAILS_FAIL,
    OTHERS_DETAILS_REQUEST,
    OTHERS_DETAILS_RESET,
    OTHERS_DETAILS_SUCCESS,
    SLIDER_DETAILS_FAIL,
    SLIDER_DETAILS_REQUEST,
    SLIDER_DETAILS_SUCCESS,
    SLIDER_UPDATE_FAIL,
    SLIDER_UPDATE_REQUEST,
    SLIDER_UPDATE_RESET,
    SLIDER_UPDATE_SUCCESS,
} from '../constants/OtherConstant';




//new slider reducer  //admin
export const newSliderReducer = (state = {slider:{}}, action) => {
  switch (action.type) {
    case OTHERS_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      };

    case OTHERS_DETAILS_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        slider: action.payload.slider
      };

    case OTHERS_DETAILS_RESET:
      return {
        loading: false,
        success: false
      };

    case OTHERS_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
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


//get all slider reducer
export const getSliderReducer = (state = {slider: [] }, action) => {
  switch (action.type) {
    case ALL_OTHERS_DETAILS_REQUEST:
      return {
        loading: true,
        ...state
      };
    case ALL_OTHERS_DETAILS_SUCCESS:
      return {
        loading: false,
        slider: action.payload.slider
      };
    case ALL_OTHERS_DETAILS_FAIL:
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

//delete slider reducer --admin
export const deleteSliderReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_OTHERS_DETAILS_REQUEST:
      return {
        loading: true,
        ...state
      };
    case DELETE_OTHERS_DETAILS_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload.success
      };
    case DELETE_OTHERS_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DELETE_OTHERS_DETAILS_RESET:
      return {
        loading: false,
        isDeleted: false
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


//for single slider details 
export const singleSliderDetailsReducer=(state={slider:{}},action)=>{
    switch (action.type) {
      case SLIDER_DETAILS_REQUEST:
        return {
          ...state,
          loading: true
        };

      case SLIDER_DETAILS_SUCCESS:
        return {
          loading: false,
          slider: action.payload.slider
        };

      case SLIDER_DETAILS_FAIL:
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
}


//update slider reducer
//delete slider reducer --admin
export const updateSliderReducer = (state = {}, action) => {
  switch (action.type) {
    case SLIDER_UPDATE_REQUEST:
      return {
        loading: true,
        ...state
      };
    case SLIDER_UPDATE_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload.success
      };
    case SLIDER_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case SLIDER_UPDATE_RESET:
      return {
        loading: false,
        isUpdated: false
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
