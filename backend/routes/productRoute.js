const express=require('express');
const { getAllProducts,
       createProduct,
        updateProduct,
         deleteProduct,
          getProductDetails,
           createProductReview,
            getAllReviews,
             deleteProductReview,
              getProductReviews,
               getAdminProducts
      } = require('../controllers/productController');
      
const { isAuthenticateUser,authorizedRole } = require('../middleware/auth');

const router=express.Router();

router.route("/products").get(getAllProducts);  


router.route("/admin/products").get(isAuthenticateUser,authorizedRole("admin"),getAdminProducts);

router.route("/admin/product/new").post(isAuthenticateUser,authorizedRole("admin"),createProduct);

router.route("/admin/product/:id").put(isAuthenticateUser,authorizedRole("admin"),updateProduct);
router.route("/admin/product/:id").delete(isAuthenticateUser,authorizedRole("admin"),deleteProduct);
router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticateUser,createProductReview);

router.route("/reviews")
     .get(getProductReviews)
     .delete(isAuthenticateUser,deleteProductReview);

module.exports=router;