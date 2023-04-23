import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,

  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,

  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
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
  NEW_PRODUCT_FAIL,

  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,

  ADMIN_DELETE_PRODUCT_REQUEST,
  ADMIN_DELETE_PRODUCT_SUCCESS,
  ADMIN_DELETE_PRODUCT_FAIL,

  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,

  CLEAR_ERRORS
} from '../constants/ProductConstants';

import axios from 'axios'; //js library to make http request from node.js

export const getProducts =
  (keyword = '', currentPage = 1, price = [0, 25000], category, rating = 0) =>
  async dispatch => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });
      //get all products data;
      //console.log(keyword)
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${rating}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        productTest: data
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        productTest: error.response.data.message
      });
    }
  };

//get products details
export const getProductDetails = id => async dispatch => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    //get all products data;
    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      AllProducts: data.product
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      AllProducts: error.response.data.message
    });
  }
};

//Reviews
export const newReview = reviewData => async dispatch => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      Headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message
    });
  }
};


//get all review of product //admin action
export const getAllProductReviews = (id) => async dispatch => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/reviews?productID=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message
    });
  }
};


//delete review of product //admin action
export const deleteProductReview = (productID,reviewID) => async dispatch => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(`/api/v1/reviews?productID=${productID}&id=${reviewID}`);

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message
    });
  }
};



//create product //admin
export const createProduct = newProductData => async dispatch => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      Headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post(
      `/api/v1/admin/product/new`,
      newProductData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message
    });
  }
};

//get all products for admin
export const getAdminProduct = () => async dispatch => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });
    //get all products data;
    const { data } = await axios.get(`/api/v1/admin/products`);

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      adminProducts: data.products
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      adminProducts: error.response.data.message
    });
  }
};


//deleting product by admin action
export const deleteProduct = (id) => async dispatch => {
  try {
    dispatch({ type: ADMIN_DELETE_PRODUCT_REQUEST });
    
    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

    dispatch({
      type: ADMIN_DELETE_PRODUCT_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_PRODUCT_FAIL,
      payload: error.response.data.message
    });
  }
};



//updating product by admin action
export const updateProduct = (updatedData,id) => async dispatch => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      Headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.put(
        `/api/v1/admin/product/${id}`,
          updatedData,
          config
       );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message
    });
  }
};




//Clearing errors
export const clearErrors = () => async dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
