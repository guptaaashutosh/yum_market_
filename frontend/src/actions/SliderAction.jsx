import axios from 'axios';
import {
  ALL_OTHERS_DETAILS_FAIL,
  ALL_OTHERS_DETAILS_REQUEST,
  ALL_OTHERS_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  OTHERS_DETAILS_FAIL,
  OTHERS_DETAILS_REQUEST,
  OTHERS_DETAILS_SUCCESS,
  DELETE_OTHERS_DETAILS_FAIL,
  DELETE_OTHERS_DETAILS_REQUEST,
  DELETE_OTHERS_DETAILS_SUCCESS,
  SLIDER_DETAILS_FAIL,
  SLIDER_DETAILS_REQUEST,
  SLIDER_DETAILS_SUCCESS,
  SLIDER_UPDATE_FAIL,
  SLIDER_UPDATE_REQUEST,
  SLIDER_UPDATE_RESET,
  SLIDER_UPDATE_SUCCESS
} from '../constants/OtherConstant';

export const createSlider = sliderData=>async dispatch => {
  //slider
    try {
      dispatch({ type: OTHERS_DETAILS_REQUEST });

      const config = {
        Headers: {
          'Content-Type': 'application/json'
        }
      };

      const { data } = await axios.post(
        `/api/v1/admin/slider`,
        sliderData,
        config
        );
        
        console.log("data in slider action : ", data);

      dispatch({
        type: OTHERS_DETAILS_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: OTHERS_DETAILS_FAIL,
        payload: error.response.data.message
      });
    }
   
};



//getSlider 

export const getAllSlider = () => async dispatch => {
  //slider
  try {
    dispatch({ type: ALL_OTHERS_DETAILS_REQUEST });


    const { data } = await axios.get(`/api/v1/admin/slider`);

    //console.log('data in allslider action : ', data);

    dispatch({
      type: ALL_OTHERS_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ALL_OTHERS_DETAILS_FAIL,
      payload: error.response.data.message
    });
  }
};


//delete slider action
export const deleteSlider = (id) => async dispatch => {
  //slider
  try {
    dispatch({ type: DELETE_OTHERS_DETAILS_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/slider/${id}`);

    console.log('deleted data in slider : ', data);

    dispatch({
      type: DELETE_OTHERS_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: DELETE_OTHERS_DETAILS_FAIL,
      payload: error.response.data.message
    });
  }
};


//get slider details action
export const getSliderDetails = (id) => async dispatch => {
  //slider
  console.log("id from action : ", id);
  try {
    dispatch({ type: SLIDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/slider/${id}`);

    console.log('slider details data in slider action : ', data);

    dispatch({
      type: SLIDER_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SLIDER_DETAILS_FAIL,
      payload: error.response.data.message
    });
  }
};

//udpate slider
//updating product by admin action
export const updateSlider = (updatedData,id) => async dispatch => {
  try {
    dispatch({ type: SLIDER_UPDATE_REQUEST });

    const config = {
      Headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.put(
        `/api/v1/admin/slider/${id}`,
          updatedData,
          config
       );

    dispatch({
      type: SLIDER_UPDATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SLIDER_UPDATE_FAIL,
      payload: error.response.data.message
    });
  }
};



//Clearing errors
export const clearErrors = () => async dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};

//here
