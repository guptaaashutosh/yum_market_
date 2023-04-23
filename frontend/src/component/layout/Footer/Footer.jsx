// import React from 'react';
// import playStore from '../../../images/playstore.png';
// import appStore from '../../../images/Appstore.png';
// import './footer.css';


// function Footer() {
//   return (
//     <>
//       <footer id='footer'>
//         <div className='leftFooter'>
//           {/* <h4>DOWNLOAD OUR APP</h4>
//             <p>Download App for Android and IOS mobile phone</p>
//             <img src={playStore} alt='playStore'></img>
//             <img src={appStore} alt='appStore'></img> */}
//         </div>
//         <div className='midFooter'>
//           <h1>YUM MARKET</h1>
//           <p>High Quality is our priority</p>
//           <p>Copyrights 2023 &copy;yum_market</p>
//         </div>
//         <div className='rightFooter'>
//           <h4>Follow Us</h4>
//           <a href='#'>Instagram</a>
//           <a href='#'>LinkedIn</a>
//           <a href='#'>Facebook</a>
//         </div>
//       </footer>
//     </>
//   );
// }

// export default Footer


import React from 'react';
import './style.css';

const Footer = () => {
  return (
    <>
      <footer>
        <div className='container grid2'>
          <div className='box'>
            <h1>YUM MARKET</h1>
            <p>
              At Yum Market, we believe in transparency, quality, and customer
              satisfaction. We're committed to sourcing the highest quality
              products from the best suppliers, and we're always looking for
              ways to improve our processes and services. We value our
              customers' feedback and strive to use it to improve our business.
            </p>
            <div className='icon d_flex'>
              <div className='img d_flex'>
                <i class='fa-brands fa-google-play'></i>
                <span>Google Play</span>
              </div>
              <div className='img d_flex'>
                <i class='fa-brands fa-app-store-ios'></i>
                <span>App Store</span>
              </div>
            </div>
          </div>

          <div className='box'>
            <h2>About Us</h2>
            <ul>
              <li>Careers</li>
              <li>Our Stores</li>
              <li>Our Cares</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className='box'>
            <h2>Customer Care</h2>
            <ul>
              <li>Help Center </li>
              <li>How to Buy </li>
              <li>Track Your Order </li>
              <li>Corporate & Bulk Purchasing </li>
              <li>Returns & Refunds </li>
            </ul>
          </div>
          <div className='box'>
            <h2>Contact Us</h2>
            <ul>
              <li>Rajkot, 360020, Gujarat, India</li>
              <li>Email: yum.market@gmail.com</li>
              <li>Phone: +91-9868456444</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;


