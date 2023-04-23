import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CreateProduct.css';
import { useAlert } from 'react-alert';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import SideBar from './SideBar';
import { Button } from '@material-ui/core';
import { createProduct,clearErrors } from '../../actions/ProductActions';

import AccountTreeIcon from '@material-ui/icons/AccountTree';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonIcon from '@material-ui/icons/Person';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';


import { getUserDetails, updateUserAction } from '../../actions/UserActions';
import { DELETE_USER_RESET, UPDATE_USER_RESET } from '../../constants/UserConstant';

//14:49:32


function UpdateUser() {

    const navigate=useNavigate();
    const {id} =useParams();

    const dispatch=useDispatch();
    const alert=useAlert();

    const {loading,error,isUpdated,isDeleted,message}=useSelector((state)=>state.updateUser);
    const {loading:userLoading,error:userError,user}=useSelector((state)=>state.userDetails);
    
   
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[role,setRole]=useState("");
    

  useEffect(()=>{

    if(user && user._id !== id){
          dispatch(getUserDetails(id));
    }else{
        setName(user.name);
        setEmail(user.email);
        setRole(user.role); 
    }
    
    //dispatch(getUserDetails(id));

    if(error){
        alert.error(error);
        dispatch(clearErrors());
    }

    if(userError){
        alert.error(userError);
        dispatch(clearErrors());
    }

    if(isUpdated){
        alert.success("User Updated Successfully!!");
        dispatch({type:UPDATE_USER_RESET});
        navigate("/admin/users");
    }

    if(isDeleted){
        alert.success("User Deleted Successfully!!");
        dispatch({type:DELETE_USER_RESET});
         navigate("/admin/users");
    }

    
    //dispatch(updateUserAction());

  },[dispatch,error,navigate,id,userError,isDeleted,isUpdated,alert,user])


  const updateUserSubmitHandler=(e)=>{
    e.preventDefault();
    const myForm=new FormData();
    myForm.set("name",name);
    myForm.set("email",email);
    myForm.set("role",role);
    
    dispatch(updateUserAction(id,myForm));
  };

  

    
  return (
    <>
        <MetaData title="Update User --Admin"/>
       <div className="dashboard">
           
           <SideBar/>

 
           <div className="createProductContainer">
              
             {loading ? <Loader/> : (
              <form
               className='createProductForm'
               encType='multipart/form-data'
               onSubmit={updateUserSubmitHandler}
               >
                 <h1>Update User</h1> 

                  <div>
                    <PersonIcon/>
                    <input
                      type="text"
                      placeholder='User Name'
                      required
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                      />
                  </div>
                  <div>
                    <MailOutlineIcon/>
                    <input
                      type="email"
                      placeholder='email'
                      required
                       value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      />
                  </div>
                
              <div>
                    <VerifiedUserIcon/>
                    <select value={role} onChange={(e)=>setRole(e.target.value)}>
                       <option value="">Choose Role</option>
                       <option value="admin">Admin</option>
                       <option value="user">User</option>
                    </select>
                </div> 
              
              
              <Button
               id="createProductBtn"
               type="submit"
               disabled={loading?true:false || role===""?true:false }
              >
                Update 
              </Button>


              </form>
             ) }
             
           </div> 

       </div>
    </>
  )
}

export default UpdateUser;
