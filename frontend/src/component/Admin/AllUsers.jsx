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
import { deleteUserAction, getUsersAction } from '../../actions/UserActions';
import { DELETE_USER_RESET } from '../../constants/UserConstant';


function AllUsers() {

  const dispatch=useDispatch();
  const alert=useAlert();
  const navigate=useNavigate();

  const {loading,error,users}=useSelector((state)=>state.AllUsers);

  const {error:updateUserError,loading:updateLoading,isDeleted,message,isUpdated}=useSelector((state)=>state.updateUser);

  //deleting product function 
  const deleteUserHandler=(id)=>{
    dispatch(deleteUserAction(id));
  }

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }

    if(updateUserError){
      alert.error(updateUserError);
      dispatch(clearErrors());
    }

    if(isDeleted){
      alert.success(message);
      dispatch({type:DELETE_USER_RESET})
      navigate("/admin/users"); 
    }

    dispatch(getUsersAction())

  },[dispatch,error,alert,navigate,updateUserError,isDeleted,message]);



    //for datagrid
    const columns=[
      {field:"id",headerName:"User Id",minWidth:180,flex:0.6},
      {
          field:"email",
          headerName:"Email",
          minWidth:200,
          flex: 0.5,
      },
      {
          field:"name",
          headerName:"Name",
          minWidth:150,
          flex:0.5,
      },
      {
          field:"role",
          headerName:"Role",
          minWidth:150,
          flex:0.1,
          cellClassName:(params)=>{
            return params.getValue(params.id,"role") === "admin"
            ? "greenColor":"redColor";
        }
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
                     <Link to={`/admin/user/${params.getValue(params.id,"id")}`}>
                      <EditIcon/>
                     </Link> 

                     <Button onClick={()=>{
                      deleteUserHandler(params.getValue(params.id,"id"))
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
  users && users.forEach((item,index)=>{
        rows.push({
          id:item._id,
          email:item.email,
          name:item.name,
          role:item.role,
        })   
  });


  return (
    <>
      <MetaData title="All Users --Admin"/>
       <div className="dashboard">
           
           <SideBar/>

          {loading ? <Loader/> :(
            <div className="productListContainer">
             <h1 id="productListHeading">ALL USERS</h1>

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


export default AllUsers;
