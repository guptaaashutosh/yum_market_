import React from 'react';
// import ReactStars from 'react-rating-stars-component';
import profilePng from '../images/Profile.png';

import {Rating} from '@material-ui/lab';

function ReviewCard({review}) {

    const options={
      size:"medium",
      activeColor:'tomato',
      value:review.rating,
      readOnly:true,
      precision:0.5,
   }

  return (
    <>
        <div className='reviewCard'>
         <img src={profilePng} alt='User_photo'/>
         <p>{review.name}</p>
         <Rating {...options}/>
         <span className='reviewCardComment' >{review.comment}</span>
        </div>
    </>
    
  )
}

export default ReviewCard