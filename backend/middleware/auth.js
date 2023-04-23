const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const User=require('../models/userModel');
const jwt=require('jsonwebtoken');

const dotenv=require('dotenv');
//config 
dotenv.config({path:"backend/config/config.env"});


exports.isAuthenticateUser=catchAsyncError(async(req,res,next)=>{
    const {token}=req.cookies;

    //console.log(token);

    if(!token){
        return next(new ErrorHandler("please login to access this resource",401));
    }

    const decodedData=jwt.verify(token,process.env.JWT_SECRET);

    req.user=await User.findById(decodedData.id);

    // console.log("req.user data in auth : ",req.user);

    next();

})

//AuthorizedRole check
exports.authorizedRole=(...roles)=>{
    return (req,res,next)=>{
        //if this is user
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role : ${req.user.role} is not allowed to access this resource`
            ,403));
        }

        // if this is admin
        next();
    }
}





