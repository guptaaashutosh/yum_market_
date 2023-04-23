import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const NavBar2 = () => {
  // Toogle Menu
  const [MobileMenu, setMobileMenu] = useState(false);
  return (
    <>
      <header className='header'>
        <div className='container d_flex'>
          <div className='catgrories d_flex'>
            <span class='fa-solid fa-border-all'></span>
            <h4>
              Categories <i className='fa fa-chevron-down'></i>
            </h4>
          </div>

          <div className='navlink'>
            <ul
              className={
                MobileMenu ? 'nav-links-MobileMenu' : 'link f_flex capitalize'
              }
              onClick={() => setMobileMenu(false)}
            >
              {/* <ul className='link f_flex uppercase {MobileMenu ? "nav-links-MobileMenu" : "nav-links"} onClick={() => setMobileMenu(false)}'/> */}
              <li>
                <Link to='/'>home</Link>
              </li>
              <li>
                <Link to='/products'>Product</Link>
              </li>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <Link to='/cart'>Cart</Link>
              </li>
              <li>
                <Link to='/about'>About</Link>
              </li>
              <li>
                <Link to='/contact'>contact</Link>
              </li>
            </ul>

            <button
              className='toggle'
              onClick={() => setMobileMenu(!MobileMenu)}
            >
              {MobileMenu ? <MenuIcon /> : <MenuIcon />}
              
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar2;
