import React from 'react';
import './Header.css';
import Head from './Head';
import Search from './Search';
import NavBar2 from './NavBar2';


const Header2 = ({ CartItem }) => {
  return (
    <>
      <Head />
      <Search CartItem={CartItem} />
      <NavBar2/>
    </>
  );
};

export default Header2;
