import React, { useEffect ,useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductReviews,
         clearErrors, 
         deleteProductReview, 
      } from '../../actions/ProductActions';

import './Reviews.css';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { Button } from '@material-ui/core';
import Star from '@material-ui/icons/Star';
import DeleteIcon from '@material-ui/icons/Delete';
import SideBar from './SideBar';
import { DELETE_REVIEW_RESET } from '../../constants/ProductConstants';


function Reviews() {

  const dispatch=useDispatch();
  const alert=useAlert();
  const navigate=useNavigate();

  const[productID,setProductID]=useState("");

  const {loading,error,reviews}=useSelector((state)=>state.productReviews);

  const {error:deleteError,isDeleted,loading:reviewLoading}=useSelector((state)=>state.reviewAction);

  //deleting product function 
  const deleteReviewHandler=(id)=>{
     dispatch(deleteProductReview(productID,id));
  }

  const productReviewSubmitHandler=(e)=>{
       e.preventDefault();
      dispatch(getAllProductReviews(productID))
  }

  useEffect(()=>{

    if(productID.length === 24){
      dispatch(getAllProductReviews(productID));
    }

    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }

    if(deleteError){
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if(isDeleted){
      alert.success("Reviews Deleted Successfully!!");
      navigate("/admin/reviews");
      dispatch({type:DELETE_REVIEW_RESET})
    }

  

  },[dispatch,error,alert,navigate,deleteError,isDeleted,productID]);



    //for datagrid
    const columns=[
      {field:"id",headerName:"Review Id",minWidth:180,flex:0.5},
      
      {
          field:"user",
          headerName:"User",
          minWidth:200,
          flex:0.5,
      },
      {
        field:"comment",
        headerName:"Comment",
        minWidth:350,
        flex: 1,
    },
      {
          field:"rating",
          headerName:"Rating",
          type:"number",
          minWidth:100,
          flex:0.3,
          cellClassName:(params)=>{
            return params.getValue(params.id,"rating") >= 3
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
                     <Button onClick={()=>{
                      deleteReviewHandler(params.getValue(params.id,"id"))
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
  reviews && reviews.forEach((item,index)=>{
        rows.push({
          id:item._id,
          comment:item.comment,
          rating:item.rating,
          user:item.name,
        })   
  });


  return (
    <>
      <MetaData title="All REVIEWS --Admin"/>
       <div className="dashboard">
           
           <SideBar/>

          {loading ? <Loader/> :(
            <div className="productReviewsContainer">

             <form
               className='productReviewsForm'
               encType='multipart/form-data'
               onSubmit={productReviewSubmitHandler}
               >
                 <h1 className='productReviewsFormHeading' >ALL REVIEWS</h1> 

                  <div>
                    <Star/>
                    <input
                      type="text"
                      placeholder='Product Id'
                      required
                      value={productID}
                      onChange={(e)=>setProductID(e.target.value)}
                      />
                  </div> 
              
              
              <Button
               id="createProductBtn"
               type="submit"
               disabled={loading?true:false || productID === "" ?true:false }
              >
                Search 
              </Button>


              </form>


            {reviews && reviews.length > 0 ?(
              <DataGrid
              rows={rows}
              columns={columns}
              pageSize={12}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
             >
             </DataGrid>
            ):
             <h1 className='productReviewsFormHeading'>No Reviews Found</h1>
            }

           </div>

          )}

       </div>
      

    </>
  )
}


export default Reviews;
