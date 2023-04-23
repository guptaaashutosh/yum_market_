import React, {  useState, useEffect } from 'react';

import Loader from '../layout/Loader/Loader';
import './UpdatePassword.css';

import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, passwordUpdate } from '../../actions/UserActions';
import { useAlert } from 'react-alert';
import { UPDATE_PASSWORD_RESET } from '../../constants/UserConstant';
import MetaData from '../layout/MetaData';

import LockOpenIcon from '@material-ui/icons/Lock';
import LockIcon from '@material-ui/icons/LockOpen';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {  useNavigate } from 'react-router-dom';


function UpdatePassword() {


    const navigate = useNavigate();

  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isUpdated } = useSelector(state => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 

  const updatePasswordSubmit = e => {
    e.preventDefault();

    const myForm = new FormData();
    // myForm.append("file",e.target.result); //
    myForm.set('oldPassword', oldPassword);
    myForm.set('newPassword', newPassword);
    myForm.set('confirmPassword', confirmPassword);
    dispatch(passwordUpdate(myForm));
    console.log('password updated successfully!!');
  };

 

  //check error and authentication
  useEffect(() => {

    //if any error
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    //if authenticated
    if (isUpdated) {
      
      alert.success('password Updated Successfully!!');
      
    
      navigate('/profile');

      dispatch({
        type: UPDATE_PASSWORD_RESET
      });
    }
  }, [dispatch, navigate, alert,error,isUpdated]);


  return (
    <>
      {loading? <Loader/> : (
        <>
      <MetaData title='Change Password' />
      <div className='updatePasswordContainer'>
        <div className='updatePasswordBox'>
          <h2 className='updatePasswordHeading'>Update Profile </h2>

          <form
            className='updatePasswordForm'
            encType='multipart/form-data'
            onSubmit={updatePasswordSubmit}
          >
           
           <div className="loginPassword">
            <VpnKeyIcon/>
             <input 
               type="password"
               placeholder="Old Password"
               required
               value={oldPassword}
               onChange={(e)=>setOldPassword(e.target.value)}
               />
           </div>

           <div className="loginPassword">
            <LockOpenIcon/>
             <input 
               type="password"
               placeholder="New Password"
               required
               value={newPassword}
               onChange={(e)=>setNewPassword(e.target.value)}
               />
           </div>

           <div className="loginPassword">
            <LockIcon/>
             <input 
               type="password"
               placeholder="Confirm Password"
               required
               value={confirmPassword}
               onChange={(e)=>setConfirmPassword(e.target.value)}
               />
           </div>
           

            <input
              type='submit'
              value='Change Password'
              className='updatePasswordBtn'
              // disabled={loading ? true:false}
            />
          </form>
        </div>
      </div>
    </>
      )}
    </>
  )
}

export default UpdatePassword;