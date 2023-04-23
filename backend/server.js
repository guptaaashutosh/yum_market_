const app=require('./app');

const connectDatabase=require('./config/database');

// const dotenv=require('dotenv');

const cloudinary =require('cloudinary');

//Handling Uncaught Exception
process.on('uncaughtException',(err)=>{
    console.log(`Error : ${err}`)
    console.log("shutting down the serve due to Uncaught Exception")
    process.exit(1);
})


//connecting to database 
connectDatabase();

//cloudinary 
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});


//config  //only if we are running on localhost 
// dotenv.config({path:"backend/config/config.env"});

//for production check
if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config({path:"backend/config/config.env"});
}



const server = app.listen(process.env.PORT,()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`);
})



//unhandled Promise Rejections
process.on('unhandledRejection',(err)=>{
    console.log(`Error : ${err}`);
    console.log("shutting down the serve due to unhandled promise rejection");
 
    server.close(()=>{
        process.exit(1);
    });
});
