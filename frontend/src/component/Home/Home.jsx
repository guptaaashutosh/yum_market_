import './home.css';
import React, { useEffect, useState } from 'react';
import Product from './ProductCard';
import MetaData from '../layout/MetaData';
import { clearErrors, getProducts } from '../../actions/ProductActions';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import ProductCard from './ProductCard';
import { UncontrolledCarousel } from 'reactstrap';

//for crousel
import Carousel from 'react-bootstrap/Carousel';
import { getAllSlider } from '../../actions/SliderAction';

//import {CgMouse} from 'react-icons/all';

function Home() {
  const alert = useAlert();
  const dispatch = useDispatch();

  //for slider
  const { loadings, errors, success, slider } = useSelector(
    state => state.allSlider
  );

 console.log('slider in home : ', slider);


  //products is same name as from database
  const { loading, error, products } = useSelector(state => state.productsitem);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllSlider());
    dispatch(getProducts());
  }, [dispatch, error, alert]);

  

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title='YUM MARKET' />
          {/* <div className='banner'>
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href='#container'>
               <button>
                Scroll 
               </button>
            </a>
        </div> */}

          {/* <UncontrolledCarousel
        className='uncontrolcarousel'
        items={items}
        /> */}

          <Carousel slide={false}>
            <Carousel.Item interval={1000}>
              <img
                className='d-block w-100'
                //src={slider[0] && slider[0].images[0].url}
                src='https://res.cloudinary.com/dibyofcwi/image/upload/v1679817756/sliders/viuiirsv7hqgbwt8vogy.png'
                alt='First slide'
              />
              <Carousel.Caption>
                <div className='carouselTopContent'>
                  {/* <h3>{slider[0] && slider[0].heading}</h3>
                  <p>{slider[0] && slider[0].description}</p> */}
                </div>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                className='d-block w-100'
                // src={slider[1] && slider[1].images[0].url}
                src='https://res.cloudinary.com/dibyofcwi/image/upload/v1679817756/sliders/viuiirsv7hqgbwt8vogy.png'
                alt='Second slide'
              />

              <Carousel.Caption>
                <div className='carouselTopContent'>
                  <Carousel.Caption>
                    <div className='carouselTopContent'>
                      {/* <h3>{slider[1] && slider[1].heading}</h3>
                      <p>{slider[1] && slider[1].description}</p> */}
                    </div>
                  </Carousel.Caption>
                </div>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                className='d-block w-100'
                // src={slider[2] && slider[2].images[0].url}
                src='https://res.cloudinary.com/dibyofcwi/image/upload/v1679817756/sliders/viuiirsv7hqgbwt8vogy.png'
                alt='Third slide'
              />

              <Carousel.Caption>
                <div className='carouselTopContent'>
                  {/* <h3>{slider[2] && slider[2].heading}</h3>
                  <p>{slider[2] && slider[2].description}</p> */}
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>

          <h2 className='homeHeading'>Features Products</h2>

          <div className='container' id='container'>
            {products &&
              products.map(product => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>
        </>
      )}
    </>
  );
}

export default Home;
