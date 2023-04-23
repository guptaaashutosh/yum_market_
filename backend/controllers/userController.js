const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');
const { findByIdAndUpdate } = require('../models/userModel');

const dotenv = require('dotenv');
//config
dotenv.config({ path: 'backend/config/config.env' });

//Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'avatars',
    width: 150,
    crop: 'scale'
  });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url
    }
  });

  //     const token=user.getJWTToken();
  //    // console.log(token);

  //     res.status(201).json({
  //         success:true,
  //         token,
  //     });

  sendToken(user, 201, res);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler('Please enter email and password both', 401));
  }
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  const isMatch = await user.comparePassword(password);

  console.log(isMatch);

  if (!isMatch) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  // const token=user.getJWTToken();
  // // console.log(token);

  //  res.status(200).json({
  //      success:true,
  //      token,
  //  });

  sendToken(user, 201, res);
});

//logout user
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  });

  res.status(200).json({
    sucess: true,
    message: 'logout out'
  });
});

//forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler('User Not Found', 404));
  }

  //get reset password token
  const resetToken = user.generateResetPasswordToken();

  console.log('reset token: ', resetToken);

  //save
  await user.save({ validateBeforeSave: false });

  //generateUrl
  // const resetPasswordUrl=`http://localhost/api/v1/password/reset/${resetToken}`;
  //change
  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   'host'
  // )}/api/v1/password/reset/${resetToken}`;

  //for frontend
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  //message
  const message = `Your password reset token is temp  :- \n\n ${resetPasswordUrl} \n\n If your have not request 
    then , Please ignore it`;

  // const message = `
  // <h1>Your Password reset Link : ${resetPasswordUrl} \n\n </h1>
  // <p>If your have not request then , Please ignore it.</p>
  // <h2>ThankYou</h2>
  //   `;

  try {
    await sendEmail({
      //works as options in sendEmail.js file
      email: user.email,
      subject: `Yum Market Password Recovery`,
      message
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} Successfull`
    });
  } catch (error) {
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

//reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  //Hashing and add resetToken to userSchema
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  //if user not found
  if (!user) {
    return next(
      new ErrorHandler(
        'Reset password token is invalid or has been expired',
        400
      )
    );
  }

  //if password doesnot match
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password doesnot match', 400));
  }

  //if every things goes right
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//get user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user
  });
});

//update password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  const isPasswordMatch = await user.comparePassword(req.body.oldPassword);

  console.log(isPasswordMatch);

  if (!isPasswordMatch) {
    return next(
      new ErrorHandler(
        'old password is incorrect,please enter valid old password',
        401
      )
    );
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("new password and confirm password doesn't match", 400)
    );
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

//update profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email
  };

  // this for updating avatar in database and cloudinary
  if (req.body.avatar !== '') {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;

    //to delete from cloudinary
    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
      width: 150,
      crop: 'scale'
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    user
  });
});

//get all users (admin)
exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users
  });
});

//get single user (admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User doesnot exits with the id:${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user
  });
});

//update user role (admin)
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    user
  });
});

//delete user (admin)
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`user doesnot exits with id : ${req.params.id}`, 404)
    );
  }

  //console.log(user);
  //to delete profile image from cloudinary
  const imageId = user.avatar.public_id;
  //console.log(imageId);
  //to delete profile image  from cloudinary
  await cloudinary.v2.uploader.destroy(imageId);

  //if exits
  await user.remove();

  res.status(200).json({
    success: true,
    message: 'user deleted successfully!!'
  });
});
