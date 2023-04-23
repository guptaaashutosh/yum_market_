const ErrorHandler=require('../utils/errorHandler');


module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal Server Error!!";

    if(err.name==='CastError'){
        const message=`Resource Not Found. Invalid : ${err.path}`;
        err=new ErrorHandler(message,400);
    }

    //mongoose duplicate error 
    if(err.code === 11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} Entered`;
        err=new ErrorHandler(message,400);
    }

    //wrong JWT token
    if(err.name === 'jsonWebTokenError'){
        const message=`Json web token is invalid,Please try again`;
        err=new ErrorHandler(message,400);
    }

    // JWT Expire token error
    if(err.name === 'TokenExpiredError'){
        const message=`Json web token is Expires,Please try again`;
        err=new ErrorHandler(message,400);
    }


    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    });
};