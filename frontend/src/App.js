import './App.css';
import React, { useEffect, useState } from 'react';
import Header from './component/layout/Header/Header';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';
import ProductDetails from './Product/ProductDetails';
import Products from './Product/Products';
import Search from './Product/Search';
import Login from './component/User/LoginSignUp';
import 'bootstrap/dist/css/bootstrap.css';
import LoginSignUp from './component/User/LoginSignUp';
import Account from './component/Account/Account';
import store from './store';
import { loadUser } from './actions/UserActions';

import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import UserOptions from './component/layout/Header/UserOptions';
import Profile from './component/User/Profile';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import axios from 'axios';
import Payment from './component/Cart/Payment';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Orders/MyOrders';
import SingleOrder from './component/Orders/SingleOrder';
import Dashboard from './component/Admin/Dashboard';
import ProductList from './component/Admin/ProductList';
import CreateProduct from './component/Admin/CreateProduct';
import UpdateProduct from './component/Admin/UpdateProduct';
import AdminOrders from './component/Admin/AdminOrders';
import UpdateOrder from './component/Admin/UpdateOrder';
import AllUsers from './component/Admin/AllUsers';
import UpdateUser from './component/Admin/UpdateUser';
import Reviews from './component/Admin/Reviews';
import PageNotFound from './component/layout/PageNotFound';
import Contact from './component/layout/Contact/Contact';
import About from './component/layout/About/About';
import PaymentRazor from './component/Cart/Payment/PaymentRazor';
import PaymentSuccess from './component/Cart/Payment/PaymentSuccess';

import { ChakraProvider } from '@chakra-ui/react';
import Slider from './component/Admin/slider/Slider';
import AllSlider from './component/Admin/slider/AllSlider';
import SliderEdit from './component/Admin/slider/SliderEdit';

//import {webFont} from 'webfontloader';

function App() {
  const alert = useAlert();

  //for user authentication during start of app
  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    store.dispatch(loadUser());
  }, []);

  //to take data of state in order to check and passes in UserOptions
  const { error, loading, isAuthenticated, user } = useSelector(
    state => state.users
  );

  // // {isAuthenticated && console.log(user.user.role)}

  //block inspect in browser
  window.addEventListener("contextmenu",(e)=>e.preventDefault())

  return (
    <>
      {/* <ChakraProvider> */}
      <Header />
      <Router>
        {isAuthenticated && <UserOptions user={user} />}

        <Routes>
          <Route exact path='/' element={<Home />} />

          <Route exact path='/login' element={<LoginSignUp />} />

          {/* <Route exact path="/account" element={<Profile/>} /> */}

          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/about' element={<About />} />

          <Route exact path='/profile' element={<Profile />} />

          <Route exact path='/update' element={<UpdateProfile />} />

          <Route exact path='/password/update' element={<UpdatePassword />} />

          <Route path='/:id' element={<ProductDetails />} />

          <Route exact path='/products' element={<Products />} />

          <Route exact path='/Search' element={<Search />} />

          <Route path='/products/:keyword' element={<Products />} />

          <Route exact path='/password/forgot' element={<ForgotPassword />} />

          <Route
            exact
            path='/password/reset/:token'
            element={<ResetPassword />}
          />

          <Route exact path='/cart' element={<Cart />} />

          <Route exact path='/shipping' element={<Shipping />} />

          <Route exact path='/order/confirm' element={<ConfirmOrder />} />

          {/* <Route exact path='/payment' element={<Payment />} /> */}

          <Route exact path='/payment' element={<PaymentRazor />} />

          <Route exact path='/paymentsuccess' element={<PaymentSuccess />} />

          <Route exact path='/success' element={<OrderSuccess />} />

          <Route exact path='/orders' element={<MyOrders />} />

          {/* this is for order/id */}
          <Route exact path='/order/:id' element={<SingleOrder />} />

          {/* Dashboard  */}

          {/* {(isAuthenticated && user.user.role==='admin') ?
         (<Route exact path='/admin/dashboard' element={<Dashboard/>}/>) : (
            navigate("/login")
         )
         } */}

          <Route exact path='/admin/dashboard' element={<Dashboard />} />
          <Route exact path='/admin/products' element={<ProductList />} />

          <Route exact path='/admin/product/new' element={<CreateProduct />} />

          <Route exact path='admin/product/:id' element={<UpdateProduct />} />

          <Route exact path='/admin/orders' element={<AdminOrders />} />

          <Route exact path='/admin/order/:id' element={<UpdateOrder />} />

          <Route exact path='/admin/users' element={<AllUsers />} />

          <Route exact path='/admin/user/:id' element={<UpdateUser />} />

          <Route exact path='/admin/reviews' element={<Reviews />} />

          <Route exact path='/admin/slider' element={<Slider />} />
          <Route exact path='/admin/allslider' element={<AllSlider />} />
          <Route exact path='/admin/slider/:id' element={<SliderEdit />} />

          <Route path='/*' element={<PageNotFound />} />
          {/* or */}
          {/* <Route path="/*" element={<Navigate to="/" />} />
           */}
        </Routes>

       
      </Router>
      {/* </ChakraProvider> */}
       <Footer />
    </>
  );
}

export default App;
