const express = require('express');
const {
  uploadSliderImages,
  getAllSliderImages,
  deleteSlider,
  sliderDetails,
  sliderUpdate
} = require('../controllers/otherController');
const router = express.Router();
const { isAuthenticateUser, authorizedRole } = require('../middleware/auth');
const { contactMessage } = require('../Invoice-generator/generateInvoice');

router
  .route('/admin/slider')
  .post(isAuthenticateUser, authorizedRole('admin'), uploadSliderImages);

router
  .route('/admin/slider')
  .get(isAuthenticateUser, authorizedRole('admin'), getAllSliderImages);

router
  .route('/admin/slider/:id')
  .delete(isAuthenticateUser, authorizedRole('admin'), deleteSlider);

router
  .route('/admin/slider/:id')
  .get(isAuthenticateUser, authorizedRole('admin'), sliderDetails);


router
  .route('/admin/slider/:id')
  .put(isAuthenticateUser, authorizedRole('admin'), sliderUpdate);




module.exports = router;
