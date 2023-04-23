import React, {  useState, useEffect } from 'react';
import Loader from '../layout/Loader/Loader';
import './ResetPassword.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, resetPassword } from '../../actions/UserActions';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { useParams } from 'react-router-dom';
import LockOpenIcon from '@material-ui/icons/Lock';
import LockIcon from '@material-ui/icons/LockOpen';
import {  useNavigate } from 'react-router-dom';



function ResetPassword() {

    const {token}=useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { error, loading, success } = useSelector(state => state.forgotPassword);
  
   
    const [Password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
   
  
    const updatePasswordSubmit = e => {
      e.preventDefault();
  
      const myForm = new FormData();
      myForm.set('password', Password);
      myForm.set('confirmPassword', confirmPassword);
      dispatch(resetPassword(token,myForm));
      console.log('password reset successfully!!');
    };
  
   
  
    //check error and authentication
    useEffect(() => {
  
      //if any error
      if (error) {
        alert.error(error);
        dispatch(clearErrors);
      }
      //if authenticated
      if (success) {
        
        alert.success('password resetted Successfully!!');
        
      
        navigate('/login');
  
       
      }
    }, [dispatch, navigate, alert,error,success]);
  
  
  return (
    <>
      {loading? <Loader/> : (
        <>
      <MetaData title='Change Password' />
      <div className='resetPasswordContainer'>
        <div className='resetPasswordBox'>
          <h2 className='resetPasswordHeading'>Update Profile </h2>

          <form
            className='resetPasswordForm'
            onSubmit={updatePasswordSubmit}
          >

           <div>
            <LockOpenIcon/>
             <input 
               type="password"
               placeholder="New Password"
               required
               value={Password}
               onChange={(e)=>setPassword(e.target.value)}
               />
           </div>

           <div>
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
              value='Update'
              className='resetPasswordBtn '
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

export default ResetPassword;
