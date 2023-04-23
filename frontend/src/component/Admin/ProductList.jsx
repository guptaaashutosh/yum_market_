import React, { useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProduct,clearErrors, deleteProduct } from '../../actions/ProductActions';
import './ProductList.css';
import { useAlert } from 'react-alert';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SideBar from './SideBar';
import { ADMIN_DELETE_PRODUCT_RESET } from '../../constants/ProductConstants';


function ProductList() {

  const dispatch=useDispatch();
  const alert=useAlert();
  const navigate=useNavigate();

  const {loading,error,products}=useSelector((state)=>state.allAdminProducts);

  const {error:deleteError,isDeleted}=useSelector((state)=>state.removedProduct);


  //console.log("product in productlist: ",products)

  //deleting product function 
  const deleteProductHandler=(id)=>{
    dispatch(deleteProduct(id));
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
      alert.success("Product Deleted Successfully!!");
      navigate("/admin/dashboard");
      dispatch({type:ADMIN_DELETE_PRODUCT_RESET})
    }

    dispatch(getAdminProduct())

  },[dispatch,error,alert,navigate,deleteError,isDeleted]);



    //for datagrid
    const columns=[
      {field:"id",headerName:"Product Id",minWidth:200,flex:0.5},
      {
          field:"name",
          headerName:"Name",
          minWidth:350,
          flex: 0.5,
      },
      {
          field:"stock",
          headerName:"Stock",
          type:"number",
          minWidth:150,
          flex:0.3,
      },
      {
          field:"price",
          headerName:"Price",
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
                     <Link to={`/admin/product/${params.getValue(params.id,"id")}`}>
                      <EditIcon/>
                     </Link> 

                     <Button onClick={()=>{
                      deleteProductHandler(params.getValue(params.id,"id"))
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
  products && products.forEach((item,index)=>{
        rows.push({
          id:item._id,
          stock:item.stock,
          price:item.price,
          name:item.name,
        })   
  });


  return (
    <>
      <MetaData title="All PRODUCTS --Admin"/>
       <div className="dashboard">
           
           <SideBar/>

          {loading ? <Loader/> :(
            <div className="productListContainer">
             <h1 id="productListHeading">ALL PRODUCTS</h1>

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

export default ProductList;
