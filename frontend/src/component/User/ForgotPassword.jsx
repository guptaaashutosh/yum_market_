import React,{useState,useEffect} from 'react';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors, forgotPassword } from '../../actions/UserActions';
import './ForgotPassword.css';

function ForgotPassword() {

 const navigate = useNavigate();

  const dispatch = useDispatch();
  const alert = useAlert();


  const { error, loading, message } = useSelector(
    state => state.forgotPassword
    );

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = e => {
        e.preventDefault();
    
        const myForm = new FormData();
      
        myForm.set('email', email);
      
        dispatch(forgotPassword(myForm));
        console.log('updated forgot password successfully!!');
      };


        //check error and authentication
  useEffect(() => {
    //if any error
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    //if authenticated
    if (message) {  
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);


  return (
    <>
      {loading? <Loader/> : (
        <>
      <MetaData title='Change Password' />
      <div className='forgotPasswordContainer'>
        <div className='forgotPasswordBox'>
          <h2 className='forgotPasswordHeading'>Update Profile </h2>

          <form
            className='forgotPasswordForm'
            onSubmit={forgotPasswordSubmit}
          >
            
            <div className='forgotPasswordEmail'>
              <MailOutlineIcon />
              <input
                type='email'
                placeholder='Email'
                required
                name='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            

            <input
              type='submit'
              value='Send'
              className='forgotPasswordBtn'
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

export default ForgotPassword;

//9:33:14