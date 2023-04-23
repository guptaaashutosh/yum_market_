import React, { useState ,useEffect} from 'react';
import '../CreateProduct.css';
import MetaData from '../../layout/MetaData';
import SideBar from '../SideBar';

import DescriptionIcon from '@material-ui/icons/Description';
import SpellCheckIcon from '@material-ui/icons/Spellcheck';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createSlider, clearErrors } from '../../../actions/SliderAction';

import { OTHERS_DETAILS_RESET } from '../../../constants/OtherConstant';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

const Slider = () => {

  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  
  const { loading, error, success,slider } = useSelector(state => state.slider);
  
  //console.log("slider in slider : ", slider,success);
    
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);


     const createFormSubmitHandler = e => {
       e.preventDefault();
       const myForm = new FormData();
       myForm.set('heading', heading);
       myForm.set('description', description);

       images.forEach(image => {
         myForm.append('images', image);
       });
      dispatch(createSlider(myForm));
     };

     const createProductImagesChange = e => {
       const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

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
  

   useEffect(() => {
     if (error) {
       alert.error(error);
       dispatch(clearErrors());
     }

     if (success) {
       alert.success('Slider inserted Successfully!!');
       //navigate('/admin/dashboard');
       dispatch({ type: OTHERS_DETAILS_RESET });
       setHeading("");
       setDescription("");
       setImages([]);
       setImagesPreview([]);
     }
   }, [dispatch, error, success,navigate, alert]);

    

  return (
    <>
      <MetaData title='Slider --Admin' />
      <div className='dashboard'>
        <SideBar />

        <div className='createProductContainer'>
          <form
            className='createProductForm'
            encType='multipart/form-data'
            onSubmit={createFormSubmitHandler}
          >
            <h1>Upload Sliders</h1>

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

            <h2>Choose images</h2>
            <div id='createProductFormFile'>
              <input
                type='file'
                name='avatar'
                accept='image/'
                required
                onChange={createProductImagesChange}
                multiple
              />
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
              Upload
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Slider
