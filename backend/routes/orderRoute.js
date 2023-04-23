const express=require('express');
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const router=express.Router()
const { isAuthenticateUser,authorizedRole } = require('../middleware/auth');

router.route("/order/new").post(isAuthenticateUser,newOrder);

router.route("/order/:id").get(isAuthenticateUser,getSingleOrder);

router.route("/orders/me").get(isAuthenticateUser,myOrders);

router.route("/admin/orders").get(isAuthenticateUser,authorizedRole("admin"),getAllOrders);

router.route("/admin/order/:id")
      .put(isAuthenticateUser,authorizedRole("admin"),updateOrder)
      .delete(isAuthenticateUser,authorizedRole("admin"),deleteOrder);


module.exports=router;