import React, { useRef, useState, useEffect } from 'react';
import { MdLockOpen, MdMailOutline } from 'react-icons/md';
import Loader from '../layout/Loader/Loader';
import './updateProfile.css';
import { Link, useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

import FaceIcon from '@material-ui/icons/Face';

import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, loadUser, update } from '../../actions/UserActions';
import { useAlert } from 'react-alert';
import { UPDATE_PROFILE_RESET } from '../../constants/UserConstant';
import MetaData from '../layout/MetaData';

function UpdateProfile() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector(state => state.users);

  const { error, loading, isUpdated } = useSelector(state => state.profile);

  //console.log(user.user.avatar.url);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState('/Profile.png');


  const updateProfileSubmit = e => {
    e.preventDefault();

    const myForm = new FormData();
    // myForm.append("file",e.target.result); //
    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('avatar', avatar);
    dispatch(update(myForm));
    console.log('updated successfully!!');
  };

  //for data change in avatar on uploading at time of registration
  const updateProfileDataChange = (e) => {
  
      e.preventDefault();

    if(e.target.name === "avatar"){

      const reader=new FileReader();

        reader.onload=()=>{

        if(reader.readyState === 2){
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }

       };

       reader.readAsDataURL(e.target.files[0]);  //it read the content of specified file
       
      }
    
  };


  //check error and authentication
  useEffect(() => {
    if (user.user) {
      setName(user.user.name);
      setEmail(user.user.email);
      setAvatar(user.user.avatar.url); //
      setAvatarPreview(user.user.avatar.url);
    }

    //if any error
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    //if authenticated
    if (isUpdated) {
      
      alert.success('Profile Updated Successfully!!');
      
      dispatch(loadUser());
      navigate('/profile');

      dispatch({
        type: UPDATE_PROFILE_RESET
      });
    }
  }, [dispatch, error,navigate, alert, user, isUpdated]);

  return (
    <>
      {loading? <Loader/> : (
        <>
      <MetaData title='Update Profile' />
      <div className='updateProfileContainer'>
        <div className='updateProfileBox'>
          <h2 className='updateProfileHeading'>Update Profile </h2>

          <form
            className='updateProfileForm'
            encType='multipart/form-data'
            onSubmit={updateProfileSubmit}
          >
            <div className='updateProfileName'>
              <FaceIcon />
              <input
                type='name'
                placeholder='Name'
                required
                name='name'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className='updateProfileEmail'>
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

            <div id='updateProfileImage'>
              <img src={avatarPreview} alt='Avatar Preview' />
              <input
                type='file'
                name='avatar'
                accept='image/*'
                onChange={updateProfileDataChange}
              />
            </div>

            <input
              type='submit'
              value='update'
              className='updateProfileBtn'
              // disabled={loading ? true:false}
            />
          </form>
        </div>
      </div>
    </>
      )}
    </>
  );
}

export default UpdateProfile;
