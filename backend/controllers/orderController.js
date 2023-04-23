const Order=require('../models/orderModel');

const Product=require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError =require('../middleware/catchAsyncError');
const { orderConfirmationMail } = require('../Invoice-generator/generateInvoice');



//creating new order  //generate pdf here 
exports.newOrder=catchAsyncError(async(req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    }=req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    console.log("order details : ", order);

    if (order) {
      //order confirmation mail to user 
        orderConfirmationMail(order._id);
      
    }

    res.status(201).json({
        success:true,
        order,
    });
});



//get single order 
exports.getSingleOrder=catchAsyncError(async(req,res,next)=>{
    //populate will provide the user name and email from user_id of orders db which is stored is orders database
    const order= await Order.findById(req.params.id).populate(
        "user",  //this is user_id from orders db
        "name email" //this will be fetch from users db using user_id of orders user_id
    );

    if(!order){
        return next(new ErrorHandler("order not found with this id",404));
    }

    res.status(200).json({
        success:true,
        order,
    })
})


//get orders of loggedIn users -- user  
exports.myOrders=catchAsyncError(async(req,res,next)=>{

    const orders= await Order.find({user:req.user._id});

    res.status(200).json({
        success:true,
        orders,
    })
})

//get all orders   --admin
exports.getAllOrders=catchAsyncError(async(req,res,next)=>{

    const orders= await Order.find();

    //for total amount of order (only for admin to show in dashboard)
    let totalAmount=0;
    orders.forEach((order)=>{
        totalAmount+=order.totalPrice;
    });

    res.status(200).json({
        success:true,
        totalAmount,
        orders,
    })
})



//update order status  --admin
exports.updateOrder=catchAsyncError(async (req,res,next)=>{

    const order= await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this id",404));
    }

    if(order.orderStatus==="Delivered"){
        return next(new ErrorHandler("you have already delivered this order",404));
    }

    //to maintain stock  //stock error bcz of random product(id) in order
   if(req.body.status==="Shipped"){
    order.orderItems.forEach(async (o)=>{
        await updateStock(o.product,o.quantity);
    })
   }
    
    order.orderStatus=req.body.status;

    if(req.body.status==="Delivered"){
        order.deliveredAt=Date.now();
    }

    await order.save({validateBeforeSave:false})

    res.status(200).json({
        success:true,
    });
});

//update stock function
async function updateStock(id,quantity){
    const product = await Product.findById(id);

    product.stock -= quantity;

    await product.save({validateBeforeSave:false});
}


//delete order --admin
exports.deleteOrder=catchAsyncError(async(req,res,next)=>{

    const order= await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order Not Found!!",404));
    }

    await order.remove();

    res.status(200).json({
        success:true,
    })
})


//4:43:04 -- now frontend parts 