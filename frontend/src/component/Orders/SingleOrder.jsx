import { Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { OrderDetails, clearErrors } from '../../actions/orderAction';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import Lottie from 'lottie-react';
import aboutTop from '../layout/About/about_top.json';

import './SingleOrder.css';
import { Grid } from '@mui/material';

function SingleOrder() {

  const navigate=useNavigate();

  const { id } = useParams();
  //console.log(id);

  const { order, error, loading } = useSelector(state => state.orderDetails);
  // const {user}=useSelector((state)=>state.users.user);

  console.log("order in singleOrder : ", order);

  const dispatch = useDispatch();
  const alert = useAlert();

  console.log("order",order);
  // console.log(loading);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    //order details action call
    dispatch(OrderDetails(id));
  }, [dispatch, alert, error, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title='order details' />

          <h2 className='orderDetailsHeading'>Order Details</h2>

          <Grid item xs={12} container direction='column'>
            <Lottie
              loop={true}
              autoplay={true}
              animationData={aboutTop}
                style={{
                  margin: 'auto',
                  marginLeft:12,
                width: '100%',
                height: '60%'
              }}
            />
          </Grid>

          <div className='orderDetailsPage'>
            <div className='orderDetailsContainer'>
              <Typography component='h1'>
                Order #{order.user && order.user._id}
              </Typography>

              <Typography>Shipping Info</Typography>
              <div className='orderDetailsContainerBox'>
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone No:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address},
                  ${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.country},
                  ${order.shippingInfo.pinCode}`}
                  </span>
                </div>
              </div>

              <Typography>Payment</Typography>
              <div className='orderDetailsContainerBox'>
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === 'succeeded'
                        ? 'greenColor'
                        : 'redColor'
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === 'succeeded'
                      ? 'PAID'
                      : 'NOT PAID'}
                  </p>
                </div>
                <div>
                  <p>Transaction ID : </p>
                  <span>{order.paymentInfo && order.paymentInfo.id}</span>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className='orderDetailsContainerBox'>
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === 'Delivered'
                        ? 'greenColor'
                        : 'redColor'
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className='orderDetailsCartItems'>
              <Typography>Order Items:</Typography>
              <div className='orderDetailsCartItemsContainer'>
                {order.orderItems &&
                  order.orderItems.map(item => (
                    <div key={item.product}>
                      <img src={item.image} alt={item.name} />
                      <Link to={`order/${item.product}`}>{item.name}</Link>
                      <span>
                        {item.quantity} X {item.price} ={' '}
                        <b>Rs:{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SingleOrder;
