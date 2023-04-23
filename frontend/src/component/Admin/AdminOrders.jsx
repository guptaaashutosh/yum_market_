import React, { useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import './ProductList.css';
import { useAlert } from 'react-alert';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SideBar from './SideBar';
import { allOrders, deleteOrder,clearErrors } from '../../actions/orderAction';
import {  DELETE_ORDER_RESET } from '../../constants/OrderConstant';


function AdminOrders() {

  const dispatch=useDispatch();
  const alert=useAlert();
  const navigate=useNavigate();

  const {loading,error,adminOrders}=useSelector((state)=>state.allOrders);

  const {error:deleteError,isDeleted}=useSelector((state)=>state.deletedOrder);

  //deleting product function 
  const deleteOrderHandler=(id)=>{
    dispatch(deleteOrder(id));
  }

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }

    if(deleteError){
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if(isDeleted){
      alert.success("Order Deleted Successfully!!");
      navigate("/admin/orders");
      dispatch({type:DELETE_ORDER_RESET})
    }

    dispatch(allOrders())

  },[dispatch,error,alert,navigate,deleteError,isDeleted]);



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
          flex:0.4,
      },
      {
          field:"amount",
          headerName:"Amount",
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
                <>
                     <Link to={`/admin/order/${params.getValue(params.id,"id")}`}>
                      <EditIcon/>
                     </Link> 

                     <Button onClick={()=>{
                      deleteOrderHandler(params.getValue(params.id,"id"))
                     }}>
                        <DeleteIcon/>
                     </Button>

                </>
              )
          }
      },
      
  ];

  const rows=[];

  //value pushing in row of DataGrid
  adminOrders && adminOrders.forEach((item,index)=>{
        rows.push({
          id:item._id,
          status:item.orderStatus,
          itemsQty:item.orderItems.length,
          amount:item.totalPrice,
        })   
  });


  return (
    <>
      <MetaData title="All Orders --Admin"/>
       <div className="dashboard">
           
           <SideBar/>

          {loading ? <Loader/> :(
            <div className="productListContainer">
             <h1 id="productListHeading">ALL Orders</h1>

             <DataGrid
              rows={rows}
              columns={columns}
              pageSize={12}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
             >
             </DataGrid>
           </div>

          )}

       </div>
      

    </>
  )
}

export default AdminOrders;
