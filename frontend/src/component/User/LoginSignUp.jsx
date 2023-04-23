import React, { useRef, useState, useEffect } from 'react';
import { MdLockOpen, MdMailOutline } from 'react-icons/md';
import Loader from '../layout/Loader/Loader';
import './loginSignUp.css';
import { Link, useNavigate, useLocation, NavLink } from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FaceIcon from '@material-ui/icons/Face';

import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, login, register } from '../../actions/UserActions';
import { useAlert } from 'react-alert';

function LoginSignUp() {
  const location = useLocation();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(state => state.users);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState('/Profile.png');

  const loginSubmit = e => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    // console.log("login data  submitted");
  };

  const registerSubmit = e => {
    e.preventDefault();

    const myForm = new FormData();
    // myForm.append("file",e.target.result); //
    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('password', password);
    myForm.set('avatar', avatar);
    dispatch(register(myForm));
    // console.log(myForm); // it won't give anything 
    console.log('Sign Up form submitted');
  };

  //for data change in avatar on uploading at time of registration
  const registerDataChange = e => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]); //it read the content of specified file

      //  The readAsDataURL method is used to read the contents of the specified
      //  Blob or File. When the read operation is finished, the readyState becomes DONE,
      //  and the loadend is triggered. At that time, the result attribute contains the data
      //  as a data: URL representing the file's data as a base64 encoded string.
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  //console.log(location.search)

  //const redirect= location.search ? location.search.split("=")[1] : "/profile";
  //const redirect="/profile";
  //console.log(redirect)

  //check error and authentication
  useEffect(() => {
    //if any error
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    //if authenticated
    //  if(isAuthenticated){
    //      navigate('/account');
    //   }
    if (isAuthenticated) {
      navigate('/profile'); //changes
    }
  }, [dispatch, error, alert, navigate, isAuthenticated]);

  const switchTabs = (e, tab) => {
    if (tab === 'login') {
      switcherTab.current.classList.add('shiftToNeutral');
      switcherTab.current.classList.remove('shiftToRight');

      registerTab.current.classList.remove('shiftToNeutralForm');
      loginTab.current.classList.remove('shiftToLeft');
    }

    if (tab === 'register') {
      switcherTab.current.classList.add('shiftToRight');
      switcherTab.current.classList.remove('shiftToNeutral');

      registerTab.current.classList.add('shiftToNeutralForm');
      loginTab.current.classList.add('shiftToLeft');
    }
  };

  return (
    <>
      <div className='LoginSignUpContainer'>
        <div className='LoginSignUpBox'>
          <div>
            <div className='login_signUp_toggle'>
              <p onClick={e => switchTabs(e, 'login')}>LOGIN</p>
              <p onClick={e => switchTabs(e, 'register')}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>

          <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
            <div className='loginEmail'>
              <MailOutlineIcon />
              <input
                type='email'
                placeholder='Email'
                required
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
              />
            </div>

            <div className='loginPassword'>
              <LockOpenIcon />
              <input
                type='password'
                placeholder='Password'
                required
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
              />
            </div>

            <NavLink to='/password/forgot'>Forget Password ?</NavLink>
            <input type='submit' value='Login' className='loginBtn' />
          </form>

          <form
            className='signUpForm'
            ref={registerTab}
            encType='multipart/form-data'
            onSubmit={registerSubmit}
          >
            <div className='signUpName'>
              <FaceIcon />
              <input
                type='name'
                placeholder='Name'
                required
                name='name'
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div className='signUpEmail'>
              <MailOutlineIcon />
              <input
                type='email'
                placeholder='Email'
                required
                name='email'
                value={email}
                onChange={registerDataChange}
              />
            </div>
            <div className='signUpPassword'>
              <MailOutlineIcon />
              <input
                type='password'
                placeholder='Password'
                required
                name='password'
                value={password}
                onChange={registerDataChange}
              />
            </div>
            <div id='registerImage'>
              <img src={avatarPreview} alt='Avatar Preview' />
              <input
                type='file'
                name='avatar'
                accept='image/*'
                onChange={registerDataChange}
              />
            </div>

            <input
              type='submit'
              value='Register'
              className='signUpBtn'
              // disabled={loading ? true:false}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginSignUp;
