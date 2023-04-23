import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { Route, useNavigate ,redirect as Redirect} from 'react-router-dom';
import Loader from '../layout/Loader/Loader';


function ProtectedRoute({ element:element,...rest}) {

    const navigate=useNavigate();

    const { loading, isAuthenticated,user } = useSelector(
        (state) => state.users
      );

  return (
    <>
       
       {!loading && (

         <Route
           {...rest}
           render={(props)=>{
             if(!isAuthenticated){
                  return (
                    <Redirect to="/login"/>
                  )
             }

            return (
                <element {...props}/>
            )

           }}

        />
        

       )}
      
    </>
  )
}

export default ProtectedRoute;
