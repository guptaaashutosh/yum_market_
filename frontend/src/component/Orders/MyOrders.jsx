import React,{useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
// import { DataGrid } from '@mui/x-data-grid';

import './MyOrders.css';
import {useSelector,useDispatch} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { Typography } from '@material-ui/core';
import {myOrders,clearErrors} from '../../actions/orderAction';
import { useAlert } from 'react-alert';

import LaunchIcon from '@material-ui/icons/Launch';



function MyOrders() {

    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();

    const {loading,error,orders}=useSelector((state)=>state.myOrders);
    const {user}=useSelector((state)=>state.users.user);


    useEffect(()=>{
          if(error){
            alert.error(error);
            dispatch(clearErrors());
          }

          //myOrders function from action
          dispatch(myOrders());

    },[dispatch,alert,error]);

    //for datagrid
    const columns=[
        {field:"id",headerName:"Order Id",minWidth:300,flex:1},
        {
            field:"status",
            headerName:"Status",
            minWidth:150,
            flex: 0.5,
            cellClassName:(params)=>{
                return params.getValue(params.id,"status") === "Delivered"
                ? "greenColor":"redColor";
            }
        },
        {
            field:"itemsQty",
            headerName:"Items Qty",
            type:"number",
            minWidth:150,
            flex:0.3,
        },
        {
            field:"amount",
            headerName:"Amount(paisa)",
            type:"number",
            minWidth:270,
            flex:0.5,
        },
        {
            field:"actions",
            headerName:"Actions",
            flex:0.3,
            minWidth:150,
            type:"number",
            sortable:false,
            renderCell:(params)=>{
                return(
                    <Link to={`/order/${params.getValue(params.id,"id")}`}>
                        <LaunchIcon/>
                    </Link> 
                )
            }
        },
        
    ];

    const rows=[];

    //value pushing in row of DataGrid
    orders && orders.forEach((item,index)=>{
          rows.push({
            id:item._id,
            status:item.orderStatus,
            itemsQty:item.orderItems.length,
            amount:item.totalPrice,
          })   
    });


  return (
    <>
        <MetaData title = {`${user.name}-Orders`} />
        {loading ?
        <Loader/>:(
            <div className="myOrderPage">
               <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="myOrdersTable"
                autoHeight
               />
               <Typography id="myOrdersHeading" >{user.name}'s Orders</Typography>
            </div>
        )}
    </>
  )
}

export default MyOrders
