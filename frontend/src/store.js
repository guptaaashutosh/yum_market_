import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';


import ProductReducer from './reducers/ProductReducers';

import {forgotPasswordReducer, getAllUsersReducer, getUserDetailsReducer, profileReducer, updateUserReducer, userReducer} from './reducers/UserReducer';
import { cartReducer } from './reducers/CartReducer';
import {  deleteOrderReducer, getAllOrdersReducer, myOrderDetailsReducer, myOrderReducer, newOrderReducer, updateOrderReducer } from './reducers/OrderReducer';
import { adminProductReducer, deleteAdminProductReducer, newProductReducer, newReviewReducer, productDetailReducer, productsReviewReducer, reviewActionReducer, updateAdminProductReducer } from './reducers/AllProductReducer';
import { deleteSliderReducer, getSliderReducer, newSliderReducer, singleSliderDetailsReducer, updateSliderReducer } from './reducers/OtherReducer';

// 5:22
const reducer = combineReducers({
  productsitem: ProductReducer,
  productDetails: productDetailReducer,
  users: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer, //this is new order reducer
  myOrders: myOrderReducer,
  orderDetails: myOrderDetailsReducer,
  newReview: newReviewReducer,
  allAdminProducts: adminProductReducer,
  newProduct: newProductReducer,
  removedProduct: deleteAdminProductReducer,
  updateProduct: updateAdminProductReducer,
  allOrders: getAllOrdersReducer,
  deletedOrder: deleteOrderReducer,
  updateOrder: updateOrderReducer,
  AllUsers: getAllUsersReducer,
  updateUser: updateUserReducer,
  userDetails: getUserDetailsReducer,
  productReviews: productsReviewReducer,
  reviewAction: reviewActionReducer,
  slider: newSliderReducer,
  allSlider: getSliderReducer,
  removeSlider: deleteSliderReducer,
  sliderDetails: singleSliderDetailsReducer,
  updateSlider: updateSliderReducer
});

let initialState={
    cart:{
        cartItems:localStorage.getItem("cartItems") 
        ? JSON.parse(localStorage.getItem("cartItems"))
        :[],
        shippingInfo:localStorage.getItem("shippingInfo") 
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        :[],
    }
};

//Redux Thunk is middleware that allows you to return functions, 
//rather than just actions, within Redux.
const middleware=[thunk];


const store=createStore(
     reducer,
     initialState,
     composeWithDevTools(applyMiddleware(...middleware))
    );


export default store;


// "proxy": "http://192.168.56.1:8000"