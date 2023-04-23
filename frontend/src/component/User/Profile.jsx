import React , {useEffect} from 'react'
import { Link, useNavigate,NavLink } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import {useSelector} from 'react-redux';
import Loader from '../layout/Loader/Loader';
import './Profile.css';

function Profile() {

    const navigate=useNavigate();

    const {  loading, isAuthenticated,user } = useSelector(
        (state) => state.users
      );


      useEffect(()=>{
          if(isAuthenticated === false ){
            navigate("/login");
          }
          
      },[isAuthenticated,navigate])
      

  return (
    <>
       {loading ? <Loader/> : (
        <> 
        <MetaData title={`${user.user.name}'s Profile`}/>
        <div className="profileContainer">
            <div>
                <h1>My Profile</h1>
                <img src={user.user.avatar.url} alt={user.user.name} />
                <NavLink to="/update">Edit Profile</NavLink>
            </div>
            <div>


                <div>
                    <h4>Full Name</h4>
                     <p>{user.user.name}</p>
                </div>


                <div>
                    <h4>Email</h4>
                     <p>{user.user.email}</p>
                </div>


                <div>
                    <h4>Joined On</h4>
                     <p>{String(user.user.createdAt).substring(0,10)}</p>
                </div>


                <div>
                    <NavLink to="/orders">My Orders</NavLink>
                    <NavLink to="/password/update">Change Password</NavLink>
                </div>


            </div>
        </div>
        </>
       )}
    </>
  )
}

export default Profile;
