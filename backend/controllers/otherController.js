const dotenv = require('dotenv');
//config
dotenv.config({ path: 'backend/config/config.env' });
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const Slider = require('../models/otherModel');
const cloudinary = require('cloudinary');


exports.uploadSliderImages = catchAsyncError(async (req,res,next) => {

     //to upload images
    let images = [];

    if (typeof req.body.images == 'string'){
          images.push(req.body.images);
    }else {
        images = req.body.images;
    }

    //for image link 
    let imagesLink = [];

    for (let i = 0; i < images.length; i++){
        const result = await cloudinary.v2.uploader.upload(images[i],
            {
                folder: "sliders",
            });
        
        imagesLink.push({
          public_id: result.public_id,
          url: result.secure_url
        });
    };

    req.body.images = imagesLink;

    const slider = await Slider.create(req.body);

    if (!slider) {
        return next(new ErrorHandler('Error while creating', 500));
    }

    console.log("slider : ", slider);

    res.status(200).json({
        success: true,
        slider,
    })

});


//getAllSliderImages

exports.getAllSliderImages = catchAsyncError(async (req, res, next) => {
    
    const slider = await Slider.find();

    if (!slider) {
      //return next(new ErrorHandler('Slider Not Found', 404));
      res.status(404).json({
           message:"slider not found"
      })
    }


    res.status(200).json({
        slider
    })
})


//delete slider 
exports.deleteSlider = catchAsyncError(async (req, res, next) => {
    
    let slider = await Slider.findById(req.params.id);

    if (!slider) {
        return next(new ErrorHandler('Slider Not Found', 404));
    }

    for (let i = 0; i < slider.images.length; i++){
        await cloudinary.v2.uploader.destroy(slider.images[i].public_id);
    }

    slider = await Slider.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'slider deleted'
    });

})



//SliderDetails
exports.sliderDetails = catchAsyncError(async (req, res, next) => {
  let slider = await Slider.findById(req.params.id);

  if (!slider) {
    return next(new ErrorHandler('Slider Not Found', 404));
  }

  res.status(200).json({
    slider
  });
});


//sliderUpdate

exports.sliderUpdate = catchAsyncError(async (req, res, next) => {

 // console.log("id for slider update : ", req.params.id);
  let slider = await Slider.findById(req.params.id);

  console.log("slider in update : ", slider);

  if (!slider) {
    return next(new ErrorHandler('Slider Not Found', 404));
  }

  //for images
  let images = [];

  if (typeof req.body.images === 'string') {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  //if updated images in body
  if (images !== undefined) {
    //delete old images from cloudinary
    for (let i = 0; i < slider.images.length; i++) {
      await cloudinary.v2.uploader.destroy(slider.images[i].public_id);
    }
    //to upload updated images in cloudinary
    let imagesLink = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: 'sliders'
      });

      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url
      });
    }

    req.body.images = imagesLink;
  }

  slider = await Slider.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    slider
  });
  
});