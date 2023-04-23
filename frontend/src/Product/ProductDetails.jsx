import React,{useEffect,useState} from 'react';
import Carousel from 'react-material-ui-carousel';
import {useDispatch,useSelector} from 'react-redux';
import { clearErrors, getProductDetails, newReview } from '../actions/ProductActions';
import { useAlert } from 'react-alert';
import {useParams} from 'react-router-dom';

import './ProductDetails.css';
import ReviewCard from './ReviewCard';
import Loader from '../component/layout/Loader/Loader';
import MetaData from '../component/layout/MetaData';

import { addItemToCart } from '../actions/AddToCartAction';

import {
     Dialog,
     DialogActions,
     DialogContent,
     DialogTitle,
     Button
} from '@material-ui/core';

import {Rating} from '@material-ui/lab';
import { NEW_REVIEW_RESET } from '../constants/ProductConstants';

const ProductDetails=()=> {

   const {id}=useParams();

   console.log(id);

  const alert=useAlert();
  const dispatch=useDispatch();
   // get dataa from component to redux store

     //send data from redux store to components //{productDetails is from reducer}
    const {product,loading,error}=useSelector( 
        (state) => state.productDetails 
        )


    //for reviews
const {loading:loadingReview, success, error:reviewError}=useSelector((state)=>state.newReview);


        const options={
          size:"large",
          value:product.ratings,
          readOnly:true,
          precision:0.5,
       }
        
   
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity=()=>{
      if(product.stock<=quantity) return;
      const qty=quantity+1;
      setQuantity(qty);
    }

    const decreaseQuantity=()=>{
      if(1>=quantity) return;
      const qty=quantity-1;
      setQuantity(qty);
    }

    const addToCartHandler=()=>{
      dispatch(addItemToCart(id,quantity));
      alert.success("Item Added To Cart!!");
    }
   
    //review 
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const SubmitReviewToggle=()=>{
      open ? setOpen(false) : setOpen(true);
    }



    //submitting review 
    const submitReviewHandler=()=>{
      const formData=new FormData();

      formData.set("rating",rating);
      formData.set("comment",comment);
      formData.set("productID",id);

      dispatch(newReview(formData));

      setOpen(false);
    }


    
    useEffect(() => {
      if(error){
          alert.error(error);
          dispatch(clearErrors());
       }

      if(reviewError){
        alert.error(reviewError);
        dispatch(clearErrors());
      }

      if(success){
        alert.success("Review Submitted successfully!!");
        dispatch({type:NEW_REVIEW_RESET})
      }
      
        dispatch(getProductDetails(id));

    }, [dispatch,id,error,alert,reviewError,rating,success]);


    //console.log(product.noOfReviews)


  return (
    <>
    {loading ? (<Loader/>) : 
    (
       <>
       <MetaData title={`${product.name}`}/>
      <div className='ProductDetails'>
      <div>
         <Carousel >
            {product.images &&  product.images.map((item,i)=>(
               <img className='CarouselImage'
               key={i}
               src={item.url}
               alt={`${i} Slide`}
               />
            ))}
         </Carousel>
      </div>

      <div>
        <div className='detailsBlock-1'>
           <h2>{product.name}</h2>
           <p>Product # {product._id}</p>
        </div>
        <div className="detailsBlock-2">
          <Rating {...options} />
          <span className='detailsBlock-span' >({product.noOfReviews}) Reviews</span>
        </div>
        <div className="detailsBlock-3">
          <h1>{`Rs:${product.price}`}</h1>
          <div className="detailsBlock-3-1">
            <div className="detailsBlock-3-1-1">
              <button onClick={decreaseQuantity}>-</button>
              <input readOnly type="number" value={quantity} />
              <button onClick={increaseQuantity}>+</button>
            </div>
              <button disabled={product.stock<1?true:false} onClick={addToCartHandler} >Add to Cart</button>
          </div>
          <p>
            Status:
            <b className={product.stock < 1 ? "redColor":"greenColor"} >
                 {product.stock < 1 ? "OutOfStock":"InStock"}
            </b>
            {/* Category :<b>{product.category}</b> */}
          </p>
        </div>
        <div className="detailsBlock-4">
          Description :<p>{product.description}</p>
        </div>
        <button onClick={SubmitReviewToggle} className='submitReview'>Submit Review</button>
      </div>
  </div>

  
     <h3 className='reviewsHeading'>Reviews</h3>

    {/* for review submit  */}
    <Dialog
     aria-aria-labelledby='simple-dialog-title'
     open={open}
     onClose={SubmitReviewToggle}
    >
      <DialogTitle>Submit Review</DialogTitle>
      <DialogContent className='submitDialog'>
        <Rating
         onChange={(e)=>setRating(e.target.value)}
         value={rating}
         size='large'
        />
          <textarea
          className='submitDialogTextArea'
          cols="30"
          rows="5"
          value={comment}
          onChange={(e)=>setComment(e.target.value)}
          placeholder="Start typing review here...."
          >
          </textarea>
 {/* 12:17:06 */}
      </DialogContent>
       <DialogActions>
          <Button onClick={SubmitReviewToggle} color="secondary">Cancel</Button>
          <Button onClick={submitReviewHandler} color="primary">Submit</Button>
       </DialogActions>
    </Dialog>


     {product.reviews && product.reviews[0] ? (
      <div className="reviews">
      {product.reviews && product.reviews.map((review)=><ReviewCard review={review}/>)}
      </div> 
    ): (
      <p className='noReviews'>No Reviews Yet 😲</p>
    )}

       </>
    )
    }
    
     
    </>
  );
};

export default ProductDetails;
