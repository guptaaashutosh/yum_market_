import React,{useState} from 'react';
import './Header.css';
import {SpeedDial,SpeedDialAction} from '@material-ui/lab';
//08:10
import Backdrop from '@material-ui/core/Backdrop';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { useNavigate } from 'react-router-dom';

import {useSelector,useDispatch} from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/UserActions';

function UserOptions({user}) {

  const {cartItems}=useSelector((state)=>state.cart);

  const dispatch=useDispatch();
  const alert=useAlert();
  const navigate=useNavigate();
  

  const options=[
    {icon:<ListAltIcon/>,name:"Orders",func:Orders},
    {icon:<PersonIcon/>,name:"Profile",func:account},
    {icon:<ShoppingCartIcon
      style={{color:cartItems.length>0?"tomato":"unset"}}
    />,name:`Cart(${cartItems.length})`,func:cart},
    {icon:<ExitToAppIcon/>,name:"Logout",func:logoutUser}
   
  ];


  if(user.user.role==="admin"){
    options.unshift({
         icon:<DashboardIcon/>,
         name:"Dashboard",
         func:dashboard,
        });
  }

  //after clicking navigating to specific page 
   function dashboard(){
       navigate('/admin/dashboard');
   }

   function Orders(){
    navigate('/orders');
   }

   function account(){
    navigate('/profile');
   }

   function cart(){
    navigate('/cart');
   }

   function logoutUser(){
    dispatch(logout())
     alert.success("Logout Successfully!!");
     navigate('/');
   }




  const [open, setOpen] = useState(false);


  return (

    <>
     <Backdrop open={open} style={{zIndex:"10"}} />

     <SpeedDial
       className='speedDial'
       style={{zIndex:"11"}}
       ariaLabel='SpeedDial tooltip example'
       onClose={()=> setOpen(false)}
       onOpen={()=> setOpen(true)}
       open={open}
       direction="down"
       icon={
        <img
          className="speedDialIcon"
          src={user.user.avatar.url ? user.user.avatar.url : "/Profile.png" }
          alt="Profile"
        />
       }
     >

     {/* this is for icon hover on profile */}
     {options.map((item)=>(
      <SpeedDialAction 
          key={item.name}
          icon={item.icon} 
          tooltipTitle={item.name} 
          onClick={item.func}
          tooltipOpen />
     ))}
       

     </SpeedDial>

     </>
  )
}

export default UserOptions