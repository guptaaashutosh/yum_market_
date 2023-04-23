import { Button, Typography } from '@material-ui/core';
import React,{useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SideBar from './SideBar';
import { clearErrors, OrderDetails, updateOrder } from '../../actions/orderAction';
import Loader from '../layout/Loader/Loader';
import AccountTree from '@material-ui/icons/AccountTree';
import { useAlert } from 'react-alert';
import { UPDATE_ORDER_RESET } from '../../constants/OrderConstant';


function UpdateOrder() {

    const {id}=useParams();

    const { order, error, loading } = useSelector(state => state.orderDetails);
    const {error:updateError,loading:updateLoading,isUpdated}=useSelector((state)=>state.updateOrder)


    const navigate=useNavigate();
    const dispatch=useDispatch();
    const alert=useAlert();

   
    const[status,setStatus]=useState("");

    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
          }

        if (isUpdated) {
            alert.success("Order Updated Successfully!!");
            dispatch({ type: UPDATE_ORDER_RESET });
        }
    
        //order details action call
         dispatch(OrderDetails(id));

      }, [dispatch, alert, error, id,updateError,isUpdated]);


      const updateOrderSubmitHandler=(e)=>{
        e.preventDefault();
        const myForm=new FormData();
        //console.log(status);
        myForm.set("status",status);
        
        dispatch(updateOrder(myForm,id));
      }
    

  return (
     <>

<MetaData title="Process Order --Admin"/>
       <div className="dashboard">
           
           <SideBar/>

           <div className="createProductContainer">
              
        {loading ? <Loader/>:(
            <div className="confirmOrderPage"
               style={{
                display:order.orderStatus === "Delivered" ? "block" : "grid",
             }}
            >
          
                <div className="confirmshippingArea">
                <Typography>Shipping Info</Typography>
                <div className='orderDetailsContainerBox'>
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone No:</p>
                  <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>{order && order.shippingInfo && `${order.shippingInfo.address},
                  ${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.country},
                  ${order.shippingInfo.pinCode}`}</span>
                </div>
              </div>


                    <Typography>Payment</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order.paymentInfo &&
                        order.paymentInfo.status==="succeeded"
                        ? "greenColor":"redColor"
                      }
                    >
                      {
                        order.paymentInfo &&
                        order.paymentInfo.status==="succeeded"
                        ? "PAID":"NOT PAID"
                      }
                    </p>
                  </div>

                    <div>
                      <p>Amount:</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                </div>
             
            <Typography>Order Status</Typography>
            <div className="orderDetailsContainerBox">
              <div>
                <p
                    className={
                       order.orderStatus &&
                        order.orderStatus==="Delivered"
                        ? "greenColor":"redColor"
                      }
                >
                  {order.orderStatus && order.orderStatus}
                </p>
              </div>
            </div>

            <div className="confirmCartItems">
                    <Typography>Your Cart Items</Typography>
                    <div className="confirmCartItemsContainer">
                        {order.orderItems && order.orderItems.map((item)=>(
                            <div key={item.productId}>
                                <img src={item.image} alt={item.name}/>
                                <Link to={`product/${item.productId}`}>
                                    {item.name}
                                </Link>
                                <span>
                                    {item.quantity} X {item.price} ={" "}
                                    <b>Rs:{item.price*item.quantity}</b>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div
             style={{
              display:order.orderStatus === "Delivered" ? "none" : "block",
             }}
            >

            <form
               className='createProductForm'
               encType='multipart/form-data'
               onSubmit={updateOrderSubmitHandler}
               >
                 <h1>Process Order</h1> 

                 <div>
                    <AccountTree/>
                    <select value={status} onChange={(e)=>setStatus(e.target.value)}>
                       <option value="">Choose Category</option>
                       {order && order.orderStatus==="processing" && <option value="Shipped">Shipped</option>}
                       {order && order.orderStatus==="Shipped" && <option value="Delivered">Delivered</option>}
                       
                       
                    </select>
                </div>
              
              <Button
               id="createProductBtn"
               type="submit"
               disabled={loading?true:false || status===""?true:false}
              > 
                Process 
              </Button>


              </form>
            </div>
          </div>

        )}

           
        </div>
            
                


            </div>
             
      

     

     </>
  )
}


export default UpdateOrder;

//14:16:28

