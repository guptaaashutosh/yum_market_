import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CreateProduct.css';
import { useAlert } from 'react-alert';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import SideBar from './SideBar';
import { Button } from '@material-ui/core';
import { updateProduct,getProductDetails,clearErrors } from '../../actions/ProductActions';

import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DescriptionIcon from '@material-ui/icons/Description';
import StorageIcon from '@material-ui/icons/Storage';
import SpellCheckIcon from '@material-ui/icons/Spellcheck';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import { UPDATE_PRODUCT_RESET } from '../../constants/ProductConstants';



function UpdateProduct() {

    const {id}=useParams();

    const navigate=useNavigate();

    const dispatch=useDispatch();
    const alert=useAlert();

    //for product state
    const {error,product}=useSelector((state)=>state.productDetails);
    //for update state
    const {error:updateError,isUpdated}=useSelector((state)=>state.updateProduct);
    
    //console.log(id);
    //console.log(product.name);

    const[name,setName]=useState("");
    const[price,setPrice]=useState(0);
    const[description,setDescription]=useState("");
    const[category,setCategory]=useState("");
    const[stock,setStock]=useState(0);
    const[images,setImages]=useState([]);
    const[oldImages,setOldImages]=useState([]);
    const[imagesPreview,setImagesPreview]=useState([]);


    //categories
const categories=[
  'Spices',
  'Drinks',
  'Puja materials',
  'Food',
  'Snacks & Beverages',
  'Household care',
  'electronic',
  'clothes'
  ]


  useEffect(()=>{
    if(error){
        alert.error(error);
        dispatch(clearErrors());
    }

    if(updateError){
        alert.error(updateError);
        dispatch(clearErrors());
    }

    //if state product._id is not equals to params id then only it dispatch
    if(product && product._id !== id){
        dispatch(getProductDetails(id));
    }else{
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category);
        setStock(product.stock);
        setOldImages(product.images);
    }
    
    if(isUpdated){
        alert.success("Product Updated Successfully!!");
        navigate("/admin/products");
        dispatch({type:UPDATE_PRODUCT_RESET})
    }

  },[dispatch,updateError,error,navigate,isUpdated,alert,product,id])


  const updateFormSubmitHandler=(e)=>{
    e.preventDefault();
    const myForm=new FormData();
    myForm.set("name",name);
    myForm.set("price",price);
    myForm.set("description",description);
    myForm.set("category",category);
    myForm.set("stock",stock);

    images.forEach((image)=>{
        myForm.append("images",image);
    })
    dispatch(updateProduct(myForm,id));
  };

  const updateProductImagesChange=(e)=>{
    const files=Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file)=>{
        const reader=new FileReader();

        reader.onload=()=>{

            if(reader.readyState === 2){
                setImagesPreview((old)=>[...old,reader.result]);
                setImages((old)=>[...old,reader.result]);
            }
            
        };

        reader.readAsDataURL(file);
    });
  };

    
  return (
    <>
        <MetaData title="Update Product --Admin"/>
       <div className="dashboard">
           
           <SideBar/>

           <div className="createProductContainer">
              
              <form
               className='createProductForm'
               encType='multipart/form-data'
               onSubmit={updateFormSubmitHandler}
               >
                 <h1>Update Product</h1> 

                  <div>
                    <SpellCheckIcon/>
                    <input
                      type="text"
                      placeholder='Product Name'
                      required
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                      />
                  </div>
                  <div>
                    <AttachMoneyIcon/>
                    <input
                      type="number"
                      placeholder='Price'
                      required
                      value={price}
                      onChange={(e)=>setPrice(e.target.value)}
                      />
                  </div>
                  <div>
                    <DescriptionIcon/>
                    <textarea
                      placeholder='Product Description'
                      required
                      value={description}
                      cols="30"
                      rows="1"
                      onChange={(e)=>setDescription(e.target.value)}
                      ></textarea>
                  </div>
                <div>
                    <AccountTreeIcon/>
                    <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                       <option value="">Choose Category</option>
                       {categories.map((cate)=>(
                        <option key={cate} value={cate}>
                            {cate}
                        </option>
                       ))}
                    </select>
                </div>
              
              <div>
                <StorageIcon/>
                <input
                    type='number'
                    placeholder='Stock'
                    value={stock}
                    required
                    onChange={(e)=>setStock(e.target.value)}
                />
              </div>

              <div id="createProductFormFile">
                 <input
                    type='file'
                    name="avatar"
                    accept="image/"
                    onChange={updateProductImagesChange}
                    multiple
                 />
              </div>


{/* //for old images only */}
              <div id="createProductFormImage">
                 {oldImages && oldImages.map((image,index)=>(
                    <img key={index} src={image.url} alt="old product preview"/>
                 ))}
              </div>
              
              <div id="createProductFormImage">
                 {imagesPreview.map((image,index)=>(
                    <img key={index} src={image} alt="product preview"/>
                 ))}
              </div>

              
              <Button
               id="createProductBtn"
               type="submit"
            //    disabled={loading?true:false}
              >
                Update 
              </Button>


              </form>
             
           </div>

       </div>
    </>
  )
}

export default UpdateProduct;
