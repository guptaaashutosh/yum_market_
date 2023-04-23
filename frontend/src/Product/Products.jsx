import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Products.css';
import { clearErrors, getProducts } from '../actions/ProductActions';
import ProductCard from '../component/Home/ProductCard';
import Loader from '../component/layout/Loader/Loader';
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Typegraphy from '@material-ui/core/Typography';
import { Slider } from '@material-ui/core';
import MetaData from '../component/layout/MetaData';
import ProductLoader from './ProductLoader';

//categories
const categories = [
    "Spices",
    "Drinks",
    "Puja materials",
    "Food",
    "Snacks & Beverages",
    "Household care",
    "electronic",
    "clothes",
];

function Products() {
  const { keyword } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { products: product } = useSelector(state => state.productsitem);

  //for category from database
  //   const productArr=[];
  //   product && product.forEach((item,index)=>{
  //     productArr.push(item.category);
  //   })
  //  // console.log(product)
  //  const categories=Array.from(new Set(productArr));
  //   console.log(categories);

  //pagination page setting state
  const [currentPage, setCurrentPage] = useState(1);
  //price filter pagination state
  const [price, setPrice] = useState([0, 25000]);

  //for category set
  const [category, setCategory] = useState('');

  //rating
  const [rating, setRating] = useState(0);

  //products is same name as from database
  const {
    loading,
    error,
    products,
    productCount,
    resultPerPage,
    filterProductCount
  } = useSelector(state => state.productsitem);

  //console.log(keyword)

  //setting current page event
  const setCurrentPageNo = e => {
    setCurrentPage(e);
  };

  //price handling of slider
  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [dispatch, error, alert, keyword, currentPage, price, category, rating]);

  const count = filterProductCount;

  //console.log(count)

  return (
    <>
      {loading ? (
      <>
          <Loader /> 
        {/* <ProductLoader/> */}
        
      </>
       
      ) : (
        <>
          <MetaData title='Products -- Ecommerce' />
          <h2 className='productsHeading'>Products</h2>
          <div className='products'>
            {products &&
              products.map(product => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>

          {/* it shows filter if only keyword exits */}
          {/* {keyword &&  } */}
          <div className='filterBox'>
            <Typegraphy>Price</Typegraphy>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay='auto'
              aria-labelledby='range-slider'
              min={0}
              max={25000}
            />

            <Typegraphy>Categories</Typegraphy>
            <ul className='categoryBox'>
              {categories &&
                categories.map(category => (
                  <li
                    className='category-link'
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
            </ul>

            <fieldset>
              <Typegraphy component='legend'>Rating Above</Typegraphy>
              <Slider
                value={rating}
                onChange={(e, newRating) => {
                  setRating(newRating);
                }}
                aria-labelledby='continuous-slider'
                min={0}
                max={5}
                valueLabelDisplay='auto'
              />
            </fieldset>
          </div>

          {resultPerPage < count && (
            <div className='paginationBox'>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText='Next'
                prevPageText='Prev'
                firstPageText='1st'
                lastPageText='Last'
                itemClass='page-item'
                linkClass='page-link'
                activeClass='pageItemActive'
                activeLinkClass='pageLinkAcitve'
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Products;
