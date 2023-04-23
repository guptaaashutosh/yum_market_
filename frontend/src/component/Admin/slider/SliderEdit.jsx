import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '../../layout/MetaData';
import SideBar from '../SideBar';
import DescriptionIcon from '@material-ui/icons/Description';
import SpellCheckIcon from '@material-ui/icons/Spellcheck';

import {
  getSliderDetails,
  updateSlider,
  clearErrors
} from '../../../actions/SliderAction';
import {
  SLIDER_UPDATE_RESET,
} from '../../../constants/OtherConstant';

const SliderEdit = () => {
  const { id } = useParams();
  console.log("slider id : ", id);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  //sliderDetails
  const { error,loading, slider } = useSelector(state => state.sliderDetails);
  
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated
  } = useSelector(state => state.updateSlider);


  console.log("slider details in sliderEdit heading : ", slider);
  console.log('slider udpate in sliderEdit : ', isUpdated);
  
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

   useEffect(() => {
     if (error) {
       alert.error(error);
       dispatch(clearErrors());
     }

     if (updateError) {
       alert.error(updateError);
       dispatch(clearErrors());
     }

     if (slider && slider._id !== id) {
       //slider details action call
       dispatch(getSliderDetails(id));
     } else {
       setHeading(slider.heading);
       setDescription(slider.description);
       setOldImages(slider.images);
     }
     
          if (isUpdated) {
            alert.success('Slider Updated Successfully!!');
            dispatch({ type: SLIDER_UPDATE_RESET });
            navigate('/admin/allslider');
     }
     
   }, [dispatch, alert, error, updateError, navigate, isUpdated, slider, id]);


  const createFormSubmitHandler = e => {
    e.preventDefault();
     const myForm = new FormData();
     myForm.set('heading', heading);
     myForm.set('description', description);

     images.forEach(image => {
       myForm.append('images', image);
     });
     dispatch(updateSlider(myForm,id));
  };

  const updateSliderImagesChange = e => {
     const files = Array.from(e.target.files);

     setImages([]);
     setImagesPreview([]);
     setOldImages([]);

     files.forEach(file => {
       const reader = new FileReader();

       reader.onload = () => {
         if (reader.readyState === 2) {
           setImagesPreview(old => [...old, reader.result]);
           setImages(old => [...old, reader.result]);
         }
       };

       reader.readAsDataURL(file);
     });
  };

   

  return (
    <>
      <MetaData title='Slider details --Admin' />
      <div className='dashboard'>
        <SideBar />

        <div className='createProductContainer'>
          <form
            className='createProductForm'
            encType='multipart/form-data'
            onSubmit={createFormSubmitHandler}
          >
            <h1>Update Slider</h1>

            <div>
              <SpellCheckIcon />
              <input
                type='text'
                placeholder='Slider Heading'
                required
                value={heading}
                onChange={e => setHeading(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />
              <textarea
                placeholder='Description Here....'
                required
                value={description}
                cols='30'
                rows='4'
                onChange={e => setDescription(e.target.value)}
              ></textarea>
            </div>

            <h2>Choose other images</h2>
            <div id='createProductFormFile'>
              <input
                type='file'
                name='avatar'
                accept='image/'
                required
                onChange={updateSliderImagesChange}
                multiple
              />
            </div>

            {/* //for old images only */}
            <div id='createProductFormImage'>
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt='old product preview' />
                ))}
            </div>

            <div id='createProductFormImage'>
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt='product preview' />
              ))}
            </div>

            <Button
              id='createProductBtn'
              type='submit'
              //disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SliderEdit
