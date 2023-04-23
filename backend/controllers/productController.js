const Product=require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError =require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/apifreatures');
const cloudinary=require('cloudinary');

//13:19:08

//create product -- Admin
exports.createProduct=catchAsyncError(async (req,res,next)=>{

     let images=[];

     if(typeof req.body.images === "string"){
          images.push(req.body.images);
     }else{
          images=req.body.images;
     }

     let imagesLink=[];

     for(let i=0;i<images.length;i++){
        const result=await cloudinary.v2.uploader.upload(images[i],{
          folder:"products",
        });

        imagesLink.push({
          public_id:result.public_id,
          url:result.secure_url,
        });
     }

     req.body.images=imagesLink;
     req.body.user=req.user.id;

     const product=await Product.create(req.body);

     await product.save();

     res.status(201).json({
         success:true,
         product
     });
});


//get All Products
exports.getAllProducts=catchAsyncError(async (req,res,next)=>{

     const resultPerPage=8;
     const productCount=await Product.countDocuments();
     //ApiFeatures
     const apifeatures=new ApiFeatures(Product.find(),req.query)
     .search()
     .filter()
     

     let products=await apifeatures.query;

     let filterProductCount=products.length;

     apifeatures.pagination(resultPerPage);

     //products=await apifeatures.query;


     res.status(200).json({
               success:true,
               productCount,
               products,
               resultPerPage,
               filterProductCount,
     });
})




//get All Products for admin
exports.getAdminProducts=catchAsyncError(async (req,res,next)=>{

    const products=await Product.find();

     res.status(200).json({
               success:true,
               products,
     });
})



//get single Product details
exports.getProductDetails=catchAsyncError(async (req,res,next)=>{
     
     let product =await Product.findById(req.params.id);

     if(!product){
          return next(new ErrorHandler("Product Not Found",404))
          
          // res.status(404).json({
          //      success:false,
          //      message:"Product not found"
          // })
     }

     res.status(200).json({
               success:true,
               product,
               //productCount
     });
})




//update Product --Admin

exports.updateProduct=catchAsyncError(async (req,res,next)=>{

     let product =await Product.findById(req.params.id);

     if(!product){
          return next(new ErrorHandler("Product Not Found",404))
     }

     //for images  
     let images=[];

     if(typeof req.body.images === "string"){
          images.push(req.body.images);
     }else{
          images=req.body.images;
     }

     //if updated images in body 
     if(images !== undefined){
        //delete old images from cloudinary 
        for(let i=0; i<product.images.length; i++){
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }
     //to upload updated images in cloudinary
     let imagesLink=[];

     for(let i=0;i<images.length;i++){
        const result=await cloudinary.v2.uploader.upload(images[i],{
          folder:"products",
        });

        imagesLink.push({
          public_id:result.public_id,
          url:result.secure_url,
        });
     }

     req.body.images=imagesLink;
     
  }

     product =await Product.findByIdAndUpdate(req.params.id,req.body,{
          new:true,
          runValidators:true,
          useFindAndModify:false,
     });  

     res.status(200).json({
          success:true,
          product
     })
     //console.log(product);
})


//delete Product --Admin

exports.deleteProduct=catchAsyncError(async (req,res,next)=>{

     let product =await Product.findById(req.params.id);

     if(!product){
          return next(new ErrorHandler("Product Not Found",404));
     }

     //delete images from cloudinary 
     for(let i=0; i<product.images.length; i++){
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
     }

     product =await Product.findByIdAndDelete(req.params.id);

     res.status(200).json({
          success:true,
          message:"Product deleted"
     });
     //console.log(product);
})


//creating product reviews or updating the review of the product 
exports.createProductReview=catchAsyncError(async(req,res,next)=>{

     const {rating ,comment , productID}=req.body;

     const review={
          user:req.user._id,
          name:req.user.name,
          rating:Number(rating),
          comment,
     };
     
     const product =await Product.findById(productID);
    
     
     const isReviewed=await product.reviews.find(
          (rev)=>rev.user.toString() === req.user._id.toString()
       );
     
     if(isReviewed){
          product.reviews.forEach((rev) => {
               if (rev.user.toString() === req.user._id.toString())
                 (rev.rating = rating), (rev.comment = comment);
             });
     }else{
          product.reviews.push(review);
          product.noOfReviews=product.reviews.length;
     }
     
     //for product overall rating
     let avg=0;
     product.reviews.forEach((rev)=>{
          avg+=rev.rating;
     });

     product.ratings=avg/(product.reviews.length);

     await product.save({validateBeforeSave:false});

     res.status(200).json({
          success:true,
          product
     });

});


//getting all reviews of products
exports.getProductReviews=catchAsyncError(async(req,res,next)=>{
     const product=await Product.findById(req.query.productID);

     if(!product){
          return next(new ErrorHandler("Product Not Found",404));
     }

     res.status(200).json({
          success:true,
          reviews:product.reviews,
     });
});


//deleting the product reviews
exports.deleteProductReview=catchAsyncError(async(req,res,next)=>{
     const product=await Product.findById(req.query.productID);

     if(!product){
          return next(new ErrorHandler("Product Not Found",404));
     }


     const reviews=product.reviews.filter((rev)=>rev._id.toString() !== req.query.id.toString());

      //for product overall rating
      let avg=0;

      reviews.forEach((rev)=>{
           avg+=rev.rating;
      });
 
      
      let ratings = 0;

      if (reviews.length === 0) {
        ratings = 0;
      } else {
        ratings = avg / reviews.length;
      }


      const noOfReviews=reviews.length;

      await Product.findByIdAndUpdate(req.query.productID,
     {
          reviews,
          ratings,
          noOfReviews,
      },{
          new:true,
          runValidators:true,
          useFindAndModify:false,
      })

      //await Product.save();

      res.status(200).json({
          success:true,
          //reviews
      })

})

